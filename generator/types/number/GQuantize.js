class GQuantize
extends GOperator1
{
    type;
    base;
    step;
    amount;



    constructor(nodeId, options)
    {
        super(NUMBER_QUANTIZE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.type   = null;
        this.base   = null;
        this.step   = null;
        this.amount = null;
    }



    copy()
    {
        const copy = new GQuantize(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.type  ) copy.type   = this.type  .copy();
        if (this.base  ) copy.base   = this.base  .copy();
        if (this.step  ) copy.step   = this.step  .copy();
        if (this.amount) copy.amount = this.amount.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const input  = await evalNumberValue(this.input,  parse);
        const type   = await evalNumberValue(this.type,   parse);
        const base   = await evalNumberValue(this.base,   parse);
        const step   = await evalNumberValue(this.step,   parse);
        const amount = await evalNumberValue(this.amount, parse);


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
                        ? getQuantizeValue(item, type, base, step, amount, this.options.enabled)
                        : NumberValue.NaN.copy());   
                }
            }
            else
                this.value = getQuantizeValue(input, type, base, step, amount, this.options.enabled);
}
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['_type',  this.outputType()],
            ['type',   type             ],
            ['base',   base             ],
            ['step',   step             ],
            ['amount', amount           ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.type   && this.type  .isValid()
            && this.base   && this.base  .isValid()
            && this.step   && this.step  .isValid()
            && this.amount && this.amount.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.type  ) this.type  .pushValueUpdates(parse);
        if (this.base  ) this.base  .pushValueUpdates(parse);
        if (this.step  ) this.step  .pushValueUpdates(parse);
        if (this.amount) this.amount.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.type  ) this.type  .invalidateInputs(parse, from, force);
        if (this.base  ) this.base  .invalidateInputs(parse, from, force);
        if (this.step  ) this.step  .invalidateInputs(parse, from, force);
        if (this.amount) this.amount.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.type  ) this.type  .iterateLoop(parse);
        if (this.base  ) this.base  .iterateLoop(parse);
        if (this.step  ) this.step  .iterateLoop(parse);
        if (this.amount) this.amount.iterateLoop(parse);
    }
}



function getQuantizeValue(input, type, base, step, amount, enabled)
{
    consoleAssert(
         input.type == NUMBER_VALUE, 
        'input.type must be NUMBER_VALUE');

    
    if (!enabled)
        return input;


    let qval;

    switch (type.value)
    {
        case 0: qval = base.value + step.value * Math.floor((input.value - base.value) / step.value); break;
        case 1: qval = base.value + step.value * Math.round((input.value - base.value) / step.value); break;
        case 2: qval = base.value + step.value * Math. ceil((input.value - base.value) / step.value); break;
    }

    return new NumberValue(
        input.value + (qval - input.value) * amount.value/100,
        Math.max(base.decimals, step.decimals));
}