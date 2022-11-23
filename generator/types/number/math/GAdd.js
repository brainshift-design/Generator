class GAdd
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_ADD, nodeId, options);
    }


    
    copy()
    {
        const add = new GAdd(this.nodeId, this.options);
        add.copyBase(this);
        if (this.input) add.input = this.input.copy();
        return add;
    }



    eval(parse)
    {
        if (this.valid)
            return this;

        this.value = evalAddInput(this.input, this.operand, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'operand', this.operand.toValue());

        this.validate();

        return this;
    }
}



function evalAddInput(input, operand, parse)
{
    if (!input)
        return NumberValue.NaN;


    const value = new NumberValue(0);


    input   = input  .eval(parse).copy();
    opearnd = operand.eval(parse).copy();

    const val1 = input  .toValue();
    const val2 = operand.toValue();


    value.value    = val1.value + val2.value;
    value.decimals = Math.max(val1.decimals, val2.decimals);


    return value;
}