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

            if (this.options.enabled)
            {
                for (let j = 0; j < this.inputs[i].objects.length; j++, o++)
                {
                    //console.log('this.inputs[i].objects[j] =', this.inputs[i].objects[j]);
                    //const obj = this.inputs[i].objects[j].copy();
                    const obj = copyFigmaObject(this.inputs[i].objects[j]);

                    obj.nodeId = this.nodeId;

                    if (obj.objectId != NULL) obj.objectId += ' ';
                    obj.objectId += (o + 1).toString();
                    
                    obj.listId = i;

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
                        this.value.items.push(item.copy());   
                }
                else
                    this.value.items.push(input.copy());
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



    invalidate()
    {
        super.invalidate();

        this.inputs.forEach(i => i.invalidate());
    }
}
