class GBackBlurProgressive
extends GOperator1
{
    static { GNode.types[BACK_PRBLUR] = this; }



    startX      = null;
    startY      = null;
    startRadius = null;
    endX        = null;
    endY        = null;
    endRadius   = null;



    constructor(nodeId, options)
    {
        super(BACK_PRBLUR, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.startX      = null;
        this.startY      = null;
        this.startRadius = null;
        this.endX        = null;
        this.endY        = null;
        this.endRadius   = null;
    }



    copy()
    {
        const copy = new GBackBlurProgressive(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.startX     ) copy.startX      = this.startX     .copy();
        if (this.startY     ) copy.startY      = this.startY     .copy();
        if (this.startRadius) copy.startRadius = this.startRadius.copy();
        if (this.endX       ) copy.endX        = this.endX       .copy();
        if (this.endY       ) copy.endY        = this.endY       .copy();
        if (this.endRadius  ) copy.endRadius   = this.endRadius  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input       = await evalBackBlurProgressiveValue(this.input,       parse);

        const startX      = await evalNumberValue             (this.startX,      parse);
        const startY      = await evalNumberValue             (this.startY,      parse);
        const startRadius = await evalNumberValue             (this.startRadius, parse);
        const endX        = await evalNumberValue             (this.endX,        parse);
        const endY        = await evalNumberValue             (this.endY,        parse);
        const endRadius   = await evalNumberValue             (this.endRadius,   parse);

        
        if (input)
        {
            this.value = new BackBlurProgressiveValue(
                startX      ?? input.startX,
                startY      ?? input.startY,
                startRadius ?? input.startRadius,
                endX        ?? input.endX,
                endY        ?? input.endY,
                endRadius   ?? input.endRadius,
                this.options.enabled);
        }
        else
        {
            this.value = new BackBlurProgressiveValue(
                startX,
                startY,
                startRadius,
                endX,
                endY,
                endRadius,
                this.options.enabled);
        }


        this.setUpdateValues(parse,
        [
            ['startX',      this.value.startX     ],
            ['startY',      this.value.startY     ],
            ['startRadius', this.value.startRadius],
            ['endX',        this.value.endX       ],
            ['endY',        this.value.endY       ],
            ['endRadius',   this.value.endRadius  ]
        ]);
        

        if (!this.startX     ) this.startX      = this.value.startX     .copy();
        if (!this.startY     ) this.startY      = this.value.startY     .copy();
        if (!this.startRadius) this.startRadius = this.value.startRadius.copy();
        if (!this.endX       ) this.endX        = this.value.endX       .copy();
        if (!this.endY       ) this.endY        = this.value.endY       .copy();
        if (!this.endRadius  ) this.endRadius   = this.value.endRadius  .copy();


        this.validate();

        return this;
    }



    toNewValue()
    {
        return new BackBlurProgressiveValue(
            this.startX      ? this.startX     .toNewValue() : this.input.startX     .toNewValue(),
            this.startY      ? this.startY     .toNewValue() : this.input.startY     .toNewValue(),
            this.startRadius ? this.startRadius.toNewValue() : this.input.startRadius.toNewValue(),
            this.endX        ? this.endX       .toNewValue() : this.input.endX       .toNewValue(),
            this.endY        ? this.endY       .toNewValue() : this.input.endY       .toNewValue(),
            this.endRadius   ? this.endRadius  .toNewValue() : this.input.endRadius  .toNewValue(),
            this.options.enabled);
    }



    isValid()
    {
        return super.isValid()
            && this.startX      && this.startX     .isValid()
            && this.startY      && this.startY     .isValid()
            && this.startRadius && this.startRadius.isValid()
            && this.endX        && this.endX       .isValid()
            && this.endY        && this.endY       .isValid()
            && this.endRadius   && this.endRadius  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.startX     ) this.startX     .pushValueUpdates(parse);
        if (this.startY     ) this.startY     .pushValueUpdates(parse);
        if (this.startRadius) this.startRadius.pushValueUpdates(parse);
        if (this.endX       ) this.endX       .pushValueUpdates(parse);
        if (this.endY       ) this.endY       .pushValueUpdates(parse);
        if (this.endRadius  ) this.endRadius  .pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.startX     ) this.startX     .invalidateInputs(parse, from, force);
        if (this.startY     ) this.startY     .invalidateInputs(parse, from, force);
        if (this.startRadius) this.startRadius.invalidateInputs(parse, from, force);
        if (this.endX       ) this.endX       .invalidateInputs(parse, from, force);
        if (this.endY       ) this.endY       .invalidateInputs(parse, from, force);
        if (this.endRadius  ) this.endRadius  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.startX     ) this.startX     .iterateLoop(parse);
        if (this.startY     ) this.startY     .iterateLoop(parse);
        if (this.startRadius) this.startRadius.iterateLoop(parse);
        if (this.endX       ) this.endX       .iterateLoop(parse);
        if (this.endY       ) this.endY       .iterateLoop(parse);
        if (this.endRadius  ) this.endRadius  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const blur = new GBackBlurProgressive(nodeId, options);
    
        blur.hasInputs = options.hasInputs;
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(blur, parse, ignore, nInputs);
    
    
        if (ignore)
        {
            genParseNodeEnd(parse, blur);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        let paramIds;
    
        if (nInputs == 1)
        {
            blur.input = genParse(parse);
            paramIds = parse.move().split(',');
        }
        else
        {
            paramIds = 
            [
                'startX', 
                'startY', 
                'startRadius', 
                'endX', 
                'endY', 
                'endRadius'
            ];
        }
    
    
        parse.inParam = false;
    
        for (const id of paramIds)
        {
            switch (id)
            {
            case 'startX':      blur.startX      = genParse(parse); break;
            case 'startY':      blur.startY      = genParse(parse); break;
            case 'startRadius': blur.startRadius = genParse(parse); break;
            case 'endX':        blur.endX        = genParse(parse); break;
            case 'endY':        blur.endY        = genParse(parse); break;
            case 'endRadius':   blur.endRadius   = genParse(parse); break;
            }
        }
        
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, blur);
        return blur;
    }
}