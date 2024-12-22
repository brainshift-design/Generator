class GAbsolute
extends GOperator1
{
    static { GNode.types[NUMBER_ABSOLUTE] = this; }



    constructor(nodeId, options)
    {
        super(NUMBER_ABSOLUTE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GAbsolute(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberOrListValue(this.input, parse);


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
                        ? getAbsoluteValue(item, this.options.enabled)
                        : NumberValue.NaN());   
                }
            }
            else
                this.value = getAbsoluteValue(input, this.options.enabled);
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
    
    
        const abs = new GAbsolute(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(abs, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, abs);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            abs.input = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, abs);
        return abs;
    }
}



function getAbsoluteValue(input, enabled)
{
    consoleAssert(
         input.type == NUMBER_VALUE, 
        'input.type must be NUMBER_VALUE');

    return enabled
        ? new NumberValue(Math.abs(input.value), input.decimals)
        : input;
}