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
            return;


        if (this.fill  ) this.fill  .eval(parse);
        if (this.weight) this.weight.eval(parse);
        if (this.fit   ) this.fit   .eval(parse);
        if (this.join  ) this.join  .eval(parse);
        if (this.miter ) this.miter .eval(parse);            


        if (this.input)
        {
            this.input.eval(parse);
            this.objects = this.input.objects;

            // while (   !STROKE_TYPES.includes(this.input.type)
            //        && this.input.input)
            //     this.input = this.input.input;
        }


        const [fill, weight, fit, join, miter] = this.getParams();

        if (fill  ) genPushUpdateValue(parse, this.nodeId, 'fill',   fill  .toValue());
        if (weight) genPushUpdateValue(parse, this.nodeId, 'weight', weight.toValue());
        if (fit   ) genPushUpdateValue(parse, this.nodeId, 'fit',    fit   .toValue());
        if (join  ) genPushUpdateValue(parse, this.nodeId, 'join',   join  .toValue());
        if (miter ) genPushUpdateValue(parse, this.nodeId, 'miter',  miter .toValue());


        if (   this.options.active
            || this.options.beforeActive)
            this.evalObjects();


        this.valid = true;
    }



    getParams()
    {
        // console.log('this.input =', this.input);
        return [this.fill   ? this.fill   : this.input && !isEmpty(this.input.objects) ? this.input.fill   : null,
                this.weight ? this.weight : this.input                                 ? this.input.weight : null,
                this.fit    ? this.fit    : this.input                                 ? this.input.fit    : null,
                this.join   ? this.join   : this.input                                 ? this.input.join   : null,
                this.miter  ? this.miter  : this.input                                 ? this.input.miter  : null];
    }



    evalObjects()
    {
        const [fill, weight, fit, join, miter] = this.getParams();
        
        if (   !fill
            || !weight
            || !fit
            || !join
            || !miter)
            return;


        const rgb = scaleRgb(fill.color.toValue().toRgb());

        for (const obj of this.objects)
        {
            if (!obj.strokes) 
                obj.strokes = [];

            obj.strokes.push([
                'SOLID', 
                        rgb[0]
                + ' ' + rgb[1]
                + ' ' + rgb[2]
                + ' ' + fill.opacity.toValue().value]);


            obj.strokeWeight = weight.toValue().value;

            switch (fit.toValue().value)
            {
                case 0: obj.strokeAlign = 'INSIDE';  break;
                case 1: obj.strokeAlign = 'CENTER';  break;
                case 2: obj.strokeAlign = 'OUTSIDE'; break;
            }
            
            switch (join.toValue().value)
            {
                case 0: obj.strokeJoin = 'MITER'; break;
                case 1: obj.strokeJoin = 'BEVEL'; break;
                case 2: obj.strokeJoin = 'ROUND'; break;
            }

            obj.strokeMiterLimit = miter.toValue().value;
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