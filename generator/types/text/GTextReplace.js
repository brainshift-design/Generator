class GTextReplace
extends GOperator1
{
    what;
    with;
    regex;



    constructor(nodeId, options)
    {
        super(TEXT_REPLACE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextReplace(this.nodeId, this.options);

        copy.copyBase(this);

        copy.what  = this.what .copy();
        copy.with  = this.with .copy();
        copy.regex = this.regex.copy();

        copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const _what  = (await this.what .eval(parse)).toValue();
        const _with  = (await this.with .eval(parse)).toValue();
        const _regex = (await this.regex.eval(parse)).toValue();


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
            
            if (isListType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? getReplaceValue(item, _what, _with, _regex)
                        : new TextValue());   
                }
            }
            else
            {
                this.value = getReplaceValue(input, _what, _with, _regex);
            }
        }
        else
            this.value = new TextValue();


        const type = 
            this.value
            ? new TextValue(
                isListType(this.value.type)
                ? finalListTypeFromItems(this.value.items)
                : this.value.type)
            : TextValue.NaN.copy();

            
        this.setUpdateValues(parse,
        [
            ['value',  this.value],
            ['type',   type      ],
            ['what',  _what      ],
            ['with',  _with      ],
            ['regex', _regex     ]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.what  && this.what .isValid()
            && this.with  && this.with .isValid()
            && this.regex && this.regex.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.what ) this.what .pushValueUpdates(parse);
        if (this.with ) this.with .pushValueUpdates(parse);
        if (this.regex) this.regex.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.what ) this.what .invalidateInputs(parse, from);
        if (this.with ) this.with .invalidateInputs(parse, from);
        if (this.regex) this.regex.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.what ) this.what .iterateLoop(parse);
        if (this.with ) this.with .iterateLoop(parse);
        if (this.regex) this.regex.iterateLoop(parse);
    }
}



function getReplaceValue(input, _what, _with, _regex)
{
    consoleAssert(input.type == TEXT_VALUE, 'input.type must be TEXT_VALUE');

    const value = new TextValue();

    if (_regex.value > 0)
    {
        try
        {
            const regex = new RegExp(_what.value, 'g');

            value.value = input.value.replace(
                regex,
                _with.value);
        }
        catch (e)
        {
        
        }
    }
    else
    {
        value.value = input.value.replaceAll(
            unescapeString(_what.value),
            unescapeString(_with.value));
    }

    return value;
}