class GRotate
extends GOperator
{
    input      = null;
   
    angle      = null;
    centerX    = null;
    centerY    = null;
    showCenter = null;



    constructor(nodeId, options)
    {
        super(ROTATE, nodeId, options);
    }



    copy()
    {
        const copy = new GRotate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.angle     ) copy.angle      = this.angle     .copy();
        if (this.centerX   ) copy.centerX    = this.centerX   .copy();
        if (this.centerY   ) copy.centerY    = this.centerY   .copy();
        if (this.showCenter) copy.showCenter = this.showCenter.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        //console.log('this.centerX =', this.centerX);
        const angle      = this.angle      ? (await this.angle     .eval(parse)).toValue() : null;
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
                angle:      angle, 
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
            ['angle',      angle     ],
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
        const angle  = options.angle.toNumber()/360*Tau;

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
                    [[ Math.cos(angle), Math.sin(angle), 0],
                     [-Math.sin(angle), Math.cos(angle), 0],
                     [ 0,               0,               1]]);
            }


            // if (obj.type == VECTOR_PATH)
            // {
            //     const dx = 0.5 + options.centerX.toNumber() / (bounds.width /2);
            //     const dy = 0.5 + options.centerY.toNumber() / (bounds.height/2);


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

            //         const v = vector(a + options.angle.toNumber()/360*Tau, d);

                    
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
            //     const dx = 
            //         bounds.width != 0
            //         ? options.centerX.toNumber() / (bounds.width /2)
            //         : options.centerX.toNumber();

            //     const dy = 
            //         bounds.height != 0
            //         ? options.centerY.toNumber() / (bounds.height/2)
            //         : options.centerY.toNumber();


            //     const angle = anglev_(
            //         bounds.x + bounds.width /2, 
            //         bounds.y + bounds.height/2,
            //         obj.x,
            //         obj.y);

            //     const halfd = distance_(
            //         bounds.x + bounds.width /2,
            //         bounds.y + bounds.height/2,
            //         obj.x,
            //         obj.y);

            //     const a = obj.angle/360*Tau;
            //     const v = vector(angle - a, halfd);


            //     obj.x = 
            //           bounds.x 
            //         + bounds.width /2 
            //         + v.x 
            //         - dx * bw * Math.cos(-a) 
            //         - dy * bh * Math.sin( a);

            //     obj.y = 
            //           bounds.y
            //         + bounds.height/2
            //         + v.y 
            //         - dx * bw * Math.sin(-a) 
            //         - dy * bh * Math.cos( a);
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
        if (this.angle     ) this.angle     .pushValueUpdates(parse);
        if (this.centerX   ) this.centerX   .pushValueUpdates(parse);
        if (this.centerY   ) this.centerY   .pushValueUpdates(parse);
        if (this.showCenter) this.showCenter.pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.angle     .isValid()
            && this.centerX   .isValid()
            && this.centerY   .isValid()
            && this.showCenter.isValid();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input     ) this.input     .invalidateInputs();
        if (this.angle     ) this.angle     .invalidateInputs();
        if (this.centerX   ) this.centerX   .invalidateInputs();
        if (this.centerY   ) this.centerY   .invalidateInputs();
        if (this.showCenter) this.showCenter.invalidateInputs();
    }



    toValue()
    {
        return this.value.copy();
    }
}