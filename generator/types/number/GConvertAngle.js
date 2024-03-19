class GConvertAngle
extends GOperator1
{
    from;



    constructor(nodeId, options)
    {
        super(CONVERT_ANGLE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.from = null;
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

        
        const input = await evalNumberValue(this.input, parse);
        const from  = await evalNumberValue(this.from,  parse);


        if (input)
        {
            this.value = input;

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
            this.value = NumberValue.NaN.copy();


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



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.from) this.from.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from) this.from.iterateLoop(parse);
    }
}
