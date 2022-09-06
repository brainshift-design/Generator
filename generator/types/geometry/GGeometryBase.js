class GGeometryBase
extends GOperator
{
    fill    = null;
    stroke  = null;
    

    objects = [];



    constructor(type, nodeId, active)
    {
        super(type, nodeId, active);
    }



    copyFromeBase(base)
    {
        if (base.fill  ) this.fill   = base.fill  .copy();
        if (base.stroke) this.stroke = base.stroke.copy();

        this.objects = [...base.objects];
    }



    addUpdateObject(parse, nodeId, objects)
    {
        if (this.active) 
            genPushUpdateObject(parse, nodeId, objects);
        else 
            this.objects.push(objects);
    }



    evalBase(parse, input)
    {
        if (!this.valid)
        {
            let fill;
            
                 if ( FILL_TYPES.includes(this.fill.type)) fill = this.fill.eval(parse).copy();
            else if (COLOR_TYPES.includes(this.fill.type)) fill = new FillValue(this.fill.eval(parse).copy(), new NumberValue(100));
            else console.assert(false, 'fill must have type');

            const stroke = this.stroke.eval(parse).copy();
            

            if (input)
            {
                if (this.fill  ) this.result.fill   = fill;
                if (this.stroke) this.result.stroke = stroke;
            }
            else
            {
                this.result.fill   = fill;
                this.result.stroke = stroke;
            }


            genPushUpdateValue(parse, this.nodeId, 'fill',   this.result.fill  );
            genPushUpdateValue(parse, this.nodeId, 'stroke', this.result.stroke);
        }
    }
}