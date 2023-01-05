class GGreater
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_GREATER, nodeId, options);
    }


    
    copy()
    {
        const gt = new GGreater(this.nodeId, this.options);
        gt.copyBase(this);
        gt.inputs = this.inputs.map(i => i.copy());
        return gt;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalGreaterInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalGreaterInputs(val0, val1) 
{ 
    return new NumberValue(val0.value >  val1.value ? 1 : 0); 
}
