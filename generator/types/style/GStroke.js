class GStroke
extends GShapeBase
{
    input  = null;

    fill   = null;
    weight = null;
    fit    = null;
    join   = null;
    miter  = null;



    constructor(nodeId, options)
    {
        super(STROKE, nodeId, options);
    }



    copy()
    {
        const stroke = new GStroke(this.nodeId, this.options);

        stroke.copyBase(this);

        if (this.input) 
            stroke.input = this.input.copy();

        if (this.fill  ) stroke.fill   = this.fill  .copy();
        if (this.weight) stroke.weight = this.weight.copy();
        if (this.fit   ) stroke.fit    = this.fit   .copy();
        if (this.join  ) stroke.join   = this.join  .copy();
        if (this.miter ) stroke.miter  = this.miter .copy();

        return stroke;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        if (this.input)
        {
            this.input = this.input.eval(parse).copy();
            this.objects = clone(this.input.objects);
        }


        if (   this.fill
            && COLOR_TYPES.includes(this.fill.type))
        {
            this.fill = this.fill.eval(parse).copy();

            this.fill = new FillValue(
                this.fill.toValue(), 
                this.fill.options.opacity.toValue());
        }


        const hasInput =     
               this.input 
            && STROKE_TYPES.includes(this.input.type);   


        if (this.fill  ) this.fill  .eval(parse); else if (hasInput) this.fill   = this.input.fill; 
        if (this.weight) this.weight.eval(parse); else if (hasInput) this.weight = this.input.weight;
        if (this.fit   ) this.fit   .eval(parse); else if (hasInput) this.fit    = this.input.fit;
        if (this.join  ) this.join  .eval(parse); else if (hasInput) this.join   = this.input.join;
        if (this.miter ) this.miter .eval(parse); else if (hasInput) this.miter  = this.input.miter;            

        if (this.fill  ) genPushUpdateValue(parse, this.nodeId, 'fill',   this.fill  .toValue());
        if (this.weight) genPushUpdateValue(parse, this.nodeId, 'weight', this.weight.toValue());
        if (this.fit   ) genPushUpdateValue(parse, this.nodeId, 'fit',    this.fit   .toValue());
        if (this.join  ) genPushUpdateValue(parse, this.nodeId, 'join',   this.join  .toValue());
        if (this.miter ) genPushUpdateValue(parse, this.nodeId, 'miter',  this.miter .toValue());


        if (   this.options.active
            || this.options.beforeActive)
            this.evalObjects();


        this.valid = true;

        return this;
    }



    evalObjects()
    {
        if (!this.objects)
            return;


        if (this.options.enabled)
        {
            const rgb = scaleRgb(this.fill.color.toValue().toRgb());

            for (const obj of this.objects)
            {
                if (!obj.strokes)
                    obj.strokes = [];

                obj.strokes.push([
                    'SOLID', 
                            rgb[0]
                    + ' ' + rgb[1]
                    + ' ' + rgb[2]
                    + ' ' + this.fill.opacity.toValue().value]);


                if (this.weight)
                    obj.strokeWeight = this.weight.toValue().value;

                if (this.fit)
                    switch (this.fit.toValue().value)
                    {
                        case 0: obj.strokeAlign = 'INSIDE';  break;
                        case 1: obj.strokeAlign = 'CENTER';  break;
                        case 2: obj.strokeAlign = 'OUTSIDE'; break;
                    }

                if (this.join)
                    switch (this.join.toValue().value)
                    {
                        case 0: obj.strokeJoin = 'MITER'; break;
                        case 1: obj.strokeJoin = 'BEVEL'; break;
                        case 2: obj.strokeJoin = 'ROUND'; break;
                    }

                if (this.miter)
                    obj.strokeMiterLimit = this.miter.toValue().value;
            }
        }

        
        super.evalObjects();
    }



    toValue()
    {
        return new StrokeValue(
            this.fill   ? this.fill  .toValue() : this.input.fill  .toValue(),
            this.weight ? this.weight.toValue() : this.input.weight.toValue(),
            this.fit    ? this.fit   .toValue() : this.input.fit   .toValue(),
            this.join   ? this.join  .toValue() : this.input.join  .toValue(),
            this.miter  ? this.miter .toValue() : this.input.miter .toValue());
    }



    isValid()
    {
        return this.fill  .isValid()
            && this.weight.isValid()
            && this.fit   .isValid()
            && this.join  .isValid()
            && this.miter .isValid();
    }
}