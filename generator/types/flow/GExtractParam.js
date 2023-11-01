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
                        this.value.items.push(extractParam(input.items[i]));
                }
                else
                    this.value = input;
            }
            else
                this.value = extractParam(input, name);
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



function extractParam(input, name)
{
    let nameValue = name.value.trim();


    if (    input
        && !input[nameValue])
    {
             if (input[name.value.toUpperCase()]) nameValue = name.value.toUpperCase();
        else if (input[name.value.toLowerCase()]) nameValue = name.value.toLowerCase();
    }


    let value = null;

    if (   input
        && input[nameValue])
    {
        value = input[nameValue];//.copy();
    }
    else
    {
        const customIndex = input.customParams.findIndex(p => p[0] == nameValue);
        console.log('input.customParams =', [...input.customParams]);
        console.log('customIndex =', customIndex);

        value =
            customIndex > -1
            ? input.customParams[customIndex][1]//.copy()
            : NullValue.copy();
    }


    if (   input
        && input[nameValue]
        && input[nameValue].objects 
        && this.value.objects)
        value.objects.push(...input[nameValue].objects);


    return value;
}