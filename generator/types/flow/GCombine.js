class GCombine
extends GOperator
{
    inputs = [];

    value;



    constructor(nodeId, options)
    {
        super(COMBINE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.inputs = [];
    }



    copy()
    {
        const copy = new GCombine(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());
        copy.value  = this.value.copy();

        return copy;
    }



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached();
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new ListValue();

        this.value.objects = [];


        for (let i = 0; i < this.inputs.length; i++)
        {
            const input = await evalValue(this.inputs[i], parse);


            if (   input
                && input.isValid()
                && this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    if (input.condensed === true)
                        this.value.items.push(input);
                    else
                    {
                        for (const item of input.items)
                            this.value.items.push(item);
                    }
                }
                else
                    this.value.items.push(input);
            }


            const inputObjects = this.copyObjects(input, i);
            
            for (const obj of inputObjects)
            {
                obj.objectId += OBJECT_SEPARATOR + i;
                obj.itemIndex = i;
            }

            this.value.objects.push(...inputObjects);
        }


        // reset object space

        const bounds = getObjBounds(this.value.objects);

        const singlePoint =
               this.value.objects.length  == 1 
            && this.value.objects[0].type == POINT;

        for (const obj of this.value.objects)
        {
            obj.createDefaultSpace(obj.sp0.x, obj.sp0.y);
            obj.resetSpace(bounds, singlePoint);
        }
        

        const length = new NumberValue(this.value.items.length);
        const type   = new TextValue(finalListTypeFromItems(this.value.items));


        this.setUpdateValues(parse,
        [
            ['length', length],
            ['type',   type  ]
        ]);


        if (parse.settings.showListTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))]
            ],
            true);
        }


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return !this.inputs.find(i => !i.isValid());
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



    initLoop(parse, loopId)
    {
        this.inputs.forEach(i => i.initLoop(parse, loopId));
    }



    invalidateLoop(parse, nodeId)
    {
        this.inputs.forEach(i => i.invalidateLoop(parse, nodeId));
    }



    iterateLoop(parse)
    {
        this.inputs.forEach(i => i.iterateLoop(parse));
    }



    iterateCache(parse, from)
    {
        for (const input of this.inputs)
        {
            if (   input.type == LIST
                || input.type == COMBINE
                || input.type == CACHE)
                input.iterateCache(parse, from);
        }
    }



    resetLoop(parse, nodeId)
    {
        this.inputs.forEach(i => i.resetLoop(parse, nodeId));
    }
}