class GTextFile
extends GOperator
{
    path;
    
    cachedValue = null;



    constructor(nodeId, options)
    {
        super(TEXT_FILE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextFile(this.nodeId, this.options);

        copy.copyBase(this);

        copy.cachedValue = this.cachedValue.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const cachedValue = this.cachedValue ? (await this.cachedValue.eval(parse)).toValue() : null;
        const path        = this.path        ? (await this.path       .eval(parse)).toValue() : null;

        
        genInitNodeProgress(this.nodeId);


        this.value = cachedValue ?? new TextValue();


        this.setUpdateValues(parse,
        [
            ['preview', this.value],
            ['path',    path      ]
        ]);
        
        
        this.validate();

        return this;
    }



    isValid()
    {
        return this.path && this.path.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.path) this.path.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.path) this.path.invalidateInputs(parse, from);

        //this.cachedValue = new TextValue();
    }
}