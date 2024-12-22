class GGetValueName
extends GOperator1
{
    static { GNode.types[GET_VALUE_NAME] = this; }



    constructor(nodeId, options)
    {
        super(GET_VALUE_NAME, nodeId, options);
    }


    
    copy()
    {
        const copy = new GGetValueName(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new TextValue(
            this.input 
            ? (await this.input.eval(parse)).toNewValue().valueId
            : '');

        
        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
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
    
    
        const name = new GGetValueName(nodeId, options);
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(name, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, name);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            name.input = genParse(parse);
    
        name.name = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, name);
        return name;
    }
}
