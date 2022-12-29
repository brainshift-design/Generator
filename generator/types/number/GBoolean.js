class GBoolean
extends GVarArithmetic
{
    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_BOOLEAN, nodeId, options);
    }


    
    copy()
    {
        const bool = new GBoolean(this.nodeId, this.options);

        bool.copyBase(this);

        bool.inputs    = this.inputs.map(i => i.copy());
        bool.operation = this.operation.copy();

        return bool;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        const op = this.operation.eval(parse).toValue();

        op.value = Math.min(Math.max(0, op.value), BOOLEAN_OPS.length-1);

        switch (op.value)
        {
            case BOOLEAN_NOT: this.value = evalBoolInputsNand(this.inputs, parse); break;
            case BOOLEAN_AND: this.value = evalBoolInputsAnd (this.inputs, parse); break;
            case BOOLEAN_OR:  this.value = evalBoolInputsOr  (this.inputs, parse); break;
            case BOOLEAN_XOR: this.value = evalBoolInputsXor (this.inputs, parse); break;
        }

        
        genPushUpdateValue(parse, this.nodeId, 'operation', op);
        genPushUpdateValue(parse, this.nodeId, 'value',     this.value);



        this.validate();

        return this;
    }
}



function evalBoolInputsNand(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue(0);


    for (let i = 0; i < inputs.length; i++)
    {
        const val = inputs[i].eval(parse).toValue();

        console.assert(
            val.type == NUMBER_VALUE, 
            'val.type must belong to NUMBER_VALUE');

        if (val.toNumber() == 0)
            value.value = 1;
    }


    return value;
}



function evalBoolInputsAnd(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue(1);


    for (let i = 0; i < inputs.length; i++)
    {
        const val = inputs[i].eval(parse).toValue();

        console.assert(
            val.type == NUMBER_VALUE, 
            'val.type must belong to NUMBER_VALUE');

        if (val.toNumber() == 0)
            value.value = 0;
    }


    return value;
}



function evalBoolInputsOr(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue(0);


    for (let i = 0; i < inputs.length; i++)
    {
        const val = inputs[i].eval(parse).toValue();

        console.assert(
            val.type == NUMBER_VALUE, 
            'val.type must belong to NUMBER_VALUE');

        if (val.toNumber() != 0)
            value.value = 1;
    }


    return value;
}



function evalBoolInputsXor(inputs, parse)
{
    if (inputs.length == 0)
        return NumberValue.NaN;


    const value = new NumberValue(0);


    let flipped = 0;

    for (let i = 0; i < inputs.length; i++)
    {
        const val = inputs[i].eval(parse).toValue();

        console.assert(
            val.type == NUMBER_VALUE, 
            'val.type must belong to NUMBER_VALUE');

        if (val.toNumber() != 0)
        {
            value.value = 1;
            flipped++;
        }
    }


    if (   value.value != 0
        && flipped == inputs.length)
        value.value = 0;


    return value;
}