class GScale
extends GAffine
{
    static { GNode.types[SCALE] = this; }



    scaleX        = null;
    scaleY        = null;
    affectCorners = null;
    affectStyle   = null;

    

    constructor(nodeId, options)
    {
        super(SCALE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.scaleX        = null;
        this.scaleY        = null;
        this.affectCorners = null;
        this.affectStyle   = null;
    }



    copy()
    {
        const copy = new GScale(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.scaleX       ) copy.scaleX        = this.scaleX       .copy();
        if (this.scaleY       ) copy.scaleY        = this.scaleY       .copy();
        if (this.affectCorners) copy.affectCorners = this.affectCorners.copy();
        if (this.affectStyle  ) copy.affectStyle   = this.affectStyle  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input         = await evalValue      (this.input,         parse);
        let   scaleX        = await evalNumberValue(this.scaleX,        parse);
        let   scaleY        = await evalNumberValue(this.scaleY,        parse);
        let   affectCorners = await evalNumberValue(this.affectCorners, parse);
        let   affectStyle   = await evalNumberValue(this.affectStyle,   parse);


        const [affectSpace] = await this.evalBaseParams(parse);


        if (input)
        {
            this.value = input.copy();
            
            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = new NullValue();
        }

       
        const _bounds = await this.evalObjects(
            parse, 
            {
                scaleX:        scaleX, 
                scaleY:        scaleY, 
                affectSpace:   affectSpace,
                affectCorners: affectCorners,
                affectStyle:   affectStyle
            });


        const bounds = new RectangleValue(
            this.nodeId,
            new NumberValue(_bounds.x     ), 
            new NumberValue(_bounds.y     ), 
            new NumberValue(_bounds.width ),
            new NumberValue(_bounds.height),
            new NumberValue(0));


        this.setUpdateValues(parse,
        [
            ['type',          this.outputType()],
            ['scaleX',        scaleX           ],
            ['scaleY',        scaleY           ],
            ['affectSpace',   affectSpace      ],
            ['affectCorners', affectCorners    ],
            ['affectStyle',   affectStyle      ],
            ['bounds',        bounds           ]
        ]);
        

        this.validate();

        return this;
    }



    async evalObjects(parse, options)
    {
        let sx = hardZero(options.scaleX.value / 100);
        let sy = hardZero(options.scaleY.value / 100);

        options.flipX = sx < 0;
        options.flipY = sy < 0;
        
        const scale = Math.min(sx, sy);

        return await this.evalAffineObjects(
            parse,
            options, 
            this.affectCorners.value > 0 ? scale : 1,
            this.affectStyle  .value > 0 ? scale : 1,
            () => [[sx, 0,  0],
                   [0,  sy, 0],
                   [0,  0,  1]]);
    }



    isValid()
    {
        return super.isValid()
            && this.scaleX        && this.scaleX       .isValid()
            && this.scaleY        && this.scaleY       .isValid()
            && this.affectCorners && this.affectCorners.isValid()
            && this.affectStyle   && this.affectStyle  .isValid();
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.scaleX       ) this.scaleX       .pushValueUpdates(parse);
        if (this.scaleY       ) this.scaleY       .pushValueUpdates(parse);
        if (this.affectCorners) this.affectCorners.pushValueUpdates(parse);
        if (this.affectStyle  ) this.affectStyle  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.scaleX       ) this.scaleX       .invalidateInputs(parse, from, force);
        if (this.scaleY       ) this.scaleY       .invalidateInputs(parse, from, force);
        if (this.affectCorners) this.affectCorners.invalidateInputs(parse, from, force);
        if (this.affectStyle  ) this.affectStyle  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.scaleX       ) this.scaleX       .iterateLoop(parse);
        if (this.scaleY       ) this.scaleY       .iterateLoop(parse);
        if (this.affectCorners) this.affectCorners.iterateLoop(parse);
        if (this.affectStyle  ) this.affectStyle  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const scale = new GScale(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(scale, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, scale);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            scale.input = genParse(parse);
    
        scale.scaleX        = genParse(parse);
        scale.scaleY        = genParse(parse);
        scale.affectCorners = genParse(parse);
        scale.affectStyle   = genParse(parse);
        scale.affectSpace   = genParse(parse);
    
        
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, scale);
        return scale;
    }
}