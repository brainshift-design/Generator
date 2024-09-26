class GTextUnescape
extends GOperator1
{
    method;



    constructor(nodeId, options)
    {
        super(TEXT_UNESCAPE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.method = null;
    }



    copy()
    {
        const copy = new GTextUnescape(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.method) copy.method = this.method.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input  = await evalTextOrListValue(this.input,  parse);
        const method = await evalNumberValue    (this.method, parse);


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
                            ? getTextUnescapeValue(item, method)
                            : new TextValue());   
                    }
                }
                else
                {
                    this.value = getTextUnescapeValue(input, method);
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new TextValue();


        this.setUpdateValues(parse,
        [
            ['type',   this.outputType()],
            ['invert', method           ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.method && this.method.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.method) this.method.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.method) this.method.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.method) this.method.iterateLoop(parse);
    }
}



function getTextUnescapeValue(input, method)
{
    consoleAssert(input.type == TEXT_VALUE, 'input.type must be TEXT_VALUE');

    switch (method.value)
    {
        case 0: return new TextValue(unescapeString    (input.value));
        case 1: return new TextValue(encodeURIComponent(input.value));
    }

    consoleAssert(false, 'invalid escape method');
    return input;
}