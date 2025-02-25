class GNumber
extends GOperator1
{
    static { GNode.types[NUMBER] = this; }



    constructor(nodeId, options)
    {
        super(NUMBER, nodeId, options);
    }



    copy()
    {
        const copy = new GNumber(this.nodeId, this.options);
        
        copy.copyBase(this);

        copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberValue(this.input, parse);


        if (input)
            this.value = input;

        else if (this.value)
        {
            await this.value.eval(parse);

            // this.value.meta = new NumberValueMeta(
            //     Number.MIN_SAFE_INTEGER,
            //     Number.MIN_SAFE_INTEGER,
            //     Number.MAX_SAFE_INTEGER,
            //     Number.MAX_SAFE_INTEGER,
            //     Number.NaN, // don't touch decimals
            //     NULL,
            //     0,
            //     false,
            //     [],
            //     false,
            //     NULL);
        }
        
        else
            this.value = NumberValue.NaN();


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
    
    
        const num = new GNumber(nodeId, options);
    
        
        if (parse.settings.logRequests) 
            logReq(num, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, num);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
        parse.inParam = false;
    
    
        if (parse.next == NUMBER_VALUE) num.value = genParse(parse);
        else                            num.input = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, num);
        return num;
    }
}
