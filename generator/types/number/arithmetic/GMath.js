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

        copy.inputs    = this.inputs.map(i => i.copy());
        copy.operation = this.operation.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        const op = this.operation.eval(parse).toValue().toInteger();

        op.value = Math.min(Math.max(0, op.value), MATH_OPS.length-1);

        switch (op.value)
        {
            case 0: this.value = evalSubtractInputs(this.inputs, parse); break;
            case 1: this.value = evalAddInputs     (this.inputs, parse); break;
            case 2: this.value = evalDivideInputs  (this.inputs, parse); break;
            case 3: this.value = evalMultiplyInputs(this.inputs, parse); break;
            case 4: this.value = evalModuloInputs  (this.inputs, parse); break;
            case 5: this.value = evalExponentInputs(this.inputs, parse); break;
        }

        
        genPushUpdateValue(parse, this.nodeId, 'operation', op);
        genPushUpdateValue(parse, this.nodeId, 'value',     this.value);



        this.validate();

        return this;
    }
}
