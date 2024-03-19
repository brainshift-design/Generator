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

        copy.type   = this.type  .copy();
        copy.base   = this.base  .copy();
        copy.step   = this.step  .copy();
        copy.amount = this.amount.copy();

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
            this.value = input;

            consoleAssert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');

            
            if (this.options.enabled)
            {
                let qval;

                switch (type.value)
                {
                    case 0: qval = base.value + step.value * Math.floor((this.value.value - base.value) / step.value); break;
                    case 1: qval = base.value + step.value * Math.round((this.value.value - base.value) / step.value); break;
                    case 2: qval = base.value + step.value * Math. ceil((this.value.value - base.value) / step.value); break;
                }

                this.value.value    = this.value.value + (qval - this.value.value) * amount.value/100;
                this.value.decimals = Math.max(base.decimals, step.decimals);
            }
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type',   type  ],
            ['base',   base  ],
            ['step',   step  ],
            ['amount', amount]
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
