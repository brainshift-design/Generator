class GAnimate
extends GOperator
{
    from;
    to;
    curve;
    repeat;
    length;
    time;



    constructor(nodeId, options)
    {
        super(NUMBER_ANIMATE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GAnimate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.from  ) copy.from   = this.from  .copy();
        if (this.to    ) copy.to     = this.to    .copy();
        if (this.curve ) copy.curve  = this.curve .copy();
        if (this.repeat) copy.repeat = this.repeat.copy();
        if (this.length) copy.length = this.length.copy();
        if (this.time  ) copy.time   = this.time  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const from   = (await this.from  .eval(parse)).toValue();
        const to     = (await this.to    .eval(parse)).toValue();
        const curve  = (await this.curve .eval(parse)).toValue();
        const repeat = (await this.repeat.eval(parse)).toValue();
        const length = (await this.length.eval(parse)).toValue();
        const time   = (await this.time  .eval(parse)).toValue();
    

        const maxDec = Math.max(from.decimals, to.decimals);

        switch (curve.value)
        {
            case 0: 
            {
                this.value = new NumberValue(
                    time.value < length.value ? from.value : to.value, 
                    maxDec);
    
                break;
            }
            case 1: 
            {
                this.value = new NumberValue(
                    from.value + (to.value - from.value) * time.value / length.value,
                    maxDec);

                break;
            }
            case 2: 
            {
                let f = time.value / length.value;

                f = 1 - sqr(1 - f);

                this.value = new NumberValue(
                    from.value + (to.value - from.value) * f,
                    maxDec);
    
                break;
            }
            case 3: 
            {
                let f = time.value / length.value;

                f = sqr(f);

                this.value = new NumberValue(
                    from.value + (to.value - from.value) * f,
                    maxDec);
    
                break;
            }
            case 4: 
            {
                let f = time.value / length.value;

                f = 6*Math.pow(f, 5) - 15*Math.pow(f, 4) + 10*Math.pow(f, 3);

                this.value = new NumberValue(
                    from.value + (to.value - from.value) * f,
                    maxDec);
    
                break;
            }
        }
        

        this.setUpdateValues(parse,
        [
            ['from',   from  ],
            ['to',     to    ],
            ['curve',  curve ],
            ['repeat', repeat],
            ['length', length],
            ['time',   time  ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return this.from   && this.from  .isValid()
            && this.to     && this.to    .isValid()
            && this.curve  && this.curve .isValid()
            && this.repeat && this.repeat.isValid()
            && this.length && this.length.isValid()
            && this.time   && this.time  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from  ) this.from  .pushValueUpdates(parse);
        if (this.to    ) this.to    .pushValueUpdates(parse);
        if (this.curve ) this.curve .pushValueUpdates(parse);
        if (this.repeat) this.repeat.pushValueUpdates(parse);
        if (this.length) this.length.pushValueUpdates(parse);
        if (this.time  ) this.time  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.from  ) this.from  .invalidateInputs(parse, from);
        if (this.to    ) this.to    .invalidateInputs(parse, from);
        if (this.curve ) this.curve .invalidateInputs(parse, from);
        if (this.repeat) this.repeat.invalidateInputs(parse, from);
        if (this.length) this.length.invalidateInputs(parse, from);
        if (this.time  ) this.time  .invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from  ) this.from  .iterateLoop(parse);
        if (this.to    ) this.to    .iterateLoop(parse);
        if (this.curve ) this.curve .iterateLoop(parse);
        if (this.repeat) this.repeat.iterateLoop(parse);
        if (this.length) this.length.iterateLoop(parse);
        if (this.time  ) this.time  .iterateLoop(parse);
    }
}
