class GEllipse
extends GShape
{
    position = null;
    round    = null;
    from     = null;
    to       = null;
    inner    = null;



    constructor(nodeId, options)
    {
        super(ELLIPSE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.position = null;
        this.round    = null;
        this.from     = null;
        this.to       = null;
        this.inner    = null;
    }



    copy()
    {
        const copy = new GEllipse(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.position) copy.position = this.position.copy();
        if (this.round   ) copy.round    = this.round   .copy();
        if (this.from    ) copy.from     = this.from    .copy();
        if (this.to      ) copy.to       = this.to      .copy();
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
            case 'from':     return this.input ? this.value.from     : this.from;
            case 'to':       return this.input ? this.value.to       : this.to;
            case 'inner':    return this.input ? this.value.inner    : this.inner
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let [x, y, width, height] = await this.evalBaseParams(parse);

        let input = this.input    ? (await this.input   .eval(parse)).toValue() : null;
        let pos   = this.position ? (await this.position.eval(parse)).toValue() : null;
        let round = this.round    ? (await this.round   .eval(parse)).toValue() : null;
        let from  = this.from     ? (await this.from    .eval(parse)).toValue() : null;
        let to    = this.to       ? (await this.to      .eval(parse)).toValue() : null;
        let inner = this.inner    ? (await this.inner   .eval(parse)).toValue() : null;


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
            if (from  )  this.value.from     = from ;   else  from   = this.value.from;  
            if (to    )  this.value.to       = to   ;   else  to     = this.value.to;  
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
                from,
                to,
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
            ['from',     from  ],
            ['to',       to    ],
            ['inner',    inner ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        // if (!this.position) this.position = this.value.position.copy();
        // if (!this.x       ) this.x        = this.value.x       .copy();
        // if (!this.y       ) this.y        = this.value.y       .copy();
        // if (!this.width   ) this.width    = this.value.width   .copy();
        // if (!this.height  ) this.height   = this.value.height  .copy();
        // if (!this.round   ) this.round    = this.value.round   .copy();
        // if (!this.from    ) this.from     = this.value.from    .copy();
        // if (!this.to      ) this.to       = this.value.to      .copy();
        // if (!this.inner   ) this.inner    = this.value.inner   .copy();


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

            let   x = _x.value;
            let   y = _y.value;
            let   w = _w.value;
            let   h = _h.value;
            let   r = this.value.round .value;
            const f = this.value.from  .value;
            const t = this.value.to    .value;
            const i = this.value.inner .value;


            [x, y, w, h, , ] = validateObjectRect(x, y, w, h);


            if (   w != 0 
                && h != 0)
            {
                const ellipse = new FigmaEllipse(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, r, f, t, i);

                ellipse.createDefaultTransform(x, y);
                ellipse.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(ellipse);
            }
        }


        await super.evalObjects(parse);
    }
   
    
        
    // toValue()
    // {
    //     return this.value;

    //     // const ellipse = new EllipseValue(
    //     //     this.nodeId,
    //     //     this.position.toValue(),
    //     //     this.x       .toValue(),
    //     //     this.y       .toValue(),
    //     //     this.width   .toValue(),
    //     //     this.height  .toValue(),
    //     //     this.round   .toValue(),
    //     //     this.from    .toValue(),
    //     //     this.to      .toValue(),
    //     //     this.inner   .toValue());

    //     // ellipse.copyCustomParams(this.value);

    //     // ellipse.props = this.props.toValue();

    //     // ellipse.objects = 
    //     //     this.value.objects
    //     //     ? this.value.objects.map(o => o.copy())
    //     //     : [];
        
    //     // return ellipse;
    // }
    

    
    isValid()
    {
        return super.isValid()
            && this.position && this.position.isValid()
            && this.round    && this.round   .isValid()
            && this.from     && this.from    .isValid()
            && this.to       && this.to      .isValid()
            && this.inner    && this.inner   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);
 
        if (this.position) this.position.pushValueUpdates(parse);
        if (this.round   ) this.round   .pushValueUpdates(parse);
        if (this.from    ) this.from    .pushValueUpdates(parse);
        if (this.to      ) this.to      .pushValueUpdates(parse);
        if (this.inner   ) this.inner   .pushValueUpdates(parse);
    }

   
        
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.position) this.position.invalidateInputs(parse, from, force);
        if (this.round   ) this.round   .invalidateInputs(parse, from, force);
        if (this.from    ) this.from    .invalidateInputs(parse, from, force);
        if (this.to      ) this.to      .invalidateInputs(parse, from, force);
        if (this.inner   ) this.inner   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);
 
        if (this.position) this.position.iterateLoop(parse);
        if (this.round   ) this.round   .iterateLoop(parse);
        if (this.from    ) this.from    .iterateLoop(parse);
        if (this.to      ) this.to      .iterateLoop(parse);
        if (this.inner   ) this.inner   .iterateLoop(parse);
    }
}