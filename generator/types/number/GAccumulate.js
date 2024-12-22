class GAccumulate
extends GOperator1
{
    static { GNode.types[NUMBER_ACCUMULATE] = this; }



    current;
    when;



    constructor(nodeId, options)
    {
        super(NUMBER_ACCUMULATE, nodeId, options);

        this.current = new NumberValue(0);
    }


    
    reset()
    {
        super.reset();

        this.current = null;
        this.when    = null;
    }



    copy()
    {
        const copy = new GAccumulate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.when   ) copy.when    = this.when   .copy();
        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (    this.isCached()
            || !parse.evalAccumulate)
            return this;


        const input = await evalNumberValue(this.input, parse);
        const when  = await evalNumberValue(this.when,  parse);
            

        if (   input
            && when)
        {
            if (when.value == 0)
                this.value = this.current.copy();

            if (input)
            {
                this.current.value   += input.value;
                this.current.decimals = Math.max(this.current.decimals, input.decimals);
            }

            if (when.value > 0)
                this.value = this.current.copy();
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse, 
        [
            ['when', when]
        ]);
        

        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return super.isValid()
            && this.when && this.when.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.when) this.when.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.when) this.when.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.when) this.when.iterateLoop(parse);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        this.current = new NumberValue(0);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const accum = new GAccumulate(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(accum, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, accum);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            accum.input = genParse(parse);
    
        accum.when = genParse(parse);
    
            
        parse.nTab--;
    
    
        genParseNodeEnd(parse, accum);
        return accum;
    }
}
