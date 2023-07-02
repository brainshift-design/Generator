class GTrig
extends GNumberType1
{
    function;



    constructor(nodeId, options)
    {
        super(NUMBER_TRIG, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTrig(this.nodeId, this.options);

        copy.copyBase(this);

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
            ['value',    this.value],
            ['function', func      ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.function) this.function.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.function) this.function.invalidateInputs(from);
    }
}