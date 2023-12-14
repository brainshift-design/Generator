class GTextReplace
extends GOperator1
{
    what  = null;
    with  = null;
    regex = null;



    constructor(nodeId, options)
    {
        super(TEXT_REPLACE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.what  = null;
        this.with  = null;
        this.regex = null;
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


        const  input = this.input ? (await this.input.eval(parse)).toValue() : null;
        const _what  = this.what  ? (await this.what .eval(parse)).toValue() : null;
        const _with  = this.with  ? (await this.with .eval(parse)).toValue() : null;
        const _regex = this.regex ? (await this.regex.eval(parse)).toValue() : null;


        if (input)
        {
            if (this.options.enabled)
            {
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
                this.value = input;
        }
        else
            this.value = new TextValue();


        this.setUpdateValues(parse,
        [
            //['value',  this.value       ],
            ['type',   this.outputType()],
            ['what',  _what             ],
            ['with',  _with             ],
            ['regex', _regex            ]
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



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.what ) this.what .invalidateInputs(parse, from, force);
        if (this.with ) this.with .invalidateInputs(parse, from, force);
        if (this.regex) this.regex.invalidateInputs(parse, from, force);
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
            value.value = input.value.replace(
                new RegExp(unescapeRegexPattern(_what.value), 'gu'),
                unescapeRegexReplacement(_with.value));

            // value.value = input.value.replaceAll(
            //     new RegExp(_what.value, 'g'),
            //     match => 
            //     {
            //         return match
            //             .split('')
            //             .map(function(c) 
            //             {
            //                 return c >= '\uD800' 
            //                     && c <= '\uDBFF'
            //                     ? c
            //                     : unescapeString(_with.value);
            //             }).join('');
            //     });
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