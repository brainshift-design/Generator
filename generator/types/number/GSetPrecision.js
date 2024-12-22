class GSetPrecision
extends GOperator1
{
    static { GNode.types[NUMBER_PRECISION] = this; }



    decimals;



    constructor(nodeId, options)
    {
        super(NUMBER_PRECISION, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.decimals = null;
    }



    copy()
    {
        const copy = new GSetPrecision(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.decimals) copy.decimals = this.decimals.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const input    = await evalNumberOrListValue(this.input,    parse);
        const decimals = await evalNumberValue      (this.decimals, parse);


        if (input)
        {
            if (this.options.enabled)
            {
                this.evalInputOrList(
                    input, 
                    item => getSetPrecisionValue(item, decimals), 
                    NumberValue.NaN()); 
            }
            else
                this.value = input;
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type',     this.outputType()],
            ['value',    this.value       ],
            ['decimals', decimals         ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.decimals && this.decimals.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.decimals) this.decimals.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.decimals) this.decimals.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.decimals) this.decimals.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const prec = new GSetPrecision(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(prec, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, prec);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            prec.input = genParse(parse);
    
        prec.decimals = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, prec);
        return prec;
    }
}



function getSetPrecisionValue(input, decimals)
{
    consoleAssert(
            input == NUMBER_VALUE
         || input == COLOR_VALUE
         || input == FILL_VALUE, 
        'input must be NUMBER_VALUE');


    if (input.type == COLOR_VALUE)
        return new ColorValue(
            input.space,
            getPrecisionValue(input.c1, decimals),
            getPrecisionValue(input.c2, decimals),
            getPrecisionValue(input.c3, decimals));
    
    else if (input.type == FILL_VALUE)
    {
        return new FillValue(
            new ColorValue(
                input.color.space,
                getPrecisionValue(input.color.c1, decimals),
                getPrecisionValue(input.color.c2, decimals),
                getPrecisionValue(input.color.c3, decimals)),
            getPrecisionValue(input.opacity, decimals),
            input.blend);
    }
    else
        return getPrecisionValue(input, decimals);
}



function getPrecisionValue(value, decimals)
{
    return new NumberValue(
        value.value,
        decimals.value);
}