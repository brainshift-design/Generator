class GVarMath
extends GVarArithmetic
{
    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_VAR_MATH, nodeId, options);
    }


    
    copy()
    {
        const math = new GVarMath(this.nodeId, this.options);

        math.copyBase(this);

        math.inputs    = this.inputs.map(i => i.copy());
        math.operation = this.operation.copy();

        return math;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        this.operation = this.operation.eval(parse).copy();
        const op = this.operation.toValue();

        op.value = Math.min(Math.max(0, op.value), MATH_OPS.length-1);

        switch (op.value)
        {
            case 0: this.value = evalVarSubtractInputs(this.inputs, parse); break;
            case 1: this.value = evalVarAddInputs     (this.inputs, parse); break;
            case 2: this.value = evalVarDivideInputs  (this.inputs, parse); break;
            case 3: this.value = evalVarMultiplyInputs(this.inputs, parse); break;
            case 4: this.value = evalVarModuloInputs  (this.inputs, parse); break;
            case 5: this.value = evalVarExponentInputs(this.inputs, parse); break;
        }

        
        genPushUpdateValue(parse, this.nodeId, 'operation', op);


        this.validate();

        return this;
    }
}
