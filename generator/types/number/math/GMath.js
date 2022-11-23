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
        const math = new GMath(this.nodeId, this.options);

        math.copyBase(this);

        math.inputs    = this.inputs.map(i => i.copy());
        math.operation = this.operation.copy();

        return math;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        this.operation = this.operation.eval(parse).copy();
        const op = this.operation.toValue();

        op.value = Math.min(Math.max(0, op.value), MATH_OPS.length-1);

        switch (op.value)
        {
            case 0: this.value = evalSubtractInput(this.input, parse); break;
            case 1: this.value = evalAddInput     (this.input, parse); break;
            case 2: this.value = evalDivideInput  (this.input, parse); break;
            case 3: this.value = evalMultiplyInput(this.input, parse); break;
            case 4: this.value = evalModuloInput  (this.input, parse); break;
            case 5: this.value = evalExponentInput(this.input, parse); break;
        }

        
        genPushUpdateValue(parse, this.nodeId, 'operation', op);


        this.validate();

        return this;
    }
}
