class GScale
extends GOperator
{
    input      = null;
   
    scaleX     = null;
    scaleY     = null;
    centerX    = null;
    centerY    = null;
    showCenter = null;



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

        if (this.scaleX    ) copy.scaleX     = this.scaleX    .copy();
        if (this.scaleY    ) copy.scaleY     = this.scaleY    .copy();
        if (this.centerX   ) copy.centerX    = this.centerX   .copy();
        if (this.centerY   ) copy.centerY    = this.centerY   .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const scaleX     = this.scaleX     ? (await this.scaleX    .eval(parse)).toValue() : null;
        const scaleY     = this.scaleY     ? (await this.scaleY    .eval(parse)).toValue() : null;
        const centerX    = this.centerX    ? (await this.centerX   .eval(parse)).toValue() : null;
        const centerY    = this.centerY    ? (await this.centerY   .eval(parse)).toValue() : null;
        const showCenter = this.showCenter ? (await this.showCenter.eval(parse)).toValue() : null;


        if (this.input)
        {
            this.value        = (await this.input.eval(parse)).toValue();
            this.value.nodeId = this.nodeId;
        }
        else
        {
            this.value = NullValue;
        }

       
        const _bounds = this.evalObjects(
            parse, 
            {
                scaleX:     scaleX, 
                scaleY:     scaleY, 
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
            ['scaleX',     scaleX    ],
            ['scaleY',     scaleY    ],
            ['centerX',    centerX   ],
            ['centerY',    centerY   ],
            ['showCenter', showCenter],
            ['bounds',     bounds    ]
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

        const sx     = options.scaleX.toNumber() / 100;
        const sy     = options.scaleY.toNumber() / 100;
    
        const cx     = bounds.x + bounds.width  * options.centerX.toNumber()/100;
        const cy     = bounds.y + bounds.height * options.centerY.toNumber()/100;

        
        for (const obj of this.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;


            if (   bounds.width  > 0
                && bounds.height > 0)
            {
                applyTransform(
                    obj,
                    cx, cy,
                    [[sx, 0,  0],
                     [0,  sy, 0],
                     [0,  0,  1]]);
            }


            // if (obj.type == VECTOR_PATH)
            // {
            //     // const sx  = Math.max(0, options.scaleX.toNumber()/100);
            //     // const sy  = Math.max(0, options.scaleY.toNumber()/100);


            //     for (const p of obj.points)
            //     {
            //         const d = distance_(
            //             p.x.value, 
            //             p.y.value, 
            //             bounds.x + dx * bounds.width, 
            //             bounds.y + dy * bounds.height);

            //         const a = anglev_(
            //             bounds.x + dx * bounds.width, 
            //             bounds.y + dy * bounds.height, 
            //             p.x.value, 
            //             p.y.value);

            //         const v = mulv(
            //             vector(a, d),
            //             point(sx, sy));

                    
            //         p.x.value = 
            //               bounds.x 
            //             + bounds.width/2 
            //             + v.x;

            //         p.y.value = 
            //               bounds.y
            //             + bounds.height/2
            //             + v.y;
            //     }


            //     FigmaVectorPath.prototype.updatePathData.call(obj);
            // }
            // else
            // {
            //     // const x = Math.max(0, options.scaleX.toNumber()/100);
            //     // const y = Math.max(0, options.scaleY.toNumber()/100);
                

            //     // const dx = 
            //     //     bounds.width != 0
            //     //     ? options.centerX.toNumber() / (bounds.width /2)
            //     //     : options.centerX.toNumber();

            //     // const dy = 
            //     //     bounds.height != 0
            //     //     ? options.centerY.toNumber() / (bounds.height/2)
            //     //     : options.centerY.toNumber();

            //     // const dx = 0.5 + options.centerX.toNumber() / (bounds.width /2);
            //     // const dy = 0.5 + options.centerY.toNumber() / (bounds.height/2);

            //     obj.width  *= sx;
            //     obj.height *= sy;


            //     // update transform

            //     let xform = clone(obj.xform);
    

            //     xform = mulm3m3(
            //         xform,
            //         [[sx, 0,  dx * bounds.width ],
            //          [0,  sy, dy * bounds.height],
            //          [0,  0,  1                 ]]);
    
    
            //     obj.xform = xform;


            //     // // update properties
            //     // const angle = anglev_(
            //     //     bounds.x + ((dx + 0.5) * bounds.width ), 
            //     //     bounds.y + ((dy + 0.5) * bounds.height),
            //     //     obj.x,
            //     //     obj.y);

            //     // const halfd = distance_(
            //     //     bounds.x + ((dx + 0.5) * bounds.width ), 
            //     //     bounds.y + ((dy + 0.5) * bounds.height),
            //     //     obj.x,
            //     //     obj.y);


            //     // const a = 0;
            //     // const v = vector(angle - a, halfd);

            //     // v.x *= x;
            //     // v.y *= y;

            //     // obj.x = 
            //     //       bounds.x 
            //     //     + bounds.width /2 
            //     //     + v.x 
            //     //     - (dx - 0.5) * bw * Math.cos(-a) 
            //     //     - (dy - 0.5) * bh * Math.sin( a);

            //     // obj.y = 
            //     //       bounds.y
            //     //     + bounds.height/2
            //     //     + v.y 
            //     //     - (dx - 0.5) * bw * Math.sin(-a) 
            //     //     - (dy - 0.5) * bh * Math.cos( a);
            // }
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


        await super.evalObjects(parse);


        return bounds;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input     ) this.input     .pushValueUpdates(parse);
        if (this.scaleX    ) this.scaleX    .pushValueUpdates(parse);
        if (this.scaleY    ) this.scaleY    .pushValueUpdates(parse);
        if (this.centerX   ) this.centerX   .pushValueUpdates(parse);
        if (this.centerY   ) this.centerY   .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.scaleX    .isValid()
            && this.scaleY    .isValid()
            && this.centerX   .isValid()
            && this.centerY   .isValid()
            && this.showCenter.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input     ) this.input     .invalidate();
        if (this.scaleX    ) this.scaleX    .invalidate();
        if (this.scaleY    ) this.scaleY    .invalidate();
        if (this.centerX   ) this.centerX   .invalidate();
        if (this.centerY   ) this.centerY   .invalidate();
        if (this.showCenter) this.showCenter.invalidate();
    }



    toValue()
    {
        return this.value.copy();
    }
}