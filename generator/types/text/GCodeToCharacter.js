class GCodeToCharacter
extends GOperator1
{
    static { GNode.types[TEXT_CHAR] = this; }



    constructor(nodeId, options)
    {
        super(TEXT_CHAR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCodeToCharacter(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberValue(this.input, parse);


        if (input)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == NUMBER_VALUE
                        ? getCodeToCharacterValue(item)
                        : TextValue.NaN());   
                }
            }
            else
            {
                this.value = getCodeToCharacterValue(input);
            }
        }
        else
            this.value = TextValue.NaN();


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
    
    
        const code2char = new GCodeToCharacter(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(code2char, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, code2char);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            code2char.input = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, code2char);
        return code2char;
    }
}



function getCodeToCharacterValue(input)
{
    return new TextValue(String.fromCharCode(Math.min(Math.max(0, input.value), 0xffff)));
}