class GTgig
extends GNumberType
{
    input = null;

    function;



    constructor(nodeId, options)
    {
        super(NUMBER_TRIG, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTrig(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();

        copy.operation = this.operation.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const func = (await this.operation.eval(parse)).toValue().toInteger();

        func.value = Math.min(Math.max(0, func.value), TRIG_OPS.length-1);

        
        switch (func.value)
        {
            case TRIG_SIN: this.value = await evalSine   (this.input, parse);  break;
            case TRIG_COS: this.value = await evalCosine (this.input, parse);  break;
            case TRIG_TAN: this.value = await evalTangent(this.input, parse);  break;
        }


        genPushUpdateValue(parse, this.nodeId, 'value',    this.value);
        genPushUpdateValue(parse, this.nodeId, 'function', func);


        this.validate();

        return this;
    }



    invalidate()
    {
        super.invalidate();

        if (this.input0   ) this.input0   .invalidate();
        if (this.input1   ) this.input1   .invalidate();
        if (this.operation) this.operation.invalidate();
    }
}