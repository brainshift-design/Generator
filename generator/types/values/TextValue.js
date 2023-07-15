class TextValue
extends GValue
{
    value;
    initValue;



    constructor(val = '')
    {
        super(TEXT_VALUE);


        if (typeof val !== 'string')
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
        return this.value != NAN_CHAR;
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
        return new TextValue();//TextValue.NaN;
    }



    //static NaN = Object.freeze(new TextValue(NAN_CHAR));
}



function parseTextValue(str)
{
    const text = new TextValue(decodeURIComponent(str));

    return [text, 1];
}