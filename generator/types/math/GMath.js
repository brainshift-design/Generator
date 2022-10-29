class GMath
extends GArithmetic
{
    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_MATH, nodeId, options);
    }


    
    eval(parse)
    {
        if (this.valid)
            return;


        this.operation.eval(parse);
        const op = this.operation.toValue();

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

        
        genPushUpdateValue(parse, this.nodeId, 'value',     this.value);
        genPushUpdateValue(parse, this.nodeId, 'operation', op);


        this.valid = true;
    }
}
