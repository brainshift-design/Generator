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
            [returnValueId,      this.value],
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

        const sx     = options.skewX.toNumber() / 100;
        const sy     = options.skewY.toNumber() / 100;

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
                    [[1,  sx, 0],
                     [sy, 1,  0],
                     [0,  0,  1]]);
            }


            //      if (obj.type == VECTOR_PATH)
            //      {
            //          const x  = Math.max(0, options.x.toNumber()/100);
            //          const y  = Math.max(0, options.y.toNumber()/100);
     
            //          const dx = 0.5;// + options.centerX.toNumber() / (bounds.width /2);
            //          const dy = 0.5;// + options.centerY.toNumber() / (bounds.height/2);
     
     
            //          for (const p of obj.points)
            //          {
            //              const d = distance_(
            //                  p.x.value, 
            //                  p.y.value, 
            //                  bounds.x + dx * bounds.width, 
            //                  bounds.y + dy * bounds.height);
     
            //              const a = anglev_(
            //                  bounds.x + dx * bounds.width, 
            //                  bounds.y + dy * bounds.height, 
            //                  p.x.value, 
            //                  p.y.value);
     
            //              const v = mulv(
            //                  vector(a, d),
            //                  point(x, y));
     
                         
            //              p.x.value = 
            //                    bounds.x 
            //                  + bounds.width/2 
            //                  + v.x;
     
            //              p.y.value = 
            //                    bounds.y
            //                  + bounds.height/2
            //                  + v.y;
            //          }
     
     
            //          FigmaVectorPath.prototype.updatePathData.call(obj);
            //      }
            //      else
            //      {
            //          const x  = Math.max(0, options.x.toNumber()/100);
            //          const y  = Math.max(0, options.y.toNumber()/100);
                     
     
            //          const dx = 0.5;
            //             //  bounds.width != 0
            //             //  ? options.centerX.toNumber() / (bounds.width /2)
            //             //  : options.centerX.toNumber();
     
            //          const dy = 0.5;
            //             //  bounds.height != 0
            //             //  ? options.centerY.toNumber() / (bounds.height/2)
            //             //  : options.centerY.toNumber();
     
     
            //          obj.width  *= x;
            //          obj.height *= y;
     
     
            //          const angle = anglev_(
            //              bounds.x + ((dx + 0.5) * bounds.width ), 
            //              bounds.y + ((dy + 0.5) * bounds.height),
            //              obj.x,
            //              obj.y);
     
            //          const halfd = distance_(
            //              bounds.x + ((dx + 0.5) * bounds.width ), 
            //              bounds.y + ((dy + 0.5) * bounds.height),
            //              obj.x,
            //              obj.y);
     
     
            //          const a = 0;
            //          const v = vector(angle - a, halfd);
     
            //          v.x *= x;
            //          v.y *= y;
     
            //          obj.x = 
            //                bounds.x 
            //              + bounds.width /2 
            //              + v.x 
            //              - (dx - 0.5) * bw * Math.cos(-a) 
            //              - (dy - 0.5) * bh * Math.sin( a);
     
            //          obj.y = 
            //                bounds.y
            //              + bounds.height/2
            //              + v.y 
            //              - (dx - 0.5) * bw * Math.sin(-a) 
            //              - (dy - 0.5) * bh * Math.cos( a);
            //      }
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

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.skewX    ) this.skewX    .pushValueUpdates(parse);
        if (this.skewY    ) this.skewY    .pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.skewX.isValid()
            && this.skewY.isValid();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input) this.inputinvalidate();
        if (this.skewX) this.skewX.invalidateInputs();
        if (this.skewY) this.skewY.invalidateInputs();
    }



    toValue()
    {
        return this.value.copy();
    }
}