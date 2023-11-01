class GEllipse
extends GShape
{
    position = null;
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
        this.from     = null;
        this.to       = null;
        this.inner    = null;
    }



    copy()
    {
        const copy = new GEllipse(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.position) copy.position = this.position.copy();
        if (this.from    ) copy.from     = this.from    .copy();
        if (this.to      ) copy.to       = this.to      .copy();
        if (this.inner   ) copy.inner    = this.inner   .copy();
        
        return copy;
    }


    async eval(parse)
    {
        if (this.isCached())
            return this;


        const [x, y, width, height] = await this.evalBaseParams(parse);

        const pos   = this.position ? (await this.position.eval(parse)).toValue() : null;
        const from  = this.from     ? (await this.from    .eval(parse)).toValue() : null;
        const to    = this.to       ? (await this.to      .eval(parse)).toValue() : null;
        const inner = this.inner    ? (await this.inner   .eval(parse)).toValue() : null;


        let input = null;


        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();


            const  _pos   = pos    ?? input.position;
            const  _x     = x      ?? input.x;
            const  _y     = y      ?? input.y;
            const  _w     = width  ?? input.width;
            const  _h     = height ?? input.height;
            const  _from  = from   ?? input.from;
            const  _to    = to     ?? input.to;
            const  _inner = inner  ?? input.inner;

            const __x = _pos.value == 0 ? _x : new NumberValue(_x.value + _w.value/2, Math.max(_x.decimals, _w.decimals));
            const __y = _pos.value == 0 ? _y : new NumberValue(_y.value + _h.value/2, Math.max(_y.decimals, _h.decimals));
            const __w = _pos.value == 0 ? _w : new NumberValue(_w.value/2, Math.max(_x.decimals, _w.decimals));
            const __h = _pos.value == 0 ? _h : new NumberValue(_h.value/2, Math.max(_y.decimals, _h.decimals));            
            

            this.value = new EllipseValue(
                this.nodeId,
                _pos,
                _x, _y, _w, _h,
                _from,
                _to,
                _inner);

            this.setUpdateValues(parse, 
            [
                ['position', _pos      ],
                ['x',        __x       ],
                ['y',        __y       ],
                ['width',    __w       ],
                ['height',   __h       ],
                ['value',    this.value]
            ]);
        }
        else
        {
            const _x = x;
            const _y = y;
            const _w = width;
            const _h = height;

            const __x = pos.value == 0 ? _x : new NumberValue(_x.value - _w.value, Math.max(_x.decimals, _w.decimals));
            const __y = pos.value == 0 ? _y : new NumberValue(_y.value - _h.value, Math.max(_y.decimals, _h.decimals));
            const __w = pos.value == 0 ? _w : new NumberValue(_w.value*2, Math.max(_x.decimals, _w.decimals));
            const __h = pos.value == 0 ? _h : new NumberValue(_h.value*2, Math.max(_y.decimals, _h.decimals));            

            this.value = new EllipseValue(
                this.nodeId,
                pos,
                __x, __y, __w, __h,
                from,
                to,
                inner);


            this.setUpdateValues(parse, 
            [
                ['position', pos       ],
                ['x',        _x        ],
                ['y',        _y        ],
                ['width',    _w        ],
                ['height',   _h        ],
                ['value',    this.value]
            ]);
        }


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.position) this.position = this.value.position.copy();
        if (!this.x       ) this.x        = this.value.x       .copy();
        if (!this.y       ) this.y        = this.value.y       .copy();
        if (!this.width   ) this.width    = this.value.width   .copy();
        if (!this.height  ) this.height   = this.value.height  .copy();
        if (!this.from    ) this.from     = this.value.from    .copy();
        if (!this.to      ) this.to       = this.value.to      .copy();
        if (!this.inner   ) this.inner    = this.value.inner   .copy();


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
            let   x = this.value.x     .value;
            let   y = this.value.y     .value;
            let   w = this.value.width .value;
            let   h = this.value.height.value;
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
                    x, y, w, h, f, t, i);

                ellipse.createDefaultTransform(x, y);
                ellipse.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(ellipse);
            }
        }

       
        await super.evalObjects(parse);
    }
   
    
        
    toValue()
    {
        const ellipse = new EllipseValue(
            this.nodeId,
            this.position.toValue(),
            this.x       .toValue(),
            this.y       .toValue(),
            this.width   .toValue(),
            this.height  .toValue(),
            this.from    .toValue(),
            this.to      .toValue(),
            this.inner   .toValue());

        ellipse.props   = this.props.toValue();

        ellipse.objects = 
            this.value.objects
            ? this.value.objects.map(o => o.copy())
            : [];
        
        return ellipse;
    }
    

    
    isValid()
    {
        return super.isValid()
            && this.position && this.position.isValid()
            && this.from     && this.from    .isValid()
            && this.to       && this.to      .isValid()
            && this.inner    && this.inner   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);
 
        if (this.position) this.position.pushValueUpdates(parse);
        if (this.from    ) this.from    .pushValueUpdates(parse);
        if (this.to      ) this.to      .pushValueUpdates(parse);
        if (this.inner   ) this.inner   .pushValueUpdates(parse);
    }

   
        
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.position) this.position.invalidateInputs(parse, from, force);
        if (this.from    ) this.from    .invalidateInputs(parse, from, force);
        if (this.to      ) this.to      .invalidateInputs(parse, from, force);
        if (this.inner   ) this.inner   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);
 
        if (this.position) this.position.iterateLoop(parse);
        if (this.from    ) this.from    .iterateLoop(parse);
        if (this.to      ) this.to      .iterateLoop(parse);
        if (this.inner   ) this.inner   .iterateLoop(parse);
    }
}