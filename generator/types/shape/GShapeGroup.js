class GShapeGroup
extends GShapeBase
{
    inputs = [];



    constructor(nodeId, options)
    {
        super(SHAPE_GROUP, nodeId, options);
    }



    copy()
    {
        const copy = new GShapeGroup(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new ShapeGroupValue(this.nodeId);


        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            const input = (await this.inputs[i].eval(parse)).toValue();

            
            if (   input
                && this.options.enabled)            
            {
                if (   input.type == SHAPE_LIST_VALUE
                    || input.type == LIST_VALUE)
                {
                    for (const item of input.items)
                    {
                        if (!SHAPE_VALUES.includes(item.type))
                            continue;

                        this.value.items.push(item);//.copy());   
                        //this.value.objects.push(...item.objects.map(o => this.copyObject(o, i)));
                    }
                }
                else
                {
                    this.value.items.push(input);//.copy());
                    //this.value.objects.push(...input.objects.map(o => this.copyObject(o, i)));
                }
            }
        }


        this.setUpdateValues(parse, [['value', this.value]]);


        //await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        if (this.value.items)
        {
            const group = new FigmaShapeGroup(
                this.nodeId,
                this.nodeId,
                this.nodeName);


            for (const item of this.value.items)
            {
                for (let i = 0; i < item.objects.length; i++)
                {
                    const obj = item.objects[i].copy();

                    obj.nodeId   = this.nodeId;
                    obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                    obj.listId   = -1;

                    group.children.push(obj);
                }
            }


            let bounds = Rect.NaN;

            for (const obj of group.children)
                bounds = expandRect(bounds, obj.getBounds());
    
            group.x      = bounds.x;
            group.y      = bounds.y;
            group.width  = bounds.width;
            group.height = bounds.height;

            
            group.createDefaultSpace();
            group.resetSpace(bounds);

            group.createDefaultTransform(bounds.x, bounds.y);
            group.createDefaultTransformPoints(bounds.x, bounds.y, bounds.width, bounds.height);


            this.value.objects = [group];
        }
        else
        {
            this.value.objects = [];
        }

        
        await super.evalObjects(parse);
    }



    toValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        if (!super.isValid()) 
            return false;

        for (const input of this.inputs)
            if (!input.isValid())
                return false;

        return true;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        this.inputs.forEach(i => i.invalidateInputs(parse, from));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
    }
}