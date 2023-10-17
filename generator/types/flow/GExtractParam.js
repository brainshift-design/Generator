class GExtractParam
extends GOperator1
{
    param = null;


    
    constructor(nodeId, options)
    {
        super(EXTRACT_PARAM, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.param  = null;
    }



    copy()
    {
        const copy = new GExtractParam(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.param) copy.param = this.param.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const param = this.param ? (await this.param.eval(parse)).toValue() : null;


        if (   this.input
            && param
            && param.value != '')
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
                            && item[param.value]
                            ? item[param.value].copy() 
                            : NullValue.copy());
                        
                        if (   item
                            && item[param.value]
                            && item[param.value].objects 
                            && this.value.objects)
                            this.value.objects.push(...item[param.value].objects);
                    }
                }
                else
                    this.value = input;
            }
            else
            {
                this.value = 
                    input[param.value]
                    ? input[param.value].copy()
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
            ['preview', isListType(this.value) ? new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11))) : this.value],
            ['type',    this.outputType()                                                          ],
            ['param',   param                                                                        ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.param && this.param.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.param) this.param.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.param) this.param.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.param) this.param.iterateLoop(parse);
    }
}
