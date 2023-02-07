class GBoolean
extends GArithmetic
{
    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_BOOLEAN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GBoolean(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs    = this.inputs.map(i => i.copy());
        copy.operation = this.operation.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        const op = this.operation.eval(parse).toValue().toInteger();

        op.value = Math.min(Math.max(0, op.value), BOOLEAN_OPS.length-1);

        
        switch (op.value)
        {
            case BOOLEAN_NOT: this.value = evalNandInputs(this.inputs, parse); break;
            case BOOLEAN_AND: this.value = evalAndInputs (this.inputs, parse); break;
            case BOOLEAN_OR:  this.value = evalOrInputs  (this.inputs, parse); break;
            case BOOLEAN_XOR: this.value = evalXorInputs (this.inputs, parse); break;
        }

        
        genPushUpdateValue(parse, this.nodeId, 'operation', op);
        genPushUpdateValue(parse, this.nodeId, 'value',     this.value);


        this.validate();

        return this;
    }
}