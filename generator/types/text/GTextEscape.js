class GTextEscape
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(TEXT_ESCAPE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextEscape(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalTextOrListValue(this.input, parse);


        if (input)
        {
            if (this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                    {
                        const item = input.items[i];

                        this.value.items.push(
                            item.type == TEXT_VALUE
                            ? getTextEscapeValue(item)
                            : new TextValue());   
                    }
                }
                else
                {
                    this.value = getTextEscapeValue(input);
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new TextValue();


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }
}



function getTextEscapeValue(input)
{
    consoleAssert(input.type == TEXT_VALUE, 'input.type must be TEXT_VALUE');

    return new TextValue(unescapeString(input.value));
}