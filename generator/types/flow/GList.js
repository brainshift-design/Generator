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



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new ListValue();

        this.objects = [];


        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);
            
            
            // first copy the input objects
            // to display when list the active node

            if (this.options.enabled)
            {
                for (let j = 0; j < this.inputs[i].objects.length; j++, o++)
                {
                    const obj = copyFigmaObject(this.inputs[i].objects[j]);

                    obj.nodeId   = this.nodeId;
                    obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
                    obj.listId   = i;

                    this.objects.push(obj);
                }
            }


            // now create the output value

            const input = this.inputs[i].toValue();

            if (   input
                && this.options.enabled)            
            {
                if (LIST_VALUES.includes(input.type))
                {
                    for (const item of input.items)
                    {
                        this.value.items  .push(item.copy());   
                        this.value.objects.push(...item.objects.map(o => o.copy()));
                    }
                }
                else
                {
                    this.value.items  .push(input.copy());
                    this.value.objects.push(...input.objects.map(o => o.copy()));
                }
            }
        }


        this.updateValues = [['value', this.value]];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        this.inputs.forEach(i => i.invalidateInputs(from));
    }
}
