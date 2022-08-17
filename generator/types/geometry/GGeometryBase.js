class GGeometryBase
extends GOperator
{
    fill         = null;
    stroke       = null;
    strokeWeight = null;
    strokeFit    = null;
    strokeJoin   = null;
    strokeMiter  = null;
    

    objects      = [];



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
        if (base.fill        ) this.fill         = base.fill        .copy();
        if (base.stroke      ) this.stroke       = base.stroke      .copy();
        if (base.strokeWeight) this.strokeWeight = base.strokeWeight.copy();
        if (base.strokeFit   ) this.strokeFit    = base.strokeFit   .copy();
        if (base.strokeJoin  ) this.strokeJoin   = base.strokeJoin  .copy();
        if (base.strokeMiter ) this.strokeMiter  = base.strokeMiter .copy();

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
                if (this.fill        ) this.result.fill         = this.fill        .eval(parse).copy();
                if (this.stroke      ) this.result.stroke       = this.stroke      .eval(parse).copy();
                if (this.strokeWeight) this.result.strokeWeight = this.strokeWeight.eval(parse).copy();
                if (this.strokeFit   ) this.result.strokeFit    = this.strokeFit   .eval(parse).copy();
                if (this.strokeJoin  ) this.result.strokeJoin   = this.strokeJoin  .eval(parse).copy();
                if (this.strokeMiter ) this.result.strokeMiter  = this.strokeMiter .eval(parse).copy();
            }
            else
            {
                this.result.fill         = this.fill        .eval(parse).copy();
                this.result.stroke       = this.stroke      .eval(parse).copy();
                this.result.strokeWeight = this.strokeWeight.eval(parse).copy();
                this.result.strokeFit    = this.strokeFit   .eval(parse).copy();
                this.result.strokeJoin   = this.strokeJoin  .eval(parse).copy();
                this.result.strokeMiter  = this.strokeMiter .eval(parse).copy();
            }


            if (this.active)
                genPushUpdateObject(
                    parse,
                    this.nodeId,
                    this.result.toFigmaObject());
        }
    }
}