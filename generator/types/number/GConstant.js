class GConstant
extends GOperator
{
    static { GNode.types[NUMBER_CONSTANT] = this; }



    constant;



    constructor(nodeId, options)
    {
        super(NUMBER_CONSTANT, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.constant = null;
    }



    copy()
    {
        const copy = new GConstant(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.constant) copy.constant = this.constant.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        // input not used for evaluation


        const constant = await evalNumberValue(this.constant, parse);

        
        let value;

        switch (Math.min(Math.max(0, constant.toNumber()), 5))
        {
            case 0: value = 1.4142135623; break; // √̅2
            case 1: value = 2.7182818284; break; // e
            case 2: value = 0.6180339887; break; // phi
            case 3: value = 1.6180339887; break; // PHI
            case 4: value = 3.1415926536; break; // pi
            case 5: value = 6.2831853072; break; // tau
        }


        this.value = new NumberValue(value);

        
        this.setUpdateValues(parse,
        [
            ['value',   this.value],
            ['constant', constant ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return this.constant && this.constant.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.constant) this.constant.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.constant) this.constant.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.constant) this.constant.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const _const = new GConstant(nodeId, options);
    
    
        if (parse.settings.logRequests) 
            logReq(_const, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, _const);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        _const.constant = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, _const);
        return _const;
    }
}
