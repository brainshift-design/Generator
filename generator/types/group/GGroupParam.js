class GGroupParam
extends GOperator
{
    input    = null;
    
    dataType = NULL;



    constructor(nodeId, options)
    {
        super(GROUP_PARAM, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.input    = null;
        this.dataType = null;
    }



    copy()
    {
        const copy = new GGroupParam(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        
        copy.dataType = this.dataType;
      
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
        {
            if (!this.input.value)
                await this.input.eval(parse);

            this.value = this.input.toNewValue();
        }

        else if (this.dataType != NULL)
            this.value = nanFromType(this.dataType);
        
        else
            this.value = new NullValue();


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    toNewValue()
    {
        return this.value.copy();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input) this.input.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input) this.input.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const param = new GGroupParam(nodeId, options);
    
    
        let nInputs  = -1;
        let nOutputs = -1;
        
        if (!ignore)
        {
            nInputs  = parseInt(parse.move());
            nOutputs = parseInt(parse.move());
    
            consoleAssert(nInputs  == 0 || nInputs  == 1,  'nInputs must be [0, 1]');
            consoleAssert(nOutputs == 0 || nOutputs == 1, 'nOutputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(param, parse, ignore);//, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, param);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
        {
            param.input    = genParse(parse);
            param.dataType = parse.move();
        }
        else if (nOutputs == 1)
            param.dataType = parse.move();
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, param);
        return param;
    }
}