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



    // copy()
    // {
    //     const geom = new GGeometryBase(this.type, this.nodeId, this.active);

    //     geom.copyBase(this);

    //     return geom;
    // }



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
            if (input)
            {
                if (this.fill  ) this.result.fill   = this.fill  .eval(parse).copy();
                if (this.stroke) this.result.stroke = this.stroke.eval(parse).copy();
            }
            else
            {
                this.result.fill   = this.fill  .eval(parse).copy();
                this.result.stroke = this.stroke.eval(parse).copy();
            }


            genPushUpdateValue(parse, this.nodeId, 'fill',   this.fill  );
            genPushUpdateValue(parse, this.nodeId, 'stroke', this.stroke);
        }
    }
}