class GScale
extends GOperator
{
    input   = null;

    x       = null;
    y       = null;
    centerX = null;
    centerY = null;



    constructor(nodeId, options)
    {
        super(SCALE, nodeId, options);
    }



    copy()
    {
        const copy = new GScale(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        //if (this.value) copy.value = this.value.copy();
        if (this.x      ) copy.x       = this.x      .copy();
        if (this.y      ) copy.y       = this.y      .copy();
        if (this.centerX) copy.centerX = this.centerX.copy();
        if (this.centerY) copy.centerY = this.centerY.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const x       = this.x       ? (await this.x      .eval(parse)).toValue() : null;
        const y       = this.y       ? (await this.y      .eval(parse)).toValue() : null;
        const centerX = this.centerX ? (await this.centerX.eval(parse)).toValue() : null;
        const centerY = this.centerY ? (await this.centerY.eval(parse)).toValue() : null;


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();
            this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue;
        }

       
        const _bounds = await this.evalObjects(parse, 
        {
            x:       x, 
            y:       y, 
            centerX: centerX, 
            centerY: centerY
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
            ['value',   this.value],
            ['x',       x         ],
            ['y',       y         ],
            ['centerX', centerX   ],
            ['centerY', centerY   ],
            ['bounds',  bounds    ]
        ];
        

        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;


        this.objects = 
            this.input 
            ? this.input.objects.map(o => o.copy())
            : [];


        const bounds = getObjBounds(this.objects);


        for (const obj of this.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = this.nodeId + '/' + obj.objectId;


            const bw = bounds.width  != 0 ? bounds.width  : 1;
            const bh = bounds.height != 0 ? bounds.height : 1;


            if (obj.type == VECTOR_PATH)
            {
                const x  = Math.max(0, options.x.toNumber()/100);
                const y  = Math.max(0, options.y.toNumber()/100);

                const dx = 0.5 + options.centerX.toNumber() / (bounds.width /2);
                const dy = 0.5 + options.centerY.toNumber() / (bounds.height/2);


                for (const p of obj.points)
                {
                    const d = distance_(
                        p.x.value, 
                        p.y.value, 
                        bounds.x + dx * bounds.width, 
                        bounds.y + dy * bounds.height);

                    const a = anglev_(
                        bounds.x + dx * bounds.width, 
                        bounds.y + dy * bounds.height, 
                        p.x.value, 
                        p.y.value);

                    const v = mulv(
                        vector(a, d),
                        point(x, y));

                    
                    p.x.value = 
                          bounds.x 
                        + bounds.width/2 
                        + v.x;

                    p.y.value = 
                          bounds.y
                        + bounds.height/2
                        + v.y;
                }


                FigmaVectorPath.prototype.updatePathData.call(obj);
            }
            else
            {
                const x  = Math.max(0, options.x.toNumber()/100);
                const y  = Math.max(0, options.y.toNumber()/100);
                

                const dx = 
                    bounds.width != 0
                    ? options.centerX.toNumber() / (bounds.width /2)
                    : options.centerX.toNumber();

                const dy = 
                    bounds.height != 0
                    ? options.centerY.toNumber() / (bounds.height/2)
                    : options.centerY.toNumber();


                obj.width  *= x;
                obj.height *= y;


                const angle = anglev_(
                    bounds.x + ((dx + 0.5) * bounds.width ), 
                    bounds.y + ((dy + 0.5) * bounds.height),
                    obj.x,
                    obj.y);

                const halfd = distance_(
                    bounds.x + ((dx + 0.5) * bounds.width ), 
                    bounds.y + ((dy + 0.5) * bounds.height),
                    obj.x,
                    obj.y);


                const a = 0;
                const v = vector(angle - a, halfd);

                v.x *= x;
                v.y *= y;

                obj.x = 
                      bounds.x 
                    + bounds.width /2 
                    + v.x 
                    - (dx - 0.5) * bw * Math.cos(-a) 
                    - (dy - 0.5) * bh * Math.sin( a);

                obj.y = 
                      bounds.y
                    + bounds.height/2
                    + v.y 
                    - (dx - 0.5) * bw * Math.sin(-a) 
                    - (dy - 0.5) * bh * Math.cos( a);
            }
        }

        
        await super.evalObjects(parse);


        return bounds;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input  ) this.input  .pushValueUpdates(parse);
        if (this.x      ) this.x      .pushValueUpdates(parse);
        if (this.y      ) this.y      .pushValueUpdates(parse);
        if (this.centerX) this.centerX.pushValueUpdates(parse);
        if (this.centerY) this.centerY.pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.x .isValid()
            && this.y .isValid()
            && this.centerX.isValid()
            && this.centerY.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        if (this.x    ) this.x    .invalidate();
        if (this.y    ) this.y    .invalidate();
        if (this.centerX   ) this.centerX   .invalidate();
        if (this.centerY   ) this.centerY   .invalidate();
    }



    toValue()
    {
        return this.value.copy();
    }
}