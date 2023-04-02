class TextValue
extends GValue
{
    value;



    constructor(val = '')
    {
        super(TEXT_VALUE);

        if (typeof val !== 'string')
        {
            console.trace();
            console.assert(false, 'TextValue(value) is ' + typeof val + ', must be a string');
        }

        this.value = val;
    }



    copy()
    {
        const copy = new TextValue(this.value);

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



    isValid()
    {
        return this.value != NAN_CHAR;
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
             + this.value 
                   .replaceAll('\n', '↵')
             + '\'';
    }



    static NaN = Object.freeze(new TextValue(NAN_CHAR));
}



function parseTextValue(str)
{
    //console.log('str =', str);
    const text = new TextValue(decodeURIComponent(str));

    return [text, 1];
}