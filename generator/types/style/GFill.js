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

        rect.copyFromeBase(this);

        return fill;
    }



    eval(parse)
    {
        if (this.valid)
            return;


        if (this.color  ) this.color  .eval(parse);
        if (this.opacity) this.opacity.eval(parse);

        
        if (this.input)
            this.input.eval(parse);


        if (this.color  ) genPushUpdateValue(parse, this.nodeId, 'color',   this.color  );
        if (this.opacity) genPushUpdateValue(parse, this.nodeId, 'opacity', this.opacity);


        if (this.input)
            this.objects = this.input.objects;

        if (this.active)
            this.evalObjects();


        this.valid = true;
    }



    evalObjects()
    {
        console.log('GFill.evalObjects()');
        console.log('this.objects =', this.objects);
        for (const obj of this.objects)
        {
            if (!obj.fills) obj.fills = [];

            const rgb = scaleRgb(this.color.toRgb());

            obj.fills.push([
                'SOLID', 
                        rgb[0]
                + ' ' + rgb[1]
                + ' ' + rgb[2]
                + ' ' + this.opacity]);
        }

        
        super.evalObjects();
    }
}