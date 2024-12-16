class GConvertAngle
extends GOperator1
{
    static { nodeTypes[CONVERT_ANGLE] = this; }



    from;



    constructor(nodeId, options)
    {
        super(CONVERT_ANGLE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.from = null;
    }



    copy()
    {
        const copy = new GConvertAngle(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.from) copy.from = this.from.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const input = await evalNumberOrListValue(this.input, parse);
        const from  = await evalNumberValue      (this.from,  parse);


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
                        ? getConvertAngleValue(item, from, this.options.enabled)
                        : NumberValue.NaN());   
                }
            }
            else
                this.value = getConvertAngleValue(input, from, this.options.enabled);
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            //['value', this.value       ],
            ['from',  from             ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.from && this.from.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from) this.from.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.from) this.from.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from) this.from.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const convert = new GConvertAngle(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(convert, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, convert);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            convert.input = genParse(parse);
    
        convert.from = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, convert);
        return convert;
    }
}



function getConvertAngleValue(input, from, enabled)
{
    consoleAssert(
         input == NUMBER_VALUE, 
        'input must be NUMBER_VALUE');
        

    const value = input;
    
    if (enabled)
    {
        switch (from.value)
        {
            case 0: value.value = value.value/360 * Tau; break;
            case 1: value.value = value.value/Tau * 360; break;
        }

        value.decimals = decDigits(value.value);
    }


    return value;
}