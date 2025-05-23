class GEllipse
extends GShape
{
    static { GNode.types[ELLIPSE] = this; }



    position = null;
    round    = null;
    start    = null;
    sweep    = null;
    inner    = null;

    innerAbsolute;
    startInDegrees;
    sweepInDegrees;



    constructor(nodeId, options)
    {
        super(ELLIPSE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.position = null;
        this.round    = null;
        this.start    = null;
        this.sweep    = null;
        this.inner    = null;
    }



    copy()
    {
        const copy = new GEllipse(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.position) copy.position = this.position.copy();
        if (this.round   ) copy.round    = this.round   .copy();
        if (this.start   ) copy.start    = this.start   .copy();
        if (this.sweep   ) copy.sweep    = this.sweep   .copy();
        if (this.inner   ) copy.inner    = this.inner   .copy();
        
        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'position': return this.input ? this.value.position : this.position;
            case 'x':        return this.input ? this.value.x        : this.x;
            case 'y':        return this.input ? this.value.y        : this.y;
            case 'width':    return this.input ? this.value.width    : this.width;
            case 'height':   return this.input ? this.value.height   : this.height;
            case 'round':    return this.input ? this.value.round    : this.round;
            case 'start':    return this.input ? this.value.start    : this.start;
            case 'sweep':    return this.input ? this.value.sweep    : this.sweep;
            case 'inner':    return this.input ? this.value.inner    : this.inner
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let input = await evalValue      (this.input,    parse);

        let [x, y, width, height] = await this.evalBaseParams(parse);

        let pos   = await evalNumberValue(this.position, parse);
        let round = await evalNumberValue(this.round,    parse);
        let start = await evalNumberValue(this.start,    parse);
        let sweep = await evalNumberValue(this.sweep,    parse);
        let inner = await evalNumberValue(this.inner,    parse);

        // if (pos   && !pos  .isValid()) pos   = NumberValue.NaN();
        // if (round && !round.isValid()) round = NumberValue.NaN();
        // if (start && !start.isValid()) start = NumberValue.NaN();
        // if (sweep && !sweep.isValid()) sweep = NumberValue.NaN();
        // if (inner && !inner.isValid()) inner = NumberValue.NaN();


        if (input)
        {
            this.value        = input.copy();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            if (pos   )  this.value.position = pos;     else  pos    = this.value.position;
            if (x     )  this.value.x        = x;       else  x      = this.value.x;      
            if (y     )  this.value.y        = y;       else  y      = this.value.y;      
            if (width )  this.value.width    = width;   else  width  = this.value.width;  
            if (height)  this.value.height   = height;  else  height = this.value.height; 
            if (round )  this.value.round    = round;   else  round  = this.value.round;  
            if (start )  this.value.start    = start;   else  start  = this.value.start;
            if (sweep )  this.value.sweep    = sweep;   else  sweep  = this.value.sweep;
            if (inner )  this.value.inner    = inner;   else  inner  = this.value.inner;  
        }
        else
        {
            this.value = new EllipseValue(
                this.nodeId,
                pos,
                x, 
                y, 
                width, 
                height,
                round,
                start,
                sweep,
                inner);
        }


        this.setUpdateValues(parse, 
        [
            ['position', pos   ],
            ['x',        x     ],
            ['y',        y     ],
            ['width',    width ],
            ['height',   height],
            ['round',    round ],
            ['start',    start ],
            ['sweep',    sweep ],
            ['inner',    inner ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
       if (!this.options.enabled)
           return;
           
           
        this.value.objects = [];


        if (   super.baseIsValid()
            && this.value.x     .isValid()
            && this.value.y     .isValid()
            && this.value.width .isValid()
            && this.value.height.isValid()) 
        {
            const vpos = this.value.position;
            const vx   = this.value.x;
            const vy   = this.value.y;
            const vw   = this.value.width;
            const vh   = this.value.height;

            const _x = vpos.value <= 0 ? vx : new NumberValue(vx.value - vw.value, Math.max(vx.decimals, vw.decimals));
            const _y = vpos.value <= 0 ? vy : new NumberValue(vy.value - vh.value, Math.max(vy.decimals, vh.decimals));
            const _w = vpos.value <= 0 ? vw : new NumberValue(vw.value*2, Math.max(vx.decimals, vw.decimals));
            const _h = vpos.value <= 0 ? vh : new NumberValue(vh.value*2, Math.max(vy.decimals, vh.decimals));            

            let   x  = _x.value;
            let   y  = _y.value;
            let   w  = _w.value;
            let   h  = _h.value;
            let   r  = this.value.round.value;
            let   st = this.value.start.value;
            let   sw = this.value.sweep.value;
            let   i  = this.value.inner.value;


            [x, y, w, h, , ] = validateObjectRect(x, y, w, h);


            if (   w != 0 
                && h != 0)
            {
                if ( this.innerAbsolute ) i  /= Math.max(w, h) / 200;
                if (!this.startInDegrees) st *= 3.6;
                if ( this.sweepInDegrees) sw /= 3.6;

                const ellipse = new FigmaEllipse(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, r, st, sw, i);

                ellipse.createDefaultTransform(x, y);
                ellipse.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(ellipse);
            }
        }


        await super.evalObjects(parse);
    }
   
    
        
    isValid()
    {
        return super.isValid()
            && this.position && this.position.isValid()
            && this.round    && this.round   .isValid()
            && this.start    && this.start   .isValid()
            && this.sweep    && this.sweep   .isValid()
            && this.inner    && this.inner   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);
 
        if (this.position) this.position.pushValueUpdates(parse);
        if (this.round   ) this.round   .pushValueUpdates(parse);
        if (this.start   ) this.start   .pushValueUpdates(parse);
        if (this.sweep   ) this.sweep   .pushValueUpdates(parse);
        if (this.inner   ) this.inner   .pushValueUpdates(parse);
    }

   
        
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.position) this.position.invalidateInputs(parse, from, force);
        if (this.round   ) this.round   .invalidateInputs(parse, from, force);
        if (this.start   ) this.start   .invalidateInputs(parse, from, force);
        if (this.sweep   ) this.sweep   .invalidateInputs(parse, from, force);
        if (this.inner   ) this.inner   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);
 
        if (this.position) this.position.iterateLoop(parse);
        if (this.round   ) this.round   .iterateLoop(parse);
        if (this.start   ) this.start   .iterateLoop(parse);
        if (this.sweep   ) this.sweep   .iterateLoop(parse);
        if (this.inner   ) this.inner   .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const ellipse = new GEllipse(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(ellipse, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, ellipse);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            ellipse.input = genParse(parse);
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {
            case 'position': ellipse.position = genParse(parse); break;
            case 'x':        ellipse.x        = genParse(parse); break;
            case 'y':        ellipse.y        = genParse(parse); break;
            case 'width':    ellipse.width    = genParse(parse); break;
            case 'height':   ellipse.height   = genParse(parse); break;
            case 'round':    ellipse.round    = genParse(parse); break;
            case 'start':    ellipse.start    = genParse(parse); break;
            case 'sweep':    ellipse.sweep    = genParse(parse); break;
            case 'inner':    ellipse.inner    = genParse(parse); break;
            case 'props':    ellipse.props    = genParse(parse); break;
            }
        }
        
        
        ellipse.innerAbsolute  = parseInt(parse.move()) > 0;
        ellipse.startInDegrees = parseInt(parse.move()) > 0;
        ellipse.sweepInDegrees = parseInt(parse.move()) > 0;
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, ellipse);
        return ellipse;
    }
}