class GNull
extends GOperator1
{
    static { GNode.types[NULL_NODE] = this; }



    constructor(nodeId, options)
    {
        super(NULL_NODE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNull(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.input) copy.input = this.input.copy();

        return copy;
    }



    async eval(parse)
    {
        // if (this.isCached())
        //     return this;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toNewValue() 
            : new NullValue();


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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const _null = new GNull(nodeId, options);
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(_null, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, _null);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            _null.input = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, _null);
        return _null;
    }
}
