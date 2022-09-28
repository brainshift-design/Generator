class GFill
extends GShapeBase
{
    input   = null;

    color   = null;
    opacity = null;



    constructor(nodeId, options)
    {
        super(FILL, nodeId, options);
    }



    copy()
    {
        const fill = new GFill(this.nodeId, this.options);

        if (this.input) 
            fill.input = this.input.copy();

        if (this.color  ) fill.color   = this.color  .copy();
        if (this.opacity) fill.opacity = this.opacity.copy();

        rect.copyFromBase(this);

        return fill;
    }



    eval(parse)
    {
        if (this.valid)
            return;


        if (this.color  ) this.color  .eval(parse);
        if (this.opacity) this.opacity.eval(parse);

        
        if (this.input)
        {
            this.input.eval(parse);
            this.objects = this.input.objects;
        }


        const [color, opacity] = this.getParams();

        if (color  ) genPushUpdateValue(parse, this.nodeId, 'color',   color  .toValue());
        if (opacity) genPushUpdateValue(parse, this.nodeId, 'opacity', opacity.toValue());

        
        if (   this.options.active
            || this.options.beforeActive)
            this.evalObjects();


        this.valid = true;
    }



    getParams()
    {
        return [this.color   ? this.color   : this.input ? this.input.color   : null,
                this.opacity ? this.opacity : this.input ? this.input.opacity : null];
    }



    evalObjects()
    {
        const [color, opacity] = this.getParams();

        if (   !color
            || !opacity)
            return;


        const rgb = scaleRgb(color.toValue().toRgb());


        for (const obj of this.objects)
        {
            if (!obj.fills) 
                obj.fills = [];

            obj.fills.push([
                'SOLID', 
                        rgb[0]
                + ' ' + rgb[1]
                + ' ' + rgb[2]
                + ' ' + this.opacity.toValue().toNumber()]);
        }

        
        super.evalObjects();
    }



    toValue()
    {
        return new FillValue(
            this.color   ? this.color  .toValue() : this.input.color  .toValue(),
            this.opacity ? this.opacity.toValue() : this.input.opacity.toValue());
    }



    isValid()
    {
        return this.color  .isValid()
            && this.opacity.isValid();
    }
}