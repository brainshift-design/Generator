class GGreater
extends GConditionBase
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

        this.value = evalGreaterInputs(this.input0, this.input1, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalGreaterInputs(input0, input1, parse) 
{
    if (   input0 
        && input1)
    {
        const val0 = input0.eval(parse).toValue();
        const val1 = input1.eval(parse).toValue();
console.log('val0 =', val0);
console.log('val1 =', val1);
        return new NumberValue(val0.toNumber() > val1.toNumber() ? 1 : 0);
    }
    else                  
        return NumberValue.NaN;
}
