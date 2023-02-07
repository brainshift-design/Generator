class GLessOrEqual
extends GConditionBase
{
    constructor(nodeId, options)
    {
        super(NUMBER_LESS_OR_EQUAL, nodeId, options);
    }


    
    copy()
    {
        const copy = new GLessOrEqual(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalLessOrEqualInputs(this.input0, this.input1, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalLessOrEqualInputs(input0, input1, parse) 
{
    if (   input0 
        && input1)
    {
        const val0 = input0.eval(parse).toValue();
        const val1 = input1.eval(parse).toValue();

        return new NumberValue(val0.toNumber() <= val1.toNumber() ? 1 : 0);
    }
    else                  
        return NumberValue.NaN;
}
