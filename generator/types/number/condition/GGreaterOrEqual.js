class GGreaterOrEqual
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_GREATER_OR_EQUAL, nodeId, options);
    }


    
    copy()
    {
        const ge = new GGreaterOrEqual(this.nodeId, this.options);
        ge.copyBase(this);
        ge.inputs = this.inputs.map(i => i.copy());
        return ge;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalGreaterOrEqualInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalGreaterOrEqualInputs(val0, val1) 
{ 
    return new NumberValue(val0.value >= val1.value ? 1 : 0); 
}