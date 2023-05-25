class GTrig
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


        const func = (await this.function.eval(parse)).toValue().toInteger();

        func.value = Math.min(Math.max(0, func.value), TRIG_OPS.length-1);

        
        switch (func.value)
        {
            case TRIG_SIN: this.value = await evalSine   (this.input, parse);  break;
            case TRIG_COS: this.value = await evalCosine (this.input, parse);  break;
            case TRIG_TAN: this.value = await evalTangent(this.input, parse);  break;
        }


        this.updateValues =
        [
            [returnValueId,    this.value],
            ['function', func      ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input   ) this.input   .pushValueUpdates(parse);
        if (this.function) this.function.pushValueUpdates(parse);
    }



    invalidate()
    {
        super.invalidate();

        if (this.input   ) this.input   .invalidate();
        if (this.function) this.function.invalidate();
    }
}