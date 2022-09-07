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
            const fill   = evalFillValue(this.fill,   parse);
            const stroke = evalFillValue(this.stroke, parse);
            
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