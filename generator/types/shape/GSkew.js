class GSkew
extends GOperator
{
    input      = null;

    skewX      = null;
    skewY      = null;
    centerX    = null;
    centerY    = null;
    showCenter = null;



    constructor(nodeId, options)
    {
        super(SKEW, nodeId, options);
    }



    copy()
    {
        const copy = new GSkew(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.skewX     ) copy.skewX      = this.skewX     .copy();
        if (this.skewY     ) copy.skewY      = this.skewY     .copy();
        if (this.centerX   ) copy.centerX    = this.centerX   .copy();
        if (this.centerY   ) copy.centerY    = this.centerY   .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const skewX      = this.skewX      ? (await this.skewX     .eval(parse)).toValue() : null;
        const skewY      = this.skewY      ? (await this.skewY     .eval(parse)).toValue() : null;
        const centerX    = this.centerX    ? (await this.centerX   .eval(parse)).toValue() : null;
        const centerY    = this.centerY    ? (await this.centerY   .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();
            this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue;
        }

        
        const _bounds = this.evalObjects(
            parse, 
            {
                skewX:      skewX, 
                skewY:      skewY, 
                centerX:    centerX, 
                centerY:    centerY,
                showCenter: showCenter
            });


        const bounds = new RectangleValue(
            this.nodeId,
            new NumberValue(_bounds.x     ), 
            new NumberValue(_bounds.y     ), 
            new NumberValue(_bounds.width ),
            new NumberValue(_bounds.height),
            new NumberValue(0),
            new NumberValue(0));


        this.updateValues =
        [
            ['value',      this.value],
            ['skewX',      skewX     ],
            ['skewY',      skewY     ],
            ['centerX',    centerX   ],
            ['centerY',    centerY   ],
            ['showCenter', showCenter],
            ['bounds',     bounds    ]
        ];


        this.validate();

        return this;
    }



    evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        this.objects = 
            this.input 
            ? this.input.objects.map(o => o.copy())
            : [];

            
        const bounds = getObjBounds(this.objects);


        const sx = options.skewX.toNumber() / 100;
        const sy = options.skewY.toNumber() / 100;

        const xform =
            [[1,  sx, 0],
             [sy, 1,  0],
             [0,  0,  1]];


        const cx = bounds.x + bounds.width  * options.centerX.toNumber()/100;
        const cy = bounds.y + bounds.height * options.centerY.toNumber()/100;

        for (const obj of this.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

            if (   bounds.width  > 0
                && bounds.height > 0)
                obj.applyTransform(cx, cy, xform);
        }

        
        if (this.showCenter.toValue().value > 0)
        {
            const center = new FigmaPoint(
                this.nodeId,
                this.nodeId,
                this.nodeName + ' center',
                cx,
                cy,
                true)

            center.createDefaultTransform(cx, cy, 0);

            this.objects      .push(center);
            this.value.objects.push(center);
        };


        super.evalObjects(parse);


        return bounds;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input     ) this.input     .pushValueUpdates(parse);
        if (this.skewX     ) this.skewX     .pushValueUpdates(parse);
        if (this.skewY     ) this.skewY     .pushValueUpdates(parse);
        if (this.centerX   ) this.centerX   .pushValueUpdates(parse);
        if (this.centerY   ) this.centerY   .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.skewX     .isValid()
            && this.skewY     .isValid()
            && this.centerX   .isValid()
            && this.centerY   .isValid()
            && this.showCenter.isValid();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input     ) this.input     .invalidateInputs();
        if (this.skewX     ) this.skewX     .invalidateInputs();
        if (this.skewY     ) this.skewY     .invalidateInputs();
        if (this.centerX   ) this.centerX   .invalidateInputs();
        if (this.centerY   ) this.centerY   .invalidateInputs();
        if (this.showCenter) this.showCenter.invalidateInputs();
    }



    toValue()
    {
        return this.value.copy();
    }
}