class GBoolean
extends GArithmetic
{
    static { GNode.types[NUMBER_BOOLEAN] = this; }



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

        if (this.operation) copy.operation = this.operation.copy();

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
            ['operation', op]
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



    static parseRequest(parse)
    {
        const [type, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const bool = new GBoolean(nodeId, options);
    
        
        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());
    
    
        if (parse.settings.logRequests) 
            logReq(bool, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, bool);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
        for (let i = 0; i < nInputs; i++)
            bool.inputs.push(genParse(parse));
    
    
        bool.operation = genParse(parse);
    
    
        parse.nTab--;
    
            
        genParseNodeEnd(parse, bool);
        return bool;
    }
}