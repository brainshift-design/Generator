class GTextToBoolean
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(TEXT_TO_BOOLEAN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextToBoolean(this.nodeId, this.options);

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
                        ? getTextToBooleanValue(item)
                        : NumberValue.NaN());   
                }
            }
            else
                this.value = getTextToBooleanValue(input);
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
    
    
        const text2bool = new GTextToBoolean(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(text2bool, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, text2bool);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            text2bool.input = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, text2bool);
        return text2bool;
    }
}



function getTextToBooleanValue(input)
{
    if (stringIsNumber(input.value)) 
        return new BooleanValue(parseFloat(input.value) > 0);
    else        
    {
             if (input.value.trim().toLowerCase() == 'true' ) return new BooleanValue(true);
        else if (input.value.trim().toLowerCase() == 'false') return new BooleanValue(false);
        else                                                  return BooleanValue.NaN();
    }
}