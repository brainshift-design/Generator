class GColorBlind
extends GOperator1
{
    static { GNode.types[COLORBLIND] = this; }



    l;
    m;
    s;


    constructor(nodeId, options)
    {
        super(COLORBLIND, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.l = null;
        this.m = null;
        this.s = null;
    }



    copy()
    {
        const copy = new GColorBlind(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.l) copy.l = this.l.copy();
        if (this.m) copy.m = this.m.copy();
        if (this.s) copy.s = this.s.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let   input = await evalColorValue (this.input, parse);
        const l     = await evalNumberValue(this.l,     parse); 
        const m     = await evalNumberValue(this.m,     parse);
        const s     = await evalNumberValue(this.s,     parse);


        if (input)
        {
                 if (input.type == FILL_VALUE      ) input = input.color;
            else if (input.type == COLOR_STOP_VALUE) input = input.fill.color;
            else if (input.type == GRADIENT_VALUE  ) input = ColorValue.fromRgb(input.toRgba());


            if (this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                        this.value.items.push(getColorBlindValue(input.items[i], l, m, s));
                }
                else
                    this.value = getColorBlindValue(input, l, m, s);
            }
            else
                this.value = input.copy();
        }
        else
            this.value = ColorValue.NaN();


        this.setUpdateValues(parse,
        [
            ['value',  this.value       ],
            ['type',   this.outputType()],
            ['l',      l                ],
            ['m',      m                ],
            ['s',      s                ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.l && this.l.isValid()
            && this.m && this.m.isValid()
            && this.s && this.s.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.l) this.l.pushValueUpdates(parse);
        if (this.m) this.m.pushValueUpdates(parse);
        if (this.s) this.s.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.l) this.l.invalidateInputs(parse, from, force);
        if (this.m) this.m.invalidateInputs(parse, from, force);
        if (this.s) this.s.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.l) this.l.iterateLoop(parse);
        if (this.m) this.m.iterateLoop(parse);
        if (this.s) this.s.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const cb = new GColorBlind(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(cb, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, cb);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            cb.input = genParse(parse);
    
        cb.l = genParse(parse);
        cb.m = genParse(parse);
        cb.s = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, cb);
        return cb;
    }
}



function getColorBlindValue(input, l, m, s)
{
    const rgb   = input.toRgb();

    const rgbCb = rgb2colorblind(
        rgb,
        l.value,
        m.value,
        s.value);

    if (   !rgbIsNaN(rgb  )
        && !rgbIsNaN(rgbCb))
    {
        const validRgbCb = rgbCb;
    
        const validCol = convertDataColorToSpace(
            rgb2dataColor(validRgbCb), 
            colorSpace(input.space.value));

        return ColorValue.fromDataColor(validCol);
    }
    else
        return ColorValue.NaN();
}