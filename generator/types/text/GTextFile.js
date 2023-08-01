class GTextFile
extends GOperator
{
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


        const cachedValue = (await this.cachedValue.eval(parse)).toValue();

        
        genInitNodeProgress(this.nodeId);


        this.value = cachedValue ?? new TextValue();


        this.updateValues = [['', NullValue]];
        // [
        //     ['path', path]
        // ];
        
        
        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        //if (this.path) this.path.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        //if (this.path) this.path.invalidateInputs(from);

        this.cachedValue = new TextValue();
    }
}