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



    setUpdateValues(parse, values, add = false)
    {
        if (    parse.repeats.length == 0
            || !this.options.unknown
            ||  parse.repeats.at(-1).iteration == parse.repeats.at(-1).total-1)
        {
            if (add) this.updateValues.push(...values);
            else     this.updateValues = [...values];
        }
        else if (!add)
        {
            this.updateValues = [];
        }
    }



    copyObjects(value, listId = -1)
    {
        const objects = getValidObjects(value);
        const copies  = [];
                        
        
        for (let i = 0; i < objects.length; i++)//, o++)
        {
            const obj = copyFigmaObject(objects[i]);
    
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
            obj.listId   = listId;
    
            copies.push(obj);
        }

        return copies;
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