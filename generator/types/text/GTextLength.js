class GTextLength
extends GOperator1
{
    static { GNode.types[TEXT_LENGTH] = this; }



    constructor(nodeId, options)
    {
        super(TEXT_LENGTH, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextLength(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalTextOrListValue(this.input, parse);

        if (   input
            && input.isValid())
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? new NumberValue(item.value.length)
                        : NumberValue.NaN());
                }
            }
            else
                this.value = new NumberValue(input.value.length);
        }
        else
            this.value = NumberValue.NaN();
    

        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const len = new GTextLength(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(len, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, len);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            len.input = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, len);
        return len;
    }
}
