class GExtractParam
extends GOperator1
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


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;
        const name  = this.name  ? (await this.name .eval(parse)).toValue() : null;


        if (   input
            && name
            && name.value.trim() != '')
        {
            if (isListType(input.type))
            {
                this.value = new ListValue();

                if (this.options.enabled)
                {
                    for (let i = 0; i < input.items.length; i++)
                    {
                        const item = input.items[i];
                        

                        let nameValue = name.value;
                        
                        if (    item
                            && !item[name.value])
                        {
                                 if (item[name.value.toUpperCase()]) nameValue = name.value.toUpperCase();
                            else if (item[name.value.toLowerCase()]) nameValue = name.value.toLowerCase();
                        }


                        this.value.items.push(
                               item 
                            && item[nameValue]
                            ? item[nameValue].copy() 
                            : NullValue.copy());
                        
                        if (   item
                            && item[nameValue]
                            && item[nameValue].objects 
                            && this.value.objects)
                            this.value.objects.push(...item[nameValue].objects);
                    }
                }
                else
                    this.value = input;
            }
            else
            {
                let nameValue = name.value;
                
                if (    input
                    && !input[name.value])
                {
                         if (input[name.value.toUpperCase()]) nameValue = name.value.toUpperCase();
                    else if (input[name.value.toLowerCase()]) nameValue = name.value.toLowerCase();
                }

                
                this.value = 
                    this.input[nameValue]
                    ? this.input[nameValue].toValue()//copy()
                    : NullValue.copy();
            }
        }
        else
        {
            this.value = NullValue.copy();
        }


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            // ['preview', isListType(this.value) 
            //             ? new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11))) 
            //             : this.value     ],
            ['type',    this.outputType()],
            ['name',    name             ]
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
