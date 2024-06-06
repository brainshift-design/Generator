class GGroupParam
extends GOperator
{
    input    = null;
    
    dataType = NULL;



    constructor(nodeId, options)
    {
        super(GROUP_PARAM, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.input    = null;
        this.dataType = null;
    }



    copy()
    {
        const copy = new GGroupParam(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        
        copy.dataType = this.dataType;
      
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            if (!this.input.value)
                await this.input.eval(parse);

            this.value = this.input.toValue();
        }

        else if (this.dataType != NULL)
            this.value = nanFromType(this.dataType);
        
        else
            this.value = new NullValue();


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    toValue()
    {
        return this.value.copy();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input) this.input.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input) this.input.iterateLoop(parse);
    }
}