class GSubtract
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_SUBTRACT, nodeId, options);
    }


    
    copy()
    {
        const sub = new GSubtract(this.nodeId, this.options);
        sub.copyBase(this);
        if (this.input) sub.input = this.input.copy();
        return sub;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        evalNodeValue(this, (a, b) => a - b, false, parse);
        this.validate();

        return this;
    }
}