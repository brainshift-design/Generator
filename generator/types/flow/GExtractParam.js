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


        const name = this.name ? (await this.name.eval(parse)).toValue() : null;


        if (   this.input
            && name
            && name.value != '')
        {
            const input = (await this.input.eval(parse)).toValue();


            if (isListType(input.type))
            {
                this.value = new ListValue();

                if (this.options.enabled)
                {
                    for (let i = 0; i < input.items.length; i++)
                    {
                        const item = input.items[i];
                        
                        this.value.items.push(
                               item 
                            && item[name.value]
                            ? item[name.value].copy() 
                            : NullValue.copy());
                        
                        if (   item
                            && item[name.value]
                            && item[name.value].objects 
                            && this.value.objects)
                            this.value.objects.push(...item[name.value].objects);
                    }
                }
                else
                    this.value = input;
            }
            else
            {
                this.value = 
                    input[name.value]
                    ? input[name.value].copy()
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
