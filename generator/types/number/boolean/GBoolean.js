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
            case BOOLEAN_XOR: this.value = await evalXorInputs (this.inputs, parse); break;
            case BOOLEAN_OR:  this.value = await evalOrInputs  (this.inputs, parse); break;
            case BOOLEAN_AND: this.value = await evalAndInputs (this.inputs, parse); break;
        }

        
        this.setUpdateValues(parse,
        [
            ['value',     this.value],
            ['operation', op        ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.operation && this.operation.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.operation) this.operation.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.operation) this.operation.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.operation) this.operation.iterateLoop(parse);
    }
}