class GDivide
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_DIVIDE, nodeId, options);
    }


    
    copy()
    {
        const div = new GDivide(this.nodeId, this.options);
        div.copyBase(this);
        if (this.input) div.input = this.input.copy();
        return div;
    }



    eval(parse)
    {
        if (this.valid)
            return this;

        evalNodeValue(this, (a, b) => a / b, true, parse);
        this.validate();

        return this;
    }
}