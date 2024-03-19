class GBoolean
extends GArithmetic
{
    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_BOOLEAN, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.operation = null;
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


        let op = await evalNumberValue(this.operation, parse);

        if (op) op = op.toInteger();


        op.value     = 
        op.initValue = Math.min(Math.max(0, op.value), BOOLEAN_OPS.length-1);

        
        switch (op.value)
        {
            case BOOLEAN_NOT: this.value = await evalNandInputs(this.inputs, parse); break;
            case BOOLEAN_XOR: this.value = await evalXorInputs (this.inputs, parse); break;
            case BOOLEAN_OR:  this.value = await evalOrInputs  (this.inputs, parse); break;
            case BOOLEAN_AND: this.value = await evalAndInputs (this.inputs, parse); break;
        }

        
        this.setUpdateValues(parse,
        [
            //['value',     this.value],
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



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.operation) this.operation.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.operation) this.operation.iterateLoop(parse);
    }
}