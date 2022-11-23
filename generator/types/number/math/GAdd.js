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

        evalNodeValue(this, (a, b) => a + b, false, parse);
        this.validate();

        return this;
    }
}