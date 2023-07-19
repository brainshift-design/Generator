class TextValue
extends GValue
{
    value;
    initValue;



    constructor(val = '')
    {
        super(TEXT_VALUE);


        if (   val !== null
            && typeof val !== 'string')
        {
            console.trace();
            consoleError('TextValue(value) is ' + typeof val + ', must be a string');
        }

        
        this.value     = val;
        this.initValue = val;
    }



    copy()
    {
        const copy = new TextValue(this.value);

        copy.initValue = this.initValue;
        
        copy.copyBase(this);

        return copy;
    }



    equals(text)
    {
        return text
            && this.value == text.value;
    }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        this.value == this.initValue;
    }



    isValid()
    {
        return this.value !== null;
    }



    toJson()
    {
        return encodeURIComponent(this.value);
    }



    toString()
    {
        return this.value;
    }



    toSimpleString()
    {
        return this.value;
    }



    toDisplayString()
    {
        return '\'' 
             + this.value.replaceAll('\n', '↵')
             + '\'';
    }



    getNaN()
    {
        return TextValue.NaN;
    }



    static NaN = Object.freeze(new TextValue(null));
}



function parseTextValue(str)
{
    const text = new TextValue(decodeURIComponent(str));

    return [text, 1];
}