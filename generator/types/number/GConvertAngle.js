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
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == NUMBER_VALUE
                        ? getConvertAngleValue(item, from, this.options.enabled)
                        : NumberValue.NaN.copy());   
                }
            }
            else
                this.value = getConvertAngleValue(input, from, this.options.enabled);
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            ['value', this.value       ],
            ['from',  from             ]
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



function getConvertAngleValue(input, from, enabled)
{
    consoleAssert(
         input == NUMBER_VALUE, 
        'input must be NUMBER_VALUE');
        

    const value = input;
    
    if (enabled)
    {
        switch (from.value)
        {
            case 0: value.value = value.value/360 * Tau; break;
            case 1: value.value = value.value/Tau * 360; break;
        }

        value.decimals = decDigits(value.value);
    }


    return value;
}