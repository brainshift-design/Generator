class GList
extends GOperator
{
    inputs = [];

    value;



    constructor(nodeId, options)
    {
        super(LIST, nodeId, options);
    }


    
    copy()
    {
        const copy = new GList(this.nodeId, this.options);

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


        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);
            
            
            // first copy the input objects
            // to display when list is the active node

            // if (   this.options.enabled
            //     && this.inputs[i].value)
            // {
            //     const objects = getValidObjects(this.inputs[i].value);
                
            //     for (let j = 0; j < objects.length; j++, o++)
            //     {
            //         const obj = objects[j];//copyFigmaObject(objects[j]);

            //         obj.nodeId   = this.nodeId;
            //         obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
            //         obj.listId   = i;

            //         //this.value.objects.push(obj);
            //     }
            // }


            // now create the output value

            const input = this.inputs[i].toValue();


            if (   input
                && this.options.enabled)            
            {
                if (LIST_VALUES.includes(input.type))
                {
                    if (input.condensed === true)
                        this.value.items.push(input.copy());
                    else
                    {
                        for (const item of input.items)
                            this.value.items.push(item.copy());   
                    }
                }
                else
                    this.value.items.push(input.copy());
            }


            this.value.objects.push(...this.copyObjects(input, i));
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


        this.setUpdateValues(parse,
        [
            ['preview', new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 10)))],
            ['length',  new NumberValue(this.value.items.length)                                       ],
            ['type',    new TextValue(finalListTypeFromItems(this.value.items))                        ]
        ]);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        this.inputs.forEach(i => i.invalidateInputs(from));
    }
}