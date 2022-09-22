class GFill
extends GShapeBase
{
    input   = null;

    color   = null;
    opacity = null;



    constructor(nodeId, active)
    {
        super(FILL, nodeId, active);
    }



    copy()
    {
        const fill = new GFill(this.nodeId, this.active);

        if (this.input) 
            fill.input = this.input.copy();

        if (this.color  ) fill.color   = this.color  .copy();
        if (this.opacity) fill.opacity = this.opacity.copy();

        rect.copyFromBase(this);

        return fill;
    }



    isValid()
    {
        return this.color  .isValid()
            && this.opacity.isValid();
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


        const color   = this.color   /*&& (!this.input || SHAPE_TYPES.includes(this.input.type))*/ ? this.color   : this.input ? this.input.color   : null;
        const opacity = this.opacity /*&& (!this.input || SHAPE_TYPES.includes(this.input.type))*/ ? this.opacity : this.input ? this.input.opacity : null;


        if (color  ) genPushUpdateValue(parse, this.nodeId, 'color',   color  );
        if (opacity) genPushUpdateValue(parse, this.nodeId, 'opacity', opacity);


        this.evalObjects();


        this.valid = true;
    }



    evalObjects()
    {
        if (   !this.color
            || !this.opacity)
            return;

            console.log('this.color =', this.color);
        const rgb = scaleRgb(this.color.toRgb());


        for (const obj of this.objects)
        {
            if (!obj.fills) 
                obj.fills = [];

            obj.fills.push([
                'SOLID', 
                        rgb[0]
                + ' ' + rgb[1]
                + ' ' + rgb[2]
                + ' ' + this.opacity.toNumber()]);
        }

        
        super.evalObjects();
    }
}