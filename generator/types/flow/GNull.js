class GNull
extends GOperator
{
    input = null;



    constructor(nodeId, options)
    {
        super(NULL_NODE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNull(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.input) copy.input = this.input.copy();

        return copy;
    }



    async eval(parse)
    {
        // if (this.isCached())
        //     return this;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : NullValue;


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return this.input && this.input.isValid();
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
