class GValueName
extends GOperator
{
    input = null;

    name  = null;



    constructor(nodeId, options)
    {
        super(VALUE_NAME, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNull(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.input) copy.input = this.input.copy();
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
            : NullValue;

        
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
        return this.input && this.input.isValid()
            && this.name  && this.name .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.name ) this.name .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input) this.input.invalidateInputs(parse, from, force);
        if (this.name ) this.name .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input) this.input.iterateLoop(parse);
        if (this.name ) this.name .iterateLoop(parse);
    }
}
