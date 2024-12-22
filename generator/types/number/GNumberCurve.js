class GNumberCurve
extends GOperator1
{
    static { GNode.types[NUMBER_CURVE] = this; }



    min   = null;
    max   = null;
    power = null;


    
    constructor(nodeId, options)
    {
        super(NUMBER_CURVE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.min   = null;
        this.max   = null;
        this.power = null;
    }



    copy()
    {
        const copy = new GNumberCurve(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.min  ) copy.min   = this.min  .copy();
        if (this.max  ) copy.max   = this.max  .copy();
        if (this.power) copy.power = this.power.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.min   || this.min  .isCached())
            && (!this.max   || this.max  .isCached())
            && (!this.power || this.power.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const input = await evalNumberOrListValue(this.input, parse);
        const min   = await evalNumberValue      (this.min,   parse);
        const max   = await evalNumberValue      (this.max,   parse);
        const power = await evalNumberValue      (this.power, parse);


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
                        ? getNumberCurveValue(item, min, max, power, this.options.enabled)
                        : NumberValue.NaN());   
                }
            }
            else
                this.value = getNumberCurveValue(input, min, max, power, this.options.enabled);
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            ['min',   min              ],
            ['max',   max              ],
            ['power', power            ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.min   && this.min  .isValid()
            && this.max   && this.max  .isValid()
            && this.power && this.power.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.min  ) this.min  .pushValueUpdates(parse);
        if (this.max  ) this.max  .pushValueUpdates(parse);
        if (this.power) this.power.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.min  ) this.min  .invalidateInputs(parse, from, force);
        if (this.max  ) this.max  .invalidateInputs(parse, from, force);
        if (this.power) this.power.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.min  ) this.min  .iterateLoop(parse);
        if (this.max  ) this.max  .iterateLoop(parse);
        if (this.power) this.power.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const curve = new GNumberCurve(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(curve, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, curve);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            curve.input = genParse(parse);
    
        curve.min   = genParse(parse);
        curve.max   = genParse(parse);
        curve.power = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, curve);
        return curve;
    }
}



function getNumberCurveValue(input, min, max, power, enabled)
{
    consoleAssert(
        input.type == NUMBER_VALUE, 
       'input.type must be NUMBER_VALUE');


    if (!enabled)
        return input;


    let f = (input.value - min.value) / (max.value - min.value);

    f = Math.pow(f, power.value);
    f = min.value + f * (max.value - min.value);
    
    return new NumberValue(f);
}