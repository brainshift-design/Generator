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



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const op = (await this.operation.eval(parse)).toValue().toInteger();

        op.value = Math.min(Math.max(0, op.value), BOOLEAN_OPS.length-1);

        
        switch (op.value)
        {
            case BOOLEAN_NOT: this.value = await evalNandInputs(this.inputs, parse); break;
            case BOOLEAN_AND: this.value = await evalAndInputs (this.inputs, parse); break;
            case BOOLEAN_OR:  this.value = await evalOrInputs  (this.inputs, parse); break;
            case BOOLEAN_XOR: this.value = await evalXorInputs (this.inputs, parse); break;
        }

        
        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'operation', op);
            genPushUpdateValue(parse, this.nodeId, 'value',     this.value);
        }


        this.validate();

        return this;
    }



    invalidate()
    {
        super.invalidate();

        if (this.operation) this.operation.invalidate();
    }
}