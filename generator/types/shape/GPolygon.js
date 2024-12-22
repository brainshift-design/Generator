class GPolygon
extends GShape
{
    static { GNode.types[POLYGON] = this; }



    position = null;
    round    = null;
    corners  = null;



    constructor(nodeId, options)
    {
        super(POLYGON, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.position = null;
        this.round    = null;
        this.corners  = null;
    }



    copy()
    {
        const copy = new GPolygon(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.position) copy.position = this.position.copy();
        if (this.round   ) copy.round    = this.round   .copy();
        if (this.corners ) copy.corners  = this.corners .copy();

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
            case 'corners':  return this.input ? this.value.corners  : this.corners;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        let [x, y, width, height] = await this.evalBaseParams(parse);

        let input   = await evalPolygonValue(this.input,    parse);
        let pos     = await evalNumberValue (this.position, parse);
        let round   = await evalNumberValue (this.round,    parse);
        let corners = await evalNumberValue (this.corners,  parse);


        if (input)
        {
            this.value        = input.toNewValue();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            if (pos    )  this.value.position = pos;      else  pos     = this.value.position;
            if (x      )  this.value.x        = x;        else  x       = this.value.x;      
            if (y      )  this.value.y        = y;        else  y       = this.value.y;      
            if (width  )  this.value.width    = width;    else  width   = this.value.width;  
            if (height )  this.value.height   = height;   else  height  = this.value.height; 
            if (round  )  this.value.round    = round;    else  round   = this.value.round;  
            if (corners)  this.value.corners  = corners;  else  corners = this.value.corners;  
        }
        else
        {
            this.value = new PolygonValue(
                this.nodeId,
                pos,
                x, 
                y, 
                width, 
                height,
                round,
                corners);
        }


        this.setUpdateValues(parse, 
        [
            ['position', pos    ],
            ['x',        x      ],
            ['y',        y      ],
            ['width',    width  ],
            ['height',   height ],
            ['round',    round  ],
            ['corners',  corners]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.position) this.position = this.value.position.copy();
        if (!this.x       ) this.x        = this.value.x       .copy();
        if (!this.y       ) this.y        = this.value.y       .copy();
        if (!this.width   ) this.width    = this.value.width   .copy();
        if (!this.height  ) this.height   = this.value.height  .copy();
        if (!this.round   ) this.round    = this.value.round   .copy();
        if (!this.corners ) this.corners  = this.value.corners .copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        this.value.objects = [];


        if (   super.baseIsValid()   
            && this.value.x      .isValid()
            && this.value.y      .isValid()
            && this.value.width  .isValid()
            && this.value.height .isValid()
            && this.value.round  .isValid()
            && this.value.corners.isValid())
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

            let   x = _x.value;
            let   y = _y.value;
            let   w = _w.value;
            let   h = _h.value;
            const r = Math.max(0, this.value.round.value);
            const c = Math.max(3, Math.floor(this.value.corners.value));


            [x, y, w, h, , ] = validateObjectRect(x, y, w, h);


            if (   w != 0 
                && h != 0)
            {
                const poly = new FigmaPolygon(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, r, c);

                poly.createDefaultTransform(x, y);
                poly.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(poly);
            }
        }

        
        await super.evalObjects(parse);
    }



    // toNewValue()
    // {
    //     const poly = new PolygonValue(
    //         this.nodeId,
    //         this.position.toNewValue(),
    //         this.x       .toNewValue(),
    //         this.y       .toNewValue(),
    //         this.width   .toNewValue(),
    //         this.height  .toNewValue(),
    //         this.round   .toNewValue(),
    //         this.corners .toNewValue());

    //     poly.copyCustomParams(this.value);

    //     poly.props   = this.props.toNewValue();
    //     poly.objects = this.value.objects.map(o => o.copy());

    //     return poly;
    // }



    isValid()
    {
        return super.isValid()
            && this.position && this.position.isValid()
            && this.round    && this.round   .isValid()
            && this.corners  && this.corners .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.position) this.position.pushValueUpdates(parse);
        if (this.round   ) this.round   .pushValueUpdates(parse);
        if (this.corners ) this.corners .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.position) this.position.invalidateInputs(parse, from, force);
        if (this.round   ) this.round   .invalidateInputs(parse, from, force);
        if (this.corners ) this.corners .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.position) this.position.iterateLoop(parse);
        if (this.round   ) this.round   .iterateLoop(parse);
        if (this.corners ) this.corners .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const poly = new GPolygon(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(poly, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, poly);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            poly.input = genParse(parse);
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {
            case 'position': poly.position = genParse(parse); break;
            case 'x':        poly.x        = genParse(parse); break;
            case 'y':        poly.y        = genParse(parse); break;
            case 'width':    poly.width    = genParse(parse); break;
            case 'height':   poly.height   = genParse(parse); break;
            case 'round':    poly.round    = genParse(parse); break;
            case 'corners':  poly.corners  = genParse(parse); break;
            case 'props':    poly.props    = genParse(parse); break;
            }
        }
        
        
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, poly);
        return poly;
    }
}