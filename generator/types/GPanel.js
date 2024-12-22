class GPanel
extends GOperator
{
    static { GNode.types[PANEL] = this; }



    constructor(nodeId, options)
    {
        super(PANEL, nodeId, options);
    }


    
    copy()
    {
        const copy = new GPanel(this.nodeId, this.options);

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
    
    
        const panel = new GPanel(nodeId, options);
    
        
        if (parse.settings.logRequests) 
            logReq(panel, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, panel);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        genParseNodeEnd(parse, panel);
        return panel;
    }
}
