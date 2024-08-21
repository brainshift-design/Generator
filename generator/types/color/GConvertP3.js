class GConvertP3
extends GOperator1
{
    from = null;



    constructor(nodeId, options)
    {
        super(COLOR_CONVERT_P3, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.from = null;
    }



    copy()
    {
        const copy = new GConvertP3(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.from ) copy.from  = this.from .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalColorValue (this.input, parse);
        let   from  = await evalNumberValue(this.from,  parse);

        if (from) from = from.toInteger();
        

        if (input)
        {
            if (this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                        this.value.items.push(await getConvertP3Value(input.items[i], from));
                }
                else
                    this.value = await getConvertP3Value(input, from);
            }
            else
                this.value = input.copy();
        }
        else
            this.value = ColorValue.NaN.copy();


        
        this.setUpdateValues(parse,
        [
            ['value',   this.value       ],
            ['type',    this.outputType()],
            ['quality', from             ]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.from && this.from.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from) this.from.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.from) this.from.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from) this.from.iterateLoop(parse);
    }
}



function getConvertP3Value(input, from)
{
    return ColorValue.fromRgb(
        from.value == 0
        ? scaleRgb(rgb2p3(input.toRgb()))
        : scaleRgb(p32rgb(input.toRgb())));
}