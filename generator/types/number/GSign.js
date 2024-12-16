class GSign
extends GOperator1
{
    static { nodeTypes[NUMBER_SIGN] = this; }



    constructor(nodeId, options)
    {
        super(NUMBER_SIGN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSign(this.nodeId, this.options);

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
                        ? getSignValue(item)
                        : NumberValue.NaN());   
                }
            }
            else
                this.value = getSignValue(input);
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
    
    
        const sign = new GSign(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(sign, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, sign);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            sign.input = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, sign);
        return sign;
    }
}



function getSignValue(input)
{
    consoleAssert(
         input.type == NUMBER_VALUE, 
        'input.type must be NUMBER_VALUE');

    return new NumberValue(Math.sign(input.value));
}