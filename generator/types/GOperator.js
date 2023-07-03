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



    updateValueObjects()
    {
        if (!this.value)
            return;


        for (let i = 0; i < this.value.objects.length; i++)
        {
            const obj  = this.value.objects[i].copy();

            obj.nodeId = this.nodeId;
            obj.listId = -1;
            
            this.objects.push(obj);
        }
    }



    toValue()
    {
        consoleError('cannot call abstract method GOperator.toValue()');
        return null;
    }
}