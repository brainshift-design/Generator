class GTextSplit
extends GOperator1
{
    separator;



    constructor(nodeId, options)
    {
        super(TEXT_SPLIT, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.separator = null;
    }


   
    copy()
    {
        const copy = new GTextSplit(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.separator) copy.separator = this.separator.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input     = await evalTextOrListValue(this.input,     parse);
        const separator = await evalTextValue      (this.separator, parse);


        this.value = new ListValue();


        if (   input
            && separator)
        {
            if (isListValueType(input.type))
            {
                for (const item of input.items)
                {
                    const itemList = new ListValue(
                        item.value
                            .split(unescapeString(separator.value))
                            .map(s => new TextValue(s)));

                    this.value.items.push(itemList);
                }
            }
            else
            {
                consoleAssert(input.type == TEXT_VALUE, 'input must be TEXT_VALUE');

                this.value.items = input.value
                    .split(unescapeString(separator.value))
                    .map(s => new TextValue(s));
            }
        }


        this.setUpdateValues(parse,
        [
            ['type',      this.outputType()],
            ['separator', separator        ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.separator && this.separator.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.separator) this.separator.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.separator) this.separator.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.separator) this.separator.iterateLoop(parse);
    }
}
