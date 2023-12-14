class GNumberCurve
extends GOperator1
{
    min    = null;
    max    = null;
    power  = null;
    bias   = null;
    spread = null;


    
    constructor(nodeId, options)
    {
        super(NUMBER_CURVE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.min    = null;
        this.max    = null;
        this.power  = null;
        this.bias   = null;
        this.spread = null;
    }



    copy()
    {
        const copy = new GLimits(this.nodeId, this.options);

        copy.copyBase(this);

        copy.min    = this.min   .copy();
        copy.max    = this.max   .copy();
        copy.power  = this.power .copy();
        copy.bias   = this.bias  .copy();
        copy.spread = this.spread.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.min    || this.min   .isCached())
            && (!this.max    || this.max   .isCached())
            && (!this.power  || this.power .isCached())
            && (!this.bias   || this.bias  .isCached())
            && (!this.spread || this.spread.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const min    = (await this.min   .eval(parse)).toValue();
        const max    = (await this.max   .eval(parse)).toValue();
        const power  = (await this.power .eval(parse)).toValue();
        const bias   = (await this.bias  .eval(parse)).toValue();
        const spread = (await this.spread.eval(parse)).toValue();


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            if (this.options.enabled)
            {
                let f = (input.value - min.value) / (max.value - min.value);

                f = Math.pow(f, power.value);
                f = getSpreadBias(f, bias.value, spread.value);
                
                f = min.value + f * (max.value - min.value);
                
                this.value = new NumberValue(f);
            }
            else
                this.value = input;
        }
        else
            this.value = NumberValue.NaN;


        this.setUpdateValues(parse,
        [
            //['value',  this.value],
            ['min',    min       ],
            ['max',    max       ],
            ['power',  power     ],
            ['bias',   bias      ],
            ['spread', spread    ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.min    && this.min   .isValid()
            && this.max    && this.max   .isValid()
            && this.power  && this.power .isValid()
            && this.bias   && this.bias  .isValid()
            && this.spread && this.spread.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input ) this.input .pushValueUpdates(parse);
        if (this.min   ) this.min   .pushValueUpdates(parse);
        if (this.max   ) this.max   .pushValueUpdates(parse);
        if (this.power ) this.power .pushValueUpdates(parse);
        if (this.bias  ) this.bias  .pushValueUpdates(parse);
        if (this.spread) this.spread.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input ) this.input .invalidateInputs(parse, from, force);
        if (this.min   ) this.min   .invalidateInputs(parse, from, force);
        if (this.max   ) this.max   .invalidateInputs(parse, from, force);
        if (this.power ) this.power .invalidateInputs(parse, from, force);
        if (this.bias  ) this.bias  .invalidateInputs(parse, from, force);
        if (this.spread) this.spread.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input ) this.input .iterateLoop(parse);
        if (this.min   ) this.min   .iterateLoop(parse);
        if (this.max   ) this.max   .iterateLoop(parse);
        if (this.power ) this.power .iterateLoop(parse);
        if (this.bias  ) this.bias  .iterateLoop(parse);
        if (this.spread) this.spread.iterateLoop(parse);
    }
}
