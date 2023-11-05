class GMath
extends GArithmetic
{
    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_MATH, nodeId, options);
    }


    reset()
    {
        super.reset();

        this.operation = null;
    }



   
    copy()
    {
        const copy = new GMath(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.operation) copy.operation = this.operation.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const op = (await this.operation.eval(parse)).toValue().toInteger();

        op.value    = Math.min(Math.max(0, Math.round(op.value)), MATH_OPS.length-1);
        op.decimals = 0;


        switch (op.value)
        {
            case 0: this.value = await evalSubtractInputs(this.inputs, parse); break;
            case 1: this.value = await evalAddInputs     (this.inputs, parse); break;
            case 2: this.value = await evalModuloInputs  (this.inputs, parse); break;
            case 3: this.value = await evalDivideInputs  (this.inputs, parse); break;
            case 4: this.value = await evalMultiplyInputs(this.inputs, parse); break;
            case 5: this.value = await evalExponentInputs(this.inputs, parse); break;
        }


        this.setUpdateValues(parse,
        [
            ['value',     this.value],
            ['operation', op        ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.operation && this.operation.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.operation) this.operation.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.operation) this.operation.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.operation) this.operation.iterateLoop(parse);
    }
}
