class GFreeze
extends GOperator1
{
    static { nodeTypes[FREEZE] = this; }



    frozen = false;

    loopId = NULL;



    constructor(nodeId, options)
    {
        super(FREEZE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.frozen = false;
    }



    copy()
    {
        const copy = new GFreeze(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const repeat = parse.repeats.find(r => r.repeatId == this.loopId);


        if (      repeat
               && repeat.currentIteration == 0
            || !this.options.enabled)
            this.frozen = false;


        if (!this.frozen)
        {
            this.value = 
                this.input 
                ? (await this.input.eval(parse)).toNewValue()
                : new NullValue();

            this.frozen = true;

            this.updateValueObjects();
        }


        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            ['value', this.value       ]
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const freeze = new GFreeze(nodeId, options);
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(freeze, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, freeze);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            freeze.input = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, freeze);
        return freeze;
    }
}
