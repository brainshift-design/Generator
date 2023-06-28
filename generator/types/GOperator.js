class GOperator
extends GNode
{
    nodeId;
    nodeName;

    topLevel;

    value;

    feedbackValue = null; // () => {}


   
    
    constructor(type, nodeId, options)
    {
        super(type, options);

        this.nodeId   = nodeId;
        this.nodeName = options.nodeName;

        this.valid    = false;
        this.topLevel = false;

        this.value    = null;
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        this.nodeId   = base.nodeId;
        this.nodeName = base.nodeName;

        this.valid    = base.valid;
        this.topLevel = base.topLevel;
    }



    paramFromId(paramId)
    {
        return paramId == 'value'
            ?  this.value
            :  this[paramId];
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
        console.assert(false, 'cannot call abstract method GOperator.toValue()');
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
 
        else if (obj.type == POINT
             && !obj.isDeco)
            bounds = expandRect_(bounds, point(obj.x, obj.y));

        else if (obj.type == LINE)
            bounds = expandRect(bounds, new Rect(obj.x, obj.y, obj.width, 0));

        else
            bounds = expandRect(bounds, new Rect(obj.x, obj.y, obj.width, obj.height));
    }


    return bounds;
}