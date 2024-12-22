class GAnimate
extends GOperator
{
    static { GNode.types[NUMBER_ANIMATE] = this; }



    from   = null;
    to     = null;
    curve  = null;
    repeat = null;
    length = null;
    time   = null;
    
    
    
    constructor(nodeId, options)
    {
        super(NUMBER_ANIMATE, nodeId, options);
    }
    
    
    
    reset()
    {
        super.reset();
        
        this.from   = null;
        this.to     = null;
        this.curve  = null;
        this.repeat = null;
        this.length = null;
        this.time   = null;
    }



    copy()
    {
        const copy = new GAnimate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.from  ) copy.from   = this.from  .copy();
        if (this.to    ) copy.to     = this.to    .copy();
        if (this.curve ) copy.curve  = this.curve .copy();
        if (this.repeat) copy.repeat = this.repeat.copy();
        if (this.length) copy.length = this.length.copy();
        if (this.time  ) copy.time   = this.time  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const from   = await evalNumberValue(this.from,   parse);
        const to     = await evalNumberValue(this.to,     parse);
        const curve  = await evalNumberValue(this.curve,  parse);
        const repeat = await evalNumberValue(this.repeat, parse);
        const length = await evalNumberValue(this.length, parse);
        const time   = await evalNumberValue(this.time,   parse);
    

        const maxDec = Math.max(from.decimals, to.decimals);

        switch (curve.value)
        {
            case 0: 
            {
                this.value = new NumberValue(
                    time.value < length.value ? from.value : to.value, 
                    maxDec);
    
                break;
            }
            case 1: 
            {
                this.value = new NumberValue(
                    from.value + (to.value - from.value) * time.value / length.value,
                    maxDec);

                break;
            }
            case 2: 
            {
                let f = time.value / length.value;

                f = 1 - sqr(1 - f);

                this.value = new NumberValue(
                    from.value + (to.value - from.value) * f,
                    maxDec);
    
                break;
            }
            case 3: 
            {
                let f = time.value / length.value;

                f = sqr(f);

                this.value = new NumberValue(
                    from.value + (to.value - from.value) * f,
                    maxDec);
    
                break;
            }
            case 4: 
            {
                let f = time.value / length.value;

                f = 6*Math.pow(f, 5) - 15*Math.pow(f, 4) + 10*Math.pow(f, 3);

                this.value = new NumberValue(
                    from.value + (to.value - from.value) * f,
                    maxDec);
    
                break;
            }
        }
        

        this.setUpdateValues(parse,
        [
            ['from',   from  ],
            ['to',     to    ],
            ['curve',  curve ],
            ['repeat', repeat],
            ['length', length],
            ['time',   time  ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return this.from   && this.from  .isValid()
            && this.to     && this.to    .isValid()
            && this.curve  && this.curve .isValid()
            && this.repeat && this.repeat.isValid()
            && this.length && this.length.isValid()
            && this.time   && this.time  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from  ) this.from  .pushValueUpdates(parse);
        if (this.to    ) this.to    .pushValueUpdates(parse);
        if (this.curve ) this.curve .pushValueUpdates(parse);
        if (this.repeat) this.repeat.pushValueUpdates(parse);
        if (this.length) this.length.pushValueUpdates(parse);
        if (this.time  ) this.time  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.from  ) this.from  .invalidateInputs(parse, from, force);
        if (this.to    ) this.to    .invalidateInputs(parse, from, force);
        if (this.curve ) this.curve .invalidateInputs(parse, from, force);
        if (this.repeat) this.repeat.invalidateInputs(parse, from, force);
        if (this.length) this.length.invalidateInputs(parse, from, force);
        if (this.time  ) this.time  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from  ) this.from  .iterateLoop(parse);
        if (this.to    ) this.to    .iterateLoop(parse);
        if (this.curve ) this.curve .iterateLoop(parse);
        if (this.repeat) this.repeat.iterateLoop(parse);
        if (this.length) this.length.iterateLoop(parse);
        if (this.time  ) this.time  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const anim = new GAnimate(nodeId, options);
    
    
        if (parse.settings.logRequests) 
            logReq(anim, parse);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, anim);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        anim.from   = genParse(parse);
        anim.to     = genParse(parse);
        anim.curve  = genParse(parse);
        anim.repeat = genParse(parse);
        anim.length = genParse(parse);
        anim.time   = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, anim);
        return anim;
    }
}
