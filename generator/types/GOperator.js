class GOperator
extends GNode
{
    nodeId;
    nodeName;

    topLevel;

    value;

    feedbackValue = null; // () => {}


    objects = []; // held by Operator because nodes like List and Repeat can also generate objects

    
    
    constructor(type, nodeId, options)
    {
        super(type, options);

        this.nodeId       = nodeId;
        this.nodeName     = options.nodeName;

        this.valid        = false;
        this.topLevel     = false;

        this.value        = null;
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        this.nodeId   = base.nodeId;
        this.nodeName = base.nodeName;

        this.valid    = base.valid;
        this.topLevel = base.topLevel;

        this.copyObjects(base.objects);
    }



    copyObjects(objects)
    {
        this.objects = objects.map(o => o.copy());
    }



    paramFromId(paramId)
    {
        return this[paramId];
    }



    isCached()
    {
        return this.options.cached
            && this.valid;
    }



    async eval(parse)
    {
        // calculate and add value update here

        return this;
    }



    async evalObjects(parse)
    {

    }



    toValue()
    {
        return null;
    }
}



function getObjBounds(objects)
{
    let bounds = Rect.NaN;


    for (const obj of objects)
    {
        if (obj.type == VECTOR_PATH)
        {
            for (const p of obj.points)
            {
                bounds = expandRect_(
                    bounds, 
                    point(
                        NumberValue.prototype.toNumber.call(p.x), 
                        NumberValue.prototype.toNumber.call(p.y)));
            }
        }
 
        else if (obj.type == POINT)
            bounds = expandRect_(bounds, point(obj.x, obj.y));

        else
            bounds = expandRect(bounds, new Rect(obj.x, obj.y, obj.width, obj.height));
    }


    return bounds;
}