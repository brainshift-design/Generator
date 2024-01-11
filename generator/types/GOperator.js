class GOperator
extends GNode
{
    nodeId;
    nodeName;

    topLevel;

    value;
    
    customParams = []; // [[name, GValue]]
    options      = {};
    updateValues = [];

   
    
    constructor(type, nodeId, options)
    {
        super(type, options);

        this.nodeId   = nodeId;
        this.nodeName = options.nodeName;

        this.options  = clone(options);

        this.valid    = false;
        this.topLevel = false;

        this.value    = null;
    }



    reset()
    {
        this.customParams = [];
        this.options      = {};
        this.updateValues = [];
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        this.nodeId   = base.nodeId;
        this.nodeName = base.nodeName;

        this.copyCustomParams(base);

        this.options  = clone(base.options);

        this.valid    = base.valid;
        this.topLevel = base.topLevel;

        if (base.value) 
            this.value = base.value.copy();
    }



    copyCustomParams(base)
    {
        for (const param of base.customParams)
            this.customParams.push([param[0], param[1].copy()]);
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



    copyObjects(value, listId = -1)
    {
        const objects = getValidObjects(value);
        const copies  = [];
                        
        for (let i = 0; i < objects.length; i++)//, o++)
        {
            const obj = copyFigmaObject(objects[i]);
    
            obj.nodeId   = this.nodeId;
            obj.listId   = listId;
            
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
    
            copies.push(obj);
        }

        return copies;
    }
    
    

    outputType()
    {
        return this.value
            ? new TextValue(
                isListType(this.value.type)
                ? finalListTypeFromItems(this.value.items)
                : this.value.type)
            : new TextValue(ANY_VALUE);
    }



    outputListType()
    {
        return this.outputType();
        //return this.value
        //     ? new TextValue(finalListTypeFromItems(this.value.items))
        //     : TextValue.NaN.copy();
    }



    toValue()
    {
        return this.value;
            //  ? this.value.copy()
            //  : null;
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.unknown)
            this.valid = false;

        this.iterated = false;
    }



    initLoop(parse, nodeId)
    {
        this.loopId    = nodeId;
        this.iteration = 0;
    }



    invalidateLoop(parse, nodeId)
    {
        this.valid = false;
    }



    iterateLoop(parse)
    {
        const repeatIndex = parse.repeats.findIndex(r => r.repeatId == this.loopId);
        
        // if (this.nodeId == 'sequence')
        // {
        //     console.log('repeatIndex = ', repeatIndex);
        //     console.log('this.iterated = ', this.iterated);
        // }

        if (   (   repeatIndex < 0
                || repeatIndex == parse.repeats.length-1)
            && !this.iterated)
        {
            //console.log('iterating');
            this.iteration++;
            this.iterated = true;
        }
    }



    iterateCache(parse, from)
    {

    }



    resetLoop(parse, nodeId)
    {
        this.valid     = false;
        this.iteration = 0;
    }    



    setUpdateValues(parse, values, add = false)
    {
        if (    parse.repeats.length == 0
            ||  this.unknown && parse.repeats[0].total == 0
            || !this.unknown
            ||  parse.repeats.at(-1).iteration == 0
            ||  parse.repeats.at(-1).iteration == parse.repeats.at(-1).total-1)
        {
            if (add) this.updateValues.push(...values);
            else     this.updateValues = [...values];
        }
        else if (!add)
            this.updateValues = [];
    }



    pushValueUpdates(parse)
    {
        if (!this.updateValues)
            return;

        for (const value of this.updateValues)
            genPushUpdateValue(parse, this.nodeId, value[0], value[1]);

        //if (this.isValid())
            this.updateValues = [];
    }



    updateValueObjects()
    {
        if (   !this.value
            || !this.value.objects)
            return;


        for (let i = 0; i < this.value.objects.length; i++)
        {
            const obj    = this.value.objects[i];

            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
            obj.listId   = -1;
        }
    }



    // resetNode()
    // {
    //     for (const prop in this)
    //     {
    //         if (this.hasOwnProperty(prop))
    //         {
    //             if (   this[prop]
    //                 && this[prop].resetNode)
    //                 this[prop].resetNode();

    //             this[prop] = null;
    //         }
    //     }
    // }
}