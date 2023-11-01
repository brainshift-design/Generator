class GPolygon
extends GShape
{
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



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const [x, y, width, height] = await this.evalBaseParams(parse);

        const pos     = this.position ? (await this.position.eval(parse)).toValue() : null;
        const round   = this.round    ? (await this.round   .eval(parse)).toValue() : null;
        const corners = this.corners  ? (await this.corners .eval(parse)).toValue() : null;


        let input = null;
             
        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            const  _pos     = pos     ?? input.position;
            const  _x       = x       ?? input.x;
            const  _y       = y       ?? input.y;
            const  _w       = width   ?? input.width;
            const  _h       = height  ?? input.height;
            const  _round   = round   ?? input.round;
            const  _corners = corners ?? input.corners;

            const __x = _pos.value == 0 ? _x : new NumberValue(_x.value + _w.value/2, Math.max(_x.decimals, _w.decimals));
            const __y = _pos.value == 0 ? _y : new NumberValue(_y.value + _h.value/2, Math.max(_y.decimals, _h.decimals));
            const __w = _pos.value == 0 ? _w : new NumberValue(_w.value/2, Math.max(_x.decimals, _w.decimals));
            const __h = _pos.value == 0 ? _h : new NumberValue(_h.value/2, Math.max(_y.decimals, _h.decimals));            
            
            this.value = new PolygonValue(
                this.nodeId,
                _pos,
                _x, _y, _w, _h,
                _round,
                _corners);

            this.value.copyCustomParams(input);

                
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

            this.value = new PolygonValue(
                this.nodeId,
                pos,
                __x, __y, __w, __h,
                round,
                corners);


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
            let   x = this.value.x      .value;
            let   y = this.value.y      .value;
            let   w = this.value.width  .value;
            let   h = this.value.height .value;
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



    toValue()
    {
        const poly = new PolygonValue(
            this.nodeId,
            this.position.toValue(),
            this.x       .toValue(),
            this.y       .toValue(),
            this.width   .toValue(),
            this.height  .toValue(),
            this.round   .toValue(),
            this.corners .toValue());

        poly.copyCustomParams(this.value);

        poly.props   = this.props.toValue();
        poly.objects = this.value.objects.map(o => o.copy());

        return poly;
    }



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
}