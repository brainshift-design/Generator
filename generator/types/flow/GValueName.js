class GValueName
extends GOperator1
{
    name = null;



    constructor(nodeId, options)
    {
        super(VALUE_NAME, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.name = null;
    }



    copy()
    {
        const copy = new GNull(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.name ) copy.name  = this.name .copy();

        return copy;
    }



    async eval(parse)
    {
        // if (this.isCached())
        //     return this;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : new NullValue();

        
        const name = (await this.name.eval(parse)).toValue();

        if (this.value.isValid())
            this.value.valueId = name.value;


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()],
            ['name', name             ]
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
        return super.isValid()
            && this.name && this.name.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.name) this.name.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.name) this.name.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.name) this.name.iterateLoop(parse);
    }
}
