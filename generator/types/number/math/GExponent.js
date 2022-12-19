class GExponent
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_EXPONENT, nodeId, options);
    }


    
    copy()
    {
        const exp = new GExponent(this.nodeId, this.options);
        exp.copyBase(this);
        if (this.input) exp.input = this.input.copy();
        return exp;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        evalNodeValue(this, (a, b) => Math.pow(a, b), false, parse);
        
        this.validate();

        return this;
    }
}