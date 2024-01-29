class GSequence
extends GOperator
{
    start    = null;
    multiply = null;
    add      = null;
    end      = null;

    current  = null;
    
    
    
    constructor(nodeId, options)
    {
        super(NUMBER_SEQUENCE, nodeId, options);
    }



    reset()
    {
        super.reset();
        
        this.start    = null;
        this.multiply = null;
        this.add      = null;
        this.end      = null;
    
        this.current  = null;
    }


   
    copy()
    {
        const copy = new GSequence(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.start   ) copy.start    = this.start   .copy();
        if (this.multiply) copy.multiply = this.multiply.copy();
        if (this.add     ) copy.add      = this.add     .copy();
        if (this.end     ) copy.end      = this.end     .copy();

        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        const start = this.start    ? (await this.start   .eval(parse)).toValue() : null;
        const mult  = this.multiply ? (await this.multiply.eval(parse)).toValue() : null;
        const add   = this.add      ? (await this.add     .eval(parse)).toValue() : null;
        const end   = this.end      ? (await this.end     .eval(parse)).toValue() : null;
    

        if (   start
            && mult
            && add
            && end)
        {
            const value = start.value + (this.options.enabled ? add.value * this.iteration : 0);

            if (!end.isValid())
                this.value = getSequenceValue(start, mult, add, this.iteration, this.options.enabled);

            else if (   end.isValid()   
                     && (   add.value == 0
                         || add.value >  0 && start.value < end.value
                                           &&       value < end.value
                         || add.value <  0 && start.value > end.value
                                           &&       value > end.value))
                this.value = getSequenceValue(start, mult, add, this.iteration, this.options.enabled);

            else
                this.value = NumberValue.NaN;
        }
        else
            this.value = NumberValue.NaN;


        this.setUpdateValues(parse,
        [
            ['start',    start],
            ['multiply', mult ],
            ['add',      add  ],
            ['end',      end  ]
        ]);
        

        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return this.start    && this.start   .isValid()
            && this.multiply && this.multiply.isValid()
            && this.add      && this.add     .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start   ) this.start   .pushValueUpdates(parse);
        if (this.multiply) this.multiply.pushValueUpdates(parse);
        if (this.add     ) this.add     .pushValueUpdates(parse);
        if (this.end     ) this.end     .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.start   ) this.start   .invalidateInputs(parse, from, force);
        if (this.multiply) this.multiply.invalidateInputs(parse, from, force);
        if (this.add     ) this.add     .invalidateInputs(parse, from, force);
        if (this.end     ) this.end     .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.start   ) this.start   .iterateLoop(parse);
        if (this.multiply) this.multiply.iterateLoop(parse);
        if (this.add     ) this.add     .iterateLoop(parse);
        if (this.end     ) this.end     .iterateLoop(parse);
    }
}



function getSequenceValue(start, mult, add, iteration, enabled)
{
    let value = start.value;

    if (enabled)
    {
        const _mult = Math.pow(mult.value, iteration);
        const _add  = add.value * iteration;

        value = start.value * _mult + _add;
    }

    return new NumberValue(value);
}