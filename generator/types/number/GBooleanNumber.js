class GBooleanNumber
extends GOperator1
{
    static { nodeTypes[BOOLEAN_NUMBER] = this; }



    constructor(nodeId, options)
    {
        super(BOOLEAN_NUMBER, nodeId, options);
    }



    copy()
    {
        const copy = new GBooleanNumber(this.nodeId, this.options);
        
        copy.copyBase(this);

        copy.value = this.value;

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalBooleanNumberValue(this.input, parse);


        if (input)
            this.value = input;
        else if (this.value)
            await this.value.eval(parse);
        else
            this.value = NumberValue.NaN();


        // force 0 or 1
        if (this.value.isValid())
        {
            this.value = new NumberValue(
                Math.round(Math.min(Math.max(0, this.value.value), 1)), 
                0,
                true);
        }


        this.setUpdateValues(parse, 
        [
            ['value', this.value]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return !this.input 
             || this.input.isValid();
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const bool = new GBooleanNumber(nodeId, options);
    
        
        if (parse.settings.logRequests) 
            logReq(bool, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, bool);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
        parse.inParam = false;
    
    
        if (parse.next == NUMBER_VALUE) bool.value = genParse(parse);
        else                            bool.input = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, bool);
        return bool;
    }
}