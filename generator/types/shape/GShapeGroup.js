class GShapeGroup
extends GShapeBase
{
    static { GNode.types[SHAPE_GROUP] = this; }



    inputs = [];



    constructor(nodeId, options)
    {
        super(SHAPE_GROUP, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs = [];
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

        this.value.objects = [];

       
        const inputs = [];
        
        if (this.options.enabled)
        {
            for (let i = 0; i < this.inputs.length; i++)
            {
                const input = await evalValue(this.inputs[i], parse);

                if (input)            
                {
                    inputs.push(input);

                    if (   input.type == SHAPE_LIST_VALUE
                        || input.type == LIST_VALUE)
                    {
                        for (const item of input.items)
                        {
                            if (!SHAPE_VALUES.includes(item.type))
                                continue;

                            this.value.items.push(item);
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
        }


        this.setUpdateValues(parse, 
        [
            ['value', this.value]
        ]);


        //await this.evalShapeBase(parse);


        await this.evalObjects(parse, {inputs: inputs});


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


            for (let i = 0; i < options.inputs.length; i++)
            {
                const input = options.inputs[i];

                if (input.objects)
                {
                    for (let j = 0; j < input.objects.length; j++)
                        this.addChildObject(group.children, input.objects[j], i, j);
                }
            }


            // reset object space
    
            const bounds = getObjBounds(group.children);

            const singlePoint =
                   group.children.length  == 1 
                && group.children[0].type == POINT;

            for (const obj of group.children)
            {
                // const angle1 = anglev_(obj.sp0, obj.sp1);
                // const angle2 = anglev_(obj.sp0, obj.sp2);
    
                obj.createDefaultSpace(obj.sp0.x, obj.sp0.y);
                
                // obj.sp1 = addv(obj.sp0, vector(angle1, 1));
                // obj.sp2 = addv(obj.sp0, vector(angle2, 1));

                obj.resetSpace(bounds, singlePoint);
            }


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



    addChildObject(objects, _obj, inputIndex, objIndex)
    {
        const obj = copyFigmaObject(_obj);

        obj.nodeId    = this.nodeId;
        obj.objectId += OBJECT_SEPARATOR + inputIndex;// + OBJECT_SEPARATOR + objIndex;//OBJECT_SEPARATOR + this.nodeId + OBJECT_SEPARATOR + inputIndex;
        obj.listId    = -1;

        objects.push(obj);
    }



    toNewValue()
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



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const group = new GShapeGroup(nodeId, options);
    
    
        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());
    
    
        if (parse.settings.logRequests) 
            logReq(group, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, group);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        for (let i = 0; i < nInputs; i++)
            group.inputs.push(genParse(parse));
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, group);
        return group;
    }
}