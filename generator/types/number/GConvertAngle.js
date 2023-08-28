class GConvertAngle
extends GOperator1
{
    from;



    constructor(nodeId, options)
    {
        super(CONVERT_ANGLE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GConvertAngle(this.nodeId, this.options);

        copy.copyBase(this);

        copy.from = this.from.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const from = (await this.from.eval(parse)).toValue();


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            consoleAssert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');

            
            if (this.options.enabled)
            {
                switch (from.value)
                {
                    case 0: this.value.value = this.value.value/360 * Tau; break;
                    case 1: this.value.value = this.value.value/Tau * 360; break;
                }
            }

            this.value.decimals = decDigits(this.value.value);
        }
        else
            this.value = NumberValue.NaN;


        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['from',  from      ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.from && this.from.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from) this.from.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.from) this.from.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from) this.from.iterateLoop(parse);
    }
}
