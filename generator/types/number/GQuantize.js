class GQuantize
extends GOperator1
{
    type;
    base;
    step;



    constructor(nodeId, options)
    {
        super(NUMBER_QUANTIZE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.type = null;
        this.base = null;
        this.step = null;
    }



    copy()
    {
        const copy = new GQuantize(this.nodeId, this.options);

        copy.copyBase(this);

        copy.type = this.type.copy();
        copy.base = this.base.copy();
        copy.step = this.step.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const input = this.input ? (await this.input.eval(parse)).toValue() : null;
        const type  = this.type  ? (await this.type .eval(parse)).toValue() : null;
        const base  = this.base  ? (await this.base .eval(parse)).toValue() : null;
        const step  = this.step  ? (await this.step .eval(parse)).toValue() : null;


        if (input)
        {
            this.value = input;

            consoleAssert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');

            
            if (this.options.enabled)
            {
                switch (type.value)
                {
                    case 0: this.value.value = base.value + floorTo((this.value.value - base.value) / step.value, this.value.decimals) * step.value; break;
                    case 1: this.value.value = base.value + roundTo((this.value.value - base.value) / step.value, this.value.decimals) * step.value; break;
                    case 2: this.value.value = base.value +  ceilTo((this.value.value - base.value) / step.value, this.value.decimals) * step.value; break;
                }

                this.value.decimals = Math.max(base.decimals, step.decimals);
            }
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type', type],
            ['base', base],
            ['step', step]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.type && this.type.isValid()
            && this.base && this.base.isValid()
            && this.step && this.step.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.type) this.type.pushValueUpdates(parse);
        if (this.base) this.base.pushValueUpdates(parse);
        if (this.step) this.step.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.type) this.type.invalidateInputs(parse, from, force);
        if (this.base) this.base.invalidateInputs(parse, from, force);
        if (this.step) this.step.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.type) this.type.iterateLoop(parse);
        if (this.base) this.base.iterateLoop(parse);
        if (this.step) this.step.iterateLoop(parse);
    }
}
