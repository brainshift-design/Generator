class GNumberBias
extends GOperator1
{
    static { GNode.types[NUMBER_BIAS] = this; }



    min    = null;
    max    = null;
    bias   = null;
    spread = null;


    
    constructor(nodeId, options)
    {
        super(NUMBER_BIAS, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.min    = null;
        this.max    = null;
        this.bias   = null;
        this.spread = null;
    }



    copy()
    {
        const copy = new GNumberBias(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.min   ) copy.min    = this.min   .copy();
        if (this.max   ) copy.max    = this.max   .copy();
        if (this.bias  ) copy.bias   = this.bias  .copy();
        if (this.spread) copy.spread = this.spread.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.min    || this.min   .isCached())
            && (!this.max    || this.max   .isCached())
            && (!this.bias   || this.bias  .isCached())
            && (!this.spread || this.spread.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const input  = await evalNumberOrListValue(this.input,  parse);
        const min    = await evalNumberValue      (this.min,    parse);
        const max    = await evalNumberValue      (this.max,    parse);
        const bias   = await evalNumberValue      (this.bias,   parse);
        const spread = await evalNumberValue      (this.spread, parse);


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
                        ? getNumberBiasValue(item, min, max, bias, spread, this.options.enabled)
                        : NumberValue.NaN());   
                }
            }
            else
                this.value = getNumberBiasValue(input, min, max, bias, spread, this.options.enabled);
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type',   this.outputType()],
            ['min',    min              ],
            ['max',    max              ],
            ['bias',   bias             ],
            ['spread', spread           ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.min    && this.min   .isValid()
            && this.max    && this.max   .isValid()
            && this.bias   && this.bias  .isValid()
            && this.spread && this.spread.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.min   ) this.min   .pushValueUpdates(parse);
        if (this.max   ) this.max   .pushValueUpdates(parse);
        if (this.bias  ) this.bias  .pushValueUpdates(parse);
        if (this.spread) this.spread.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.min   ) this.min   .invalidateInputs(parse, from, force);
        if (this.max   ) this.max   .invalidateInputs(parse, from, force);
        if (this.bias  ) this.bias  .invalidateInputs(parse, from, force);
        if (this.spread) this.spread.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.min   ) this.min   .iterateLoop(parse);
        if (this.max   ) this.max   .iterateLoop(parse);
        if (this.bias  ) this.bias  .iterateLoop(parse);
        if (this.spread) this.spread.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const bias = new GNumberBias(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(bias, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, bias);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            bias.input = genParse(parse);
    
        bias.min    = genParse(parse);
        bias.max    = genParse(parse);
        bias.bias   = genParse(parse);
        bias.spread = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, bias);
        return bias;
    }
}



function getSpreadBias(f, bias, spread)
{
    const b = bias   / 50;
    const s = spread / 50;


    f = 
        b >= 0
        ? 1 - Math.pow(1-f, 1+b)
        :     Math.pow(  f, 1-b);


         if (s >= 0 && f >= 0.5) f = 1 - Math.pow((1-f)*2, 1+s) / 2;
    else if (s >= 0 && f <  0.5) f = Math.pow(f*2, 1+s) / 2;
    else if (s < 0)              f = lerp3(0, (1-s)/3, (2+s)/3, 1, f);


    return f;
}



function getNumberBiasValue(input, min, max, bias, spread, enabled)
{
    consoleAssert(
        input.type == NUMBER_VALUE, 
       'input.type must be NUMBER_VALUE');


    if (!enabled)
        return input;


    let f = (input.value - min.value) / (max.value - min.value);

    f = getSpreadBias(f, bias.value, spread.value);
    f = min.value + f * (max.value - min.value);

    return new NumberValue(
        f, 
        Math.max(
            input.decimals,
            min  .decimals,
            max  .decimals));
}