class GTrig
extends GOperator1
{
    function;



    constructor(nodeId, options)
    {
        super(NUMBER_TRIG, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.function = null;
    }



    copy()
    {
        const copy = new GTrig(this.nodeId, this.options);

        copy.copyBase(this);

        copy.function = this.function.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const func = (await this.function.eval(parse)).toValue().toInteger();

        func.value = Math.min(Math.max(0, func.value), TRIG_OPS.length-1);

        
        switch (func.value)
        {
            case TRIG_SIN:  this.value = await evalSine   (this.input, parse, false);  break;
            case TRIG_COS:  this.value = await evalCosine (this.input, parse, false);  break;
            case TRIG_TAN:  this.value = await evalTangent(this.input, parse, false);  break;
            case TRIG_ASIN: this.value = await evalSine   (this.input, parse, true );  break;
            case TRIG_ACOS: this.value = await evalCosine (this.input, parse, true );  break;
            case TRIG_ATAN: this.value = await evalTangent(this.input, parse, true );  break;
        }


        this.setUpdateValues(parse,
        [
            ['value',    this.value],
            ['function', func      ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.function && this.function.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.function) this.function.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.function) this.function.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.function) this.function.iterateLoop(parse);
    }
}