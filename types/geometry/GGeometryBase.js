class GGeometryBase
extends GOperator
{
    objects = [];



    constructor(type = GEOMETRY, nodeId = '', active = false)
    {
        super(type, nodeId, active);
    }



    copy()
    {
        const geom = new GGeometryBase(this.type, this.nodeId, this.active);

        geom.copyBase(this);

        return geom;
    }



    copyBase(base)
    {
        this.objects = [...base.objects];
    }



    addUpdateObject(parse, nodeId, objects)
    {
        if (this.active)
            genPushUpdateObject(parse, nodeId, objects);
        else 
            this.objects.push(objects);
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GGeometryBase(this.nodeId, this.active);


            this.result.valid = true;
            this.valid        = true;
        }


        return this.result;
    }
}