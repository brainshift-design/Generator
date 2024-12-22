class GNegative
extends GOperator1
{
    static { GNode.types[NUMBER_NEGATIVE] = this; }



    constructor(nodeId, options)
    {
        super(NUMBER_NEGATIVE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNegative(this.nodeId, this.options);

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
                        ? getNegativeValue(item, this.options.enabled)
                        : NumberValue.NaN());   
                }
            }
            else
                this.value = getNegativeValue(input, this.options.enabled);
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
    
    
        const neg = new GNegative(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(neg, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, neg);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            neg.input = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, neg);
        return neg;
    }
}



function getNegativeValue(input, enabled)
{
    consoleAssert(
         input == NUMBER_VALUE, 
        'input must be NUMBER_VALUE');

    return new NumberValue(
        (enabled ? -1 : 1) * input.value,
        input.decimals);
}