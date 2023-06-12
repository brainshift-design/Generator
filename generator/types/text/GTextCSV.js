class GTextCSV
extends GOperator
{
    input;

    value;
    separator;



    constructor(nodeId, options)
    {
        super(TEXT_CSV, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCSV(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input    ) copy.input     = this.input    .copy();
        if (this.value    ) copy.value     = this.value    .copy();
        if (this.separator) copy.separator = this.separator.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const separator = (await this.separator.eval(parse)).toValue();


        this.value = new ListValue();


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            console.assert(input.type == TEXT_VALUE, 'input must be TEXT_VALUE');

            const items = input.value.split(unescapeString(separator.value));

            for (const item of items)
                this.value.items.push(new TextValue(item));
        }
    

        this.updateValues =
        [
            ['value',     this.value],
            ['separator', separator ]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input    ) this.input    .pushValueUpdates(parse);
        if (this.value    ) this.value    .pushValueUpdates(parse);
        if (this.separator) this.separator.pushValueUpdates(parse);
    }



    // toValue()
    // {
    //     return this.value.copy();
    // }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input    ) this.input    .invalidateInputs(from);
        if (this.value    ) this.value    .invalidateInputs(from);
        if (this.separator) this.separator.invalidateInputs(from);
    }
}
