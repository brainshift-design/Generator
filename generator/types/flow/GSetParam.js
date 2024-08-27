class GSetParam
extends GOperator2
{
    name = null;


    
    constructor(nodeId, options)
    {
        super(SET_PARAM, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.name  = null;
    }



    copy()
    {
        const copy = new GSetParam(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.name) copy.name = this.name.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = await evalValue    (this.input0, parse);
        const input1 = await evalValue    (this.input1, parse);
        const name   = await evalTextValue(this.name,   parse);


        if (   input0
            && name)
        {
            let nameValue = name.value.trim();


            if (isListValueType(input0.type))
            {
                this.value = new ListValue();

                if (this.options.enabled)
                {
                    for (let i = 0; i < input0.items.length; i++)
                    {
                        const item = input0.items[i];

                        if (   input1
                            && name.value.trim() != '')
                            item.customParams.push([nameValue, input1]);

                        
                        if (   item
                            && item[nameValue]
                            && item[nameValue].objects 
                            && this.value.objects)
                            this.value.objects.push(...item[nameValue].objects);
                    }
                }
                else
                    this.value = input0;
            }
            else
            {
                this.value = input0;

                if (   input1
                    && nameValue != ''
                    && this.options.enabled)
                    this.value.customParams.push([nameValue, input1]);
            }
        }
        else
        {
            this.value = new NullValue();
        }


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            ['value', this.value       ],
            ['name',  name             ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.name && this.name.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.name) this.name.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.name) this.name.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.name) this.name.iterateLoop(parse);
    }
}
