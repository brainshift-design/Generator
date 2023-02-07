class GNotEqual
extends GConditionBase
{
    constructor(nodeId, options)
    {
        super(NUMBER_NOT_EQUAL, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNotEqual(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalNotEqualInputs(this.input0, this.input1, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalNotEqualInputs(val0, val1) 
{ 
    return new NumberValue(val0.value != val1.value ? 1 : 0); 
}



function evalNotEqualInputs(input0, input1, parse) 
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
