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

            const items = input.value.split(separator.value);

            for (const item of items)
                this.value.items.push(new TextValue(item));
        }
    

        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'value',     this.value);
            genPushUpdateValue(parse, this.nodeId, 'separator', separator);
        }
        

        this.validate();

        return this;
    }



    // toValue()
    // {
    //     return this.value.copy();
    // }



    invalidate()
    {
        super.invalidate();

        if (this.input    ) this.input    .invalidate();
        if (this.value    ) this.value    .invalidate();
        if (this.separator) this.separator.invalidate();
    }
}
