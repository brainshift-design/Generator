class GSetValueName
extends GOperator1
{
    name = null;



    constructor(nodeId, options)
    {
        super(SET_VALUE_NAME, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.name = null;
    }



    copy()
    {
        const copy = new GSetValueName(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.name ) copy.name  = this.name .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : new NullValue();

        
        const name = await evalTextValue(this.name, parse);


        if (   this.options.enabled
            && this.value.isValid())
        {
            console.log('name.value =', name.value);
            this.value.valueId = name.value;
            console.log('this.value =', this.value);
        }


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



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        if (this.name) this.name.resetLoop(parse, nodeId);
    }
}
