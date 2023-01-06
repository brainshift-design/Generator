class GEqual
extends GConditionBase
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

        this.value = evalEqualInputs(this.input0, this.input1, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalEqualInputs(input0, input1, parse) 
{
    if (   input0 
        && input1)
    {
        const val0 = input0.eval(parse).toValue();
        const val1 = input1.eval(parse).toValue();

        return new NumberValue(val0.toNumber() == val1.toNumber() ? 1 : 0);
    }
    else                  
        return NumberValue.NaN;
}
