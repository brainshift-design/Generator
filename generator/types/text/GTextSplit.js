class GTextSplit
extends GOperator1
{
    parts;
    separator;



    constructor(nodeId, options)
    {
        super(TEXT_SPLIT, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.parts     = null;
        this.separator = null;
    }


   
    copy()
    {
        const copy = new GTextSplit(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.parts    ) copy.parts     = this.parts    .copy();
        if (this.separator) copy.separator = this.separator.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const separator = this.separator ? (await this.separator.eval(parse)).toValue() : null;


        this.parts = new ListValue();


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
                    this.parts.items.push(new TextValue(item));
            }
        }
    

        this.setUpdateValues(parse,
        [
            ['length',    new NumberValue(this.parts.items.length)],
            ['separator', separator                               ]
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
