class GSetParam
extends GOperator2
{
    name = null;


    
    constructor(nodeId, options)
    {
        super(EXTRACT_PARAM, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.name  = null;
    }



    copy()
    {
        const copy = new GExtractParam(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.name) copy.name = this.name.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = this.input0 ? (await this.input0.eval(parse)).toValue() : null;
        const input1 = this.input1 ? (await this.input1.eval(parse)).toValue() : null;

        const name   = this.name  ? (await this.name .eval(parse)).toValue() : null;


        if (   input0
            && name)
        {
            let nameValue = name.value.trim();


            if (isListType(input0.type))
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
            this.value = NullValue.copy();
        }


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()],
            ['name', name             ]
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
