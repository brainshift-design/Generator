class GNumberMap
extends GOperator1
{
    static { nodeTypes[NUMBER_MAP] = this; }



    from = null;
    to   = null;


    
    constructor(nodeId, options)
    {
        super(NUMBER_MAP, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.from = null;
        this.to   = null;
    }



    copy()
    {
        const copy = new GNumberMap(this.nodeId, this.options);

        copy.copyBase(this);

        if (from) copy.from = this.from.copy();
        if (to  ) copy.to   = this.to  .copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.from  || this.from.isCached())
            && (!this.to    || this.to  .isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const input = await evalNumberOrListValue(this.input, parse);
        const from  = await evalListValue        (this.from,  parse);
        const to    = await evalListValue        (this.to,    parse);

        let nanList = false;


        if (   input 
            && input.isValid())
        {
            if (this.options.enabled)
            {
                if (   from && from.isValid() && from.items.length > 0
                    && to   && to  .isValid() && to  .items.length > 0)
                {
                    if (isListValueType(input.type))
                    {
                        this.value = new ListValue();
        
                        for (let i = 0; i < input.items.length; i++)
                        {
                            const item = input.items[i];
        
                            this.value.items.push(
                                item.type == NUMBER_VALUE
                                ? getNumberMapValue(item, from, to)
                                : NumberValue.NaN());   
                        }
                    }
                    else
                        this.value = getNumberMapValue(input, from, to);
                }
                else
                {
                    if (isListValueType(input.type))
                    {
                        this.value = new ListValue();
                        nanList = true;
                    }
                    else
                        this.value = NumberValue.NaN();
                }
            }
            else
                this.value = input;
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type', nanList ? new TextValue(NUMBER_LIST_VALUE) : this.outputType()],
            ['from', from                                           ],
            ['to',   to                                             ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.from && this.from.isValid()
            && this.to   && this.to  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from) this.from.pushValueUpdates(parse);
        if (this.to  ) this.to  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.from) this.from.invalidateInputs(parse, from, force);
        if (this.to  ) this.to  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from) this.from.iterateLoop(parse);
        if (this.to  ) this.to  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const map = new GNumberMap(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(map, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, map);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            map.input = genParse(parse);
    
        map.from = genParse(parse);
        map.to   = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, map);
        return map;
    }
}



function getNumberMapValue(input, from, to)
{
    consoleAssert(
        input.type == NUMBER_VALUE, 
       'input.type must be NUMBER_VALUE');


    const maxDec = Math.max(
        from.items.reduce((max, val) => Math.max(max, val.decimals), 0),
        to  .items.reduce((max, val) => Math.max(max, val.decimals), 0));


    if (from.items.length == 1)
        return input;


    // from

    const nFromSegments = Math.floor(from.items.length-1);
    let   fromIndex     = 0;

    while (fromIndex < nFromSegments-1)
    {
        if (   input.value >= from.items[fromIndex  ]
            && input.value <  from.items[fromIndex+1])
            break;

        fromIndex++;
    }
    
    
    const fromLocal = 
            (input.value - from.items[fromIndex].value) 
        / (from.items[fromIndex+1].value - from.items[fromIndex].value);

    const f = fromIndex/nFromSegments + fromLocal * ((fromIndex+1)/nFromSegments - fromIndex/nFromSegments);
    

    // to

    const nToSegments = Math.floor(to.items.length-1);
    const toIndex     = Math.min(Math.max(0, Math.floor((to.items.length-1) * f)), nToSegments-1);


    if (to.items.length == 1)
        return to.items[0];

    else if (to.items.length > 0
            && toIndex < to.items.length-1)
    {
        const toLocal = 
            nToSegments > 1
            ? (f - toIndex/nToSegments) * nToSegments
            : f;


        const val0 = to.items[toIndex  ];
        const val1 = to.items[toIndex+1];

        return new NumberValue(
            lerp(val0.value, val1.value, toLocal),
            maxDec);
    }
}