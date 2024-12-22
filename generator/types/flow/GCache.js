class GCache
extends GOperator1
{
    static { GNode.types[CACHE] = this; }



    cachedValue = null;



    constructor(nodeId, options)
    {
        super(CACHE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.cachedValue = null;
    }



    copy()
    {
        const copy = new GCache(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (!this.options.enabled)
            this.cachedValue = null;
            
        if (   this.isCached()
            && this.cachedValue)
            return this;


        if (this.cachedValue)
        {
            this.value = this.cachedValue.copy();
        }
        else
        {
            const input = await evalValue(this.input, parse);

            this.value = input;

            if (   this.options.enabled
                && this.value)
                this.cachedValue = this.value.copy();
        }


        this.updateValueObjects();


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



    iterateCache(parse, from)
    {
        this.cachedValue = null;

        super.iterateCache(parse, from);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const cache = new GCache(nodeId, options);
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(cache, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, cache);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            cache.input = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, cache);
        return cache;
    }
}
