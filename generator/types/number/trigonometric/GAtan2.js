class GAtan2
extends GOperator
{
    static { nodeTypes[NUMBER_ATAN2] = this; }



    x;
    y;


    
    constructor(nodeId, options)
    {
        super(NUMBER_ATAN2, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.x = null;
        this.y = null;
    }



    copy()
    {
        const copy = new GAtan2(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.x) copy.x = this.x.copy();
        if (this.y) copy.y = this.y.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const x = await evalNumberValue(this.x, parse);
        const y = await evalNumberValue(this.y, parse);


        this.value = new NumberValue(Math.atan2(y.value, x.value));


        this.setUpdateValues(parse,
        [
            //['value', this.value],
            ['x',     x         ],
            ['y',     y         ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.x && this.x.isValid()
            && this.y && this.y.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x) this.x.pushValueUpdates(parse);
        if (this.y) this.y.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.x) this.x.invalidateInputs(parse, from, force);
        if (this.y) this.y.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.x) this.x.iterateLoop(parse);
        if (this.y) this.y.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const atan2 = new GAtan2(nodeId, options);
       
        
        if (parse.settings.logRequests) 
            logReq(atan2, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, atan2);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        atan2.x = genParse(parse);
        atan2.y = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, atan2);
        return atan2;
    }
}
