class GList
extends GOperator
{
    static { GNode.types[LIST] = this; }



    inputs = [];

    value;



    constructor(nodeId, options)
    {
        super(LIST, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.inputs = [];
    }



    copy()
    {
        const copy = new GList(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.value) copy.value = this.value.copy();

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


        for (const obj of this.value.objects)
        {
            const angle1 = anglev_(obj.sp0, obj.sp1);
            const angle2 = anglev_(obj.sp0, obj.sp2);

            obj.createDefaultSpace(obj.sp0.x, obj.sp0.y);
            
            obj.sp1 = addv(obj.sp0, vector(angle1, 1));
            obj.sp2 = addv(obj.sp0, vector(angle2, 1));
        }
        

        const length = new NumberValue(this.value.items.length);
        const type   = new TextValue(finalListTypeFromValues(this.value.items));


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



    toNewValue()
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
            if (   input.type == ITEMS
                || input.type == LIST
                || input.type == CACHE)
                input.iterateCache(parse, from);
        }
    }



    resetLoop(parse, nodeId)
    {
        this.inputs.forEach(i => i.resetLoop(parse, nodeId));
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const list = new GList(nodeId, options);
    
        
        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());
    
    
        if (parse.settings.logRequests) 
            logReq(list, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, list);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
        
        for (let i = 0; i < nInputs; i++)
            list.inputs.push(genParse(parse));
    
    
        parse.nTab--;
    
            
        genParseNodeEnd(parse, list);
        return list;
    }
}