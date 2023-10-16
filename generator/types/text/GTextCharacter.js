class GTextCharacter
extends GOperator1
{
    code;


    
    constructor(nodeId, options)
    {
        super(TEXT_CHAR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCharacter(this.nodeId, this.options);

        copy.copyBase(this);

        copy.code = this.code.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const code = (await this.code.eval(parse)).toValue();


        this.value = new TextValue(String.fromCharCode(code.value));


        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['code',  code      ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.code && this.code.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.code) this.code.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.code) this.code.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.code) this.code.iterateLoop(parse);
    }
}
