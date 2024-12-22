class GCharacterToCode
extends GOperator1
{
    static { GNode.types[TEXT_UNICODE] = this; }



    constructor(nodeId, options)
    {
        super(TEXT_UNICODE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCharacterToCode(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalTextValue(this.input, parse);


        if (input)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? getCharacterToCodeValue(item)
                        : NumberValue.NaN());   
                }
            }
            else
            {
                this.value = getCharacterToCodeValue(input);
            }
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            //['value', this.value       ],
            ['type',  this.outputType()]
        ]);


        this.validate();

        return this;
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const char2code = new GCharacterToCode(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(char2code, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, char2code);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            char2code.input = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, char2code);
        return char2code;
    }
}



function getCharacterToCodeValue(input)
{
    return input.value.length > 0
         ? new NumberValue(input.value.charCodeAt(0))
         : NumberValue.NaN();
}