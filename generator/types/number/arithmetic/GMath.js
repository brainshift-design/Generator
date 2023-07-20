class GMath
extends GArithmetic
{
    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_MATH, nodeId, options);
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

        op.value = Math.min(Math.max(0, op.value), MATH_OPS.length-1);

        switch (op.value)
        {
            case 0: this.value = await evalSubtractInputs(this.inputs, parse); break;
            case 1: this.value = await evalAddInputs     (this.inputs, parse); break;
            case 2: this.value = await evalModuloInputs  (this.inputs, parse); break;
            case 3: this.value = await evalDivideInputs  (this.inputs, parse); break;
            case 4: this.value = await evalMultiplyInputs(this.inputs, parse); break;
            case 5: this.value = await evalExponentInputs(this.inputs, parse); break;
        }


        this.updateValues =
        [
            ['value',     this.value],
            ['operation', op        ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.operation) this.operation.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.operation) this.operation.invalidateInputs(from);
    }
}
