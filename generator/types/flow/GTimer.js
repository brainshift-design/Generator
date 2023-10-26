class GTimer
extends GOperator1
{
    interval = null;
   _while    = null;
    loop     = null;



    constructor(nodeId, options)
    {
        super(TIMER, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this. interval = null;
        this._while    = null;
        this. loop     = null;
    }



    copy()
    {
        const copy = new GTimer(this.nodeId, this.options);

        copy.copyBase(this);

        if (this. interval) copy. interval = this. interval.copy();
        if (this._while   ) copy._while    = this._while   .copy();
        if (this. loop    ) copy. loop     = this. loop    .copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const  interval = (await this. interval.eval(parse)).toValue();
        const _while    = (await this._while   .eval(parse)).toValue();
        const  loop     = (await this. loop    .eval(parse)).toValue();
            

        if (this.loop.type != NUMBER_VALUE) assertVolatile(this.loop, this);

        if (_while.value == 0)
            return this;


        if (this.input)
        {
            this.input.invalidateInputs(parse, this, true);

            const input = (await this.input.eval(parse)).toValue();

            this.value = input ? input : NullValue;

            if (this.loop.type != NUMBER_VALUE)
                this.loop.iterateLoop(parse);
        }
        else
            this.value = NullValue.copy();
            

        this.setUpdateValues(parse,
        [
            ['value',    this.value],
            ['interval', interval  ]
        ]);

        
        this.updateValueObjects();


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.interval && this.interval.isValid()
            && this._while   && this._while  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this. interval) this. interval.pushValueUpdates(parse);
        if (this._while   ) this._while   .pushValueUpdates(parse);
        if (this. loop    ) this. loop    .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this. interval) this. interval.invalidateInputs(parse, from, force);
        if (this._while   ) this._while   .invalidateInputs(parse, from, force);
        if (this. loop    ) this. loop    .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this. interval) this. interval.iterateLoop(parse);
        if (this._while   ) this._while   .iterateLoop(parse);
        if (this. loop    ) this. loop    .iterateLoop(parse);
    }
}
