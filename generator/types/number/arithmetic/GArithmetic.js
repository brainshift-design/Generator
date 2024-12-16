class GArithmetic
extends GOperator
{
    inputs = [];



    reset()
    {
        super.reset();

        this.inputs = [];
    }



    getConditionNode()
    {
        const conditionNodes = [];

        for (const input of this.inputs)
        {
            const conditionNode = input.getConditionNode();
            if (conditionNode) conditionNodes.push(conditionNode);            
        }

        console.assert(conditionNodes.length < 2, 'Error: sort order requires not more than one order node');

        return conditionNodes.length == 1
             ? conditionNodes[0]
             : null;
    }



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached();
    }



    isValid()
    {
        return  this.inputs.length > 0
            && !this.inputs.find(i => !i.isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
    }



    static parseRequest(parse, newNode)
    {
        const [type, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const arith = newNode(nodeId, options);
    
    
        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());
    
    
        if (parse.settings.logRequests) 
            logReq(arith, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, arith);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
        for (let i = 0; i < nInputs; i++)
            arith.inputs.push(genParse(parse));
    
        parse.nTab--;
    
            
        genParseNodeEnd(parse, arith);
        return arith;
    }
}
