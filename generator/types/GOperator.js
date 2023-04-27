class GOperator
extends GNode
{
    nodeId;
    nodeName;

    valid; // has been evaluated
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



    // isValid()
    // {
    //     return this.valid;
    // }



    invalidate()
    {
        this.valid = false;
    }



    // invalidateVolatile() // sequence, random, anything where the value changes on each subsequent iteration
    // {

    // }
}