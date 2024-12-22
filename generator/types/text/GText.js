class GText
extends GOperator1
{
    static { GNode.types[TEXT] = this; }



    constructor(nodeId, options)
    {
        super(TEXT, nodeId, options);
    }



    copy()
    {
        const copy = new GText(this.nodeId, this.options);
        
        copy.copyBase(this);

        copy.value = this.value;
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        if (this.input)
            this.value = await evalTextValue(this.input, parse);
        else if (this.value)
            await this.value.eval(parse);
        else
            this.value = new TextValue();


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return   !this.input
               && this.value != NAN_CHAR 
            || this.input.isValid();
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const text = new GText(nodeId, options);
    
        
        if (parse.settings.logRequests) 
            logReq(text, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, text);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
        parse.inParam = false;
    
    
        if (parse.next == TEXT_VALUE) text.value = genParse(parse);
        else                          text.input = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, text);
        return text;
    }
}