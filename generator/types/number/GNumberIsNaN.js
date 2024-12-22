class GNumberIsNaN
extends GOperator1
{
    static { GNode.types[NUMBER_IS_NAN] = this; }



    constructor(nodeId, options)
    {
        super(NUMBER_IS_NAN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNumberIsNaN(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberOrListValue(this. input, parse);


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
                        ? getNumberIsNaN(item)
                        : TextValue.NaN());   
                }
            }
            else
            {
                this.value = getNumberIsNaN(input);
            }
        }

        else
            this.value = BooleanValue.NaN();


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
    
    
        const nanIsNum = new GNumberIsNaN(nodeId, options);
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(nanIsNum, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, nanIsNum);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            nanIsNum.input = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, nanIsNum);
        return nanIsNum;
    }
}



function getNumberIsNaN(input)
{
    return !input.isValid()
        ? new BooleanValue(true )
        : new BooleanValue(false);
}