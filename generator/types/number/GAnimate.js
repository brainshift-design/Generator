class GAnimate
extends GNumberType
{
    from;
    to;
    curve;
    type;
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
        if (this.type  ) copy.type   = this.type  .copy();
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
        const type   = (await this.type  .eval(parse)).toValue();
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
        

        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'value',  this.value);
            genPushUpdateValue(parse, this.nodeId, 'from',   from      );
            genPushUpdateValue(parse, this.nodeId, 'to',     to        );
            genPushUpdateValue(parse, this.nodeId, 'curve',  curve     );
            genPushUpdateValue(parse, this.nodeId, 'type',   type      );
            genPushUpdateValue(parse, this.nodeId, 'length', length    );
            genPushUpdateValue(parse, this.nodeId, 'time',   time      );
        }
        

        this.validate();

        return this;
    }



    invalidate()
    {
        super.invalidate();

        if (this.from  ) this.from  .invalidate();
        if (this.to    ) this.to    .invalidate();
        if (this.curve ) this.curve .invalidate();
        if (this.type  ) this.type  .invalidate();
        if (this.length) this.length.invalidate();
        if (this.time  ) this.time  .invalidate();
    }
}
