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


        if (this.input)
        {
            this.input.eval(parse);
            this.objects = this.input.objects;
        }

        const hasInput =     
               this.input 
            && FILL_TYPES.includes(this.input.type);   


        if (this.color  ) this.color  .eval(parse); else if (hasInput) this.color   = this.input.color;
        if (this.opacity) this.opacity.eval(parse); else if (hasInput) this.opacity = this.input.opacity;

        if (this.color  ) genPushUpdateValue(parse, this.nodeId, 'color',   this.color  .toValue());
        if (this.opacity) genPushUpdateValue(parse, this.nodeId, 'opacity', this.opacity.toValue());

        
        if (   this.options.active
            || this.options.beforeActive)
            this.evalObjects();


        this.valid = true;
    }



    evalObjects()
    {
        if (   !this.objects
            || !this.options.enabled)
            return;


        const rgb = scaleRgb(this.color.toValue().toRgb());

        
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