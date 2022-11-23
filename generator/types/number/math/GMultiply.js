class GMultiply
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_MULTIPLY, nodeId, options);
    }



    copy()
    {
        const mul = new GMultiply(this.nodeId, this.options);
        mul.copyBase(this);
        if (this.input) mul.input = this.input.copy();
        return mul;
    }

    

    eval(parse)
    {
        if (this.valid)
            return this;

        evalNodeValue(this, (a, b) => a * b, false, parse);
        this.validate();

        return this;
    }
}