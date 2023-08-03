class GOperator
extends GNode
{
    nodeId;
    nodeName;

    topLevel;

    value;

    updateValues  = [];
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

        if (base.value) 
            this.value = base.value.copy();
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



    setUpdateValues(parse, values)
    {
        this.updateValues =
               parse.repeats.length == 0
            || parse.repeats[0].iteration == parse.repeats[0].total-1
            ? values
            : [];
    }



    updateValueObjects()
    {
        if (!this.value)
            return;


        for (let i = 0; i < this.value.objects.length; i++)
        {
            const obj    = this.value.objects[i];

            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
            obj.listId   = -1;
        }
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }
    // toValue()
    // {
    //     consoleError('cannot call abstract method GOperator.toValue()');
    //     return null;
    // }
}