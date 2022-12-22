class GModulo
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_MODULO, nodeId, options);
    }


    
    copy()
    {
        const mod = new GModulo(this.nodeId, this.options);
        mod.copyBase(this);
        if (this.input) mod.input = this.input.copy();
        return mod;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        evalNodeValue(this, (a, b) => a % b, true, parse);
        this.validate();

        return this;
    }
}