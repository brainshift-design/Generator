class TextValue
extends GValue
{
    static { GNode.types[TEXT_VALUE] = this; }



    value;
    initValue;



    constructor(val = '')
    {
        super(TEXT_VALUE, 'text');


        if (   val !== null
            && typeof val !== 'string')
        {
            console.trace();
            consoleError('TextValue('+val+') is ' + typeof val + ', must be a string');
        }


        this.value     = val;
        this.initValue = val;

        // this.updateValues = [];
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
        return this.copy();
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



    toJsonText(options = {})
    {
        let json = '';

        json += '"' + unescapeString(this.toPreviewString()) + '"';

        options.lastExpanded = false;
        
        return json;
    }



    toValue()
    {
        return this.value;
    }



    toString()
    {
        return this.value;
    }



    toPreviewString()
    {
        const lines = this.value.split('\n');

        let str = '';

        for (let i = 0; i < Math.min(lines.length, 10); i++)
        {
            if (i > 0)
                str += '\n';

            str += lines[i];
        }

        if (lines.length > 10)
            str += '\n. . .';
        
        return str;
    }



    toDisplayString()
    {
        return '\'' 
             + this.value.replaceAll('\n', '↵')
             + '\'';
    }



    static NaN()
    {
        return new TextValue();
    }



    static parseRequest(parse)
    {
        parse.pos++; // tag
    
        const val = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(TEXT_VALUE, val, parse);
    
        return TextValue.parse(val)[0];
    }



    static parse(str)
    {
        const text = new TextValue(decodeURIComponent(str));

        return [text, 1];
    }
}