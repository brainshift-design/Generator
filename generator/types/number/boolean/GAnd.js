class GAnd
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_AND, nodeId, options);
    }


    
    copy()
    {
        const copy = new GAnd(this.nodeId, this.options);
        copy.copyBase(this);
        copy.inputs = this.inputs.map(i => i.copy());
        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        this.value = evalAndInputs(this.inputs, parse);
        
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        this.validate();

        return this;
    }
}



function evalAndInputs(inputs, parse)
{
    if (isEmpty(inputs))
        return NumberValue.NaN;


    const value = new NumberValue();


    if (!isEmpty(inputs))
    {
        const val0 = inputs[0].eval(parse).toValue();
        if (!val0.isValid()) return NumberValue.NaN;

        value.value = val0.toNumber();


        for (let i = 1; i < inputs.length; i++)
        {
            const val = inputs[i].eval(parse).toValue();
            if (!val.isValid()) return NumberValue.NaN;

            crashAssert(
                val.type == NUMBER_VALUE, 
                'val.type must be NUMBER_VALUE');
                
            value.value = Math.min(value.value, val.toNumber());
        }

        
        if (value.value != 0)
            value.value = 1;
    }


    return value;
}