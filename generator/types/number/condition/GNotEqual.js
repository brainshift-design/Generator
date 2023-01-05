class GNotEqual
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_NOT_EQUAL, nodeId, options);
    }


    
    copy()
    {
        const ne = new GNotEqual(this.nodeId, this.options);
        ne.copyBase(this);
        ne.inputs = this.inputs.map(i => i.copy());
        return ne;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalNotEqualInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalNotEqualInputs(val0, val1) 
{ 
    return new NumberValue(val0.value != val1.value ? 1 : 0); 
}
