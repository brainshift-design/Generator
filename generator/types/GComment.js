class GComment
extends GOperator
{
    constructor(nodeId, options)
    {
        super(COMMENT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GComment(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NullValue();


        this.setUpdateValues(parse, [['', new NullValue()]]);
        
        
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
    
    
        const cmnt = new GComment(nodeId, options);
    
        
        if (parse.settings.logRequests) 
            logReq(cmnt, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, cmnt);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        genParseNodeEnd(parse, cmnt);
        return cmnt;
    }
}
