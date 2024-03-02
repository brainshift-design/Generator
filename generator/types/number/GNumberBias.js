class GNumberBias
extends GOperator1
{
    min    = null;
    max    = null;
    bias   = null;
    spread = null;


    
    constructor(nodeId, options)
    {
        super(NUMBER_BIAS, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.min    = null;
        this.max    = null;
        this.bias   = null;
        this.spread = null;
    }



    copy()
    {
        const copy = new GNumberBias(this.nodeId, this.options);

        copy.copyBase(this);

        copy.min    = this.min   .copy();
        copy.max    = this.max   .copy();
        copy.bias   = this.bias  .copy();
        copy.spread = this.spread.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.min    || this.min   .isCached())
            && (!this.max    || this.max   .isCached())
            && (!this.bias   || this.bias  .isCached())
            && (!this.spread || this.spread.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const min    = (await this.min   .eval(parse)).toValue();
        const max    = (await this.max   .eval(parse)).toValue();
        const bias   = (await this.bias  .eval(parse)).toValue();
        const spread = (await this.spread.eval(parse)).toValue();


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            if (this.options.enabled)
            {
                let f = (input.value - min.value) / (max.value - min.value);

                f = getSpreadBias(f, bias.value, spread.value);
                
                f = min.value + f * (max.value - min.value);
                
                this.value = new NumberValue(f);
            }
            else
                this.value = input.copy();
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['min',    min   ],
            ['max',    max   ],
            ['bias',   bias  ],
            ['spread', spread]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.min    && this.min   .isValid()
            && this.max    && this.max   .isValid()
            && this.bias   && this.bias  .isValid()
            && this.spread && this.spread.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.min   ) this.min   .pushValueUpdates(parse);
        if (this.max   ) this.max   .pushValueUpdates(parse);
        if (this.bias  ) this.bias  .pushValueUpdates(parse);
        if (this.spread) this.spread.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.min   ) this.min   .invalidateInputs(parse, from, force);
        if (this.max   ) this.max   .invalidateInputs(parse, from, force);
        if (this.bias  ) this.bias  .invalidateInputs(parse, from, force);
        if (this.spread) this.spread.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.min   ) this.min   .iterateLoop(parse);
        if (this.max   ) this.max   .iterateLoop(parse);
        if (this.bias  ) this.bias  .iterateLoop(parse);
        if (this.spread) this.spread.iterateLoop(parse);
    }
}



function getSpreadBias(f, bias, spread)
{
    const b = bias   / 50;
    const s = spread / 50;


    f = 
        b >= 0
        ? 1 - Math.pow(1-f, 1+b)
        :     Math.pow(  f, 1-b);


         if (s >= 0 && f >= 0.5) f = 1 - Math.pow((1-f)*2, 1+s) / 2;
    else if (s >= 0 && f <  0.5) f = Math.pow(f*2, 1+s) / 2;
    else if (s < 0)              f = lerp3(0, (1-s)/3, (2+s)/3, 1, f);


    return f;
}