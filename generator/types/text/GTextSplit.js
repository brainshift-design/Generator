class GTextSplit
extends GOperator1
{
    value;
    separator;



    constructor(nodeId, options)
    {
        super(TEXT_SPLIT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextSplit(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value    ) copy.value     = this.value    .copy();
        if (this.separator) copy.separator = this.separator.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const separator = this.separator ? (await this.separator.eval(parse)).toValue() : null;


        this.value = new ListValue();


        if (   this.input
            && separator)
        {
            const input = (await this.input.eval(parse)).toValue();
            
            if (   input
                && input.value)
            {
                consoleAssert(input.type == TEXT_VALUE, 'input must be TEXT_VALUE');
                const items = input.value.split(unescapeString(separator.value));

                for (const item of items)
                    this.value.items.push(new TextValue(item));
            }
        }
    

        this.setUpdateValues(parse,
        [
            ['value',     this.value],
            ['separator', separator ]
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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.separator) this.separator.invalidateInputs(from);
    }
}
