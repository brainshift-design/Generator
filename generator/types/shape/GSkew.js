class GSkew
extends GOperator
{
    input   = null;

    x       = null;
    y       = null;
    centerX = null;
    centerY = null;



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

        
        this.evalObjects(
            parse, 
            {
                x:       x, 
                y:       y, 
                centerX: centerX, 
                centerY: centerY
            });


        this.updateValues =
        [
            ['value',   this.value],
            ['x',       x         ],
            ['y',       y         ],
            ['centerX', centerX   ],
            ['centerY', centerY   ]
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

        // const bw = bounds.width  != 0 ? bounds.width  : 1;
        // const bh = bounds.height != 0 ? bounds.height : 1;

        const x = options.x.toNumber() / bounds.width;
        const y = options.y.toNumber() / bounds.height;

        const dx = 
            bounds.width != 0
            ? (0.5 + options.centerX.toNumber() / (bounds.width /2)) * bounds.width
            : 0;

        const dy = 
            bounds.height != 0
            ? (0.5 + options.centerY.toNumber() / (bounds.height/2)) * bounds.height
            : 0;

            
        for (const obj of this.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;


            let xform = clone(obj.xform);


            xform = mulm3m3(
                xform,
                [[1/Math.cos(y/2), 0,               dx],
                 [0,               1/Math.cos(x/2), dy],
                 [0,               0,               1 ]]);


            obj.width  /= Math.cos(y);
            obj.height /= Math.cos(x);

            xform = mulm3m3(
                xform,
                [[1,           Math.tan(x), 0],
                 [Math.tan(y), 1,           0],
                 [0,           0,           1]]);


            xform = mulm3m3(
                xform,
                [[1, 0, -dx],
                 [0, 1, -dy],
                 [0, 0,  1 ]]);


            obj.xform = xform;


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

        
        super.evalObjects(parse);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.x    ) this.x    .pushValueUpdates(parse);
        if (this.y    ) this.y    .pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.x.isValid()
            && this.y.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input ) this.input .invalidate();
        if (this.x     ) this.x     .invalidate();
        if (this.y     ) this.y     .invalidate();
    }



    toValue()
    {
        return this.value.copy();
    }
}