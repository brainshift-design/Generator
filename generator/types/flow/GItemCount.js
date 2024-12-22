class GItemCount
extends GOperator1
{
    static { GNode.types[ITEM_COUNT] = this; }



    base = null;



    constructor(nodeId, options)
    {
        super(ITEM_COUNT, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.base = null;
    }



    copy()
    {
        const copy = new GItemCount(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();
        if (this.base) copy.base = this.base.copy();
        
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
        const base  = await evalNumberValue(this.base, parse);

        
        if (input)
        {
            const count = input.items.length;
            this.value = new NumberValue(count - (base.value == 0 ? 1 : 0));
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()],
            ['base', base            ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.base && this.base.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.base) this.base.pushValueUpdates(parse);
    }    



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.base) this.base.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.base) this.base.iterateLoop(parse);
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
    
        count.base = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, count);
        return count;
    }
}