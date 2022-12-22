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

        math.operation = this.operation.copy();

        return math;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        const operation = this.operation.eval(parse).toValue();

        operation.value = Math.min(Math.max(0, operation.value), MATH_OPS.length-1);

        switch (operation.value)
        {
            case 0: evalNodeValue(this, (a, b) => a - b,          false, parse); break;
            case 1: evalNodeValue(this, (a, b) => a + b,          false, parse); break;
            case 2: evalNodeValue(this, (a, b) => a / b,          true , parse); break;
            case 3: evalNodeValue(this, (a, b) => a * b,          false, parse); break;
            case 4: evalNodeValue(this, (a, b) => a % b,          true , parse); break;
            case 5: evalNodeValue(this, (a, b) => Math.pow(a, b), false, parse); break;

            default: console.assert(false, 'Invalid math operation');
        }

        
        genPushUpdateValue(parse, this.nodeId, 'operation', operation);


        this.validate();

        return this;
    }
}
