class GSetPrecision
extends GOperator1
{
    decimals;



    constructor(nodeId, options)
    {
        super(NUMBER_PRECISION, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.decimals = null;
    }



    copy()
    {
        const copy = new GSetPrecision(this.nodeId, this.options);

        copy.copyBase(this);

        copy.decimals = this.decimals.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const input    = this.input    ? (await this.input   .eval(parse)).toValue() : null;
        const decimals = this.decimals ? (await this.decimals.eval(parse)).toValue() : null;


        if (input)
        {
            consoleAssert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');


            if (this.options.enabled)
                this.value = new NumberValue(input.value, decimals.value);
            else
                this.value = input.copy();
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['value',    this.value],
            ['decimals', decimals  ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.decimals && this.decimals.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.decimals) this.decimals.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.decimals) this.decimals.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.decimals) this.decimals.iterateLoop(parse);
    }
}
