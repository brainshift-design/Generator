class GItemCount
extends GOperator1
{
    static { nodeTypes[ITEM_COUNT] = this; }



    start = null;



    constructor(nodeId, options)
    {
        super(ITEM_COUNT, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.start = null;
    }



    copy()
    {
        const copy = new GItemCount(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.start) copy.start = this.start.copy();
        
        if (this.count) copy.count = this.count.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalListValue  (this.input, parse);
        const start = await evalNumberValue(this.start, parse);

        
        if (input)
        {
            const count = input.items.length;
            this.value = new NumberValue(count - (start.value == 0 ? 1 : 0));
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            ['start', start            ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.start && this.start.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
    }    



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.start) this.start.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.start) this.start.iterateLoop(parse);
    }    



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const count = new GItemCount(nodeId, options);
    
        
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(count, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, count);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            count.input = genParse(parse);
    
        count.start = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, count);
        return count;
    }
}