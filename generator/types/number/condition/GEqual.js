class GEqual
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_EQUAL, nodeId, options);
    }


    
    copy()
    {
        const eq = new GEqual(this.nodeId, this.options);
        eq.copyBase(this);
        eq.inputs = this.inputs.map(i => i.copy());
        return eq;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalEqualInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalEqualInputs(val0, val1) 
{ 
    return new NumberValue(val0.value == val1.value ? 1 : 0); 
}
