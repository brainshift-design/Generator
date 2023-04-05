class NumberValue
extends GValue
{
    value;
    decimals;



    constructor(val = Number.NaN, dec = 0)
    {
        super(NUMBER_VALUE);

        if (typeof val !== 'number')
            console.assert(false, 'NumberValue(value) is ' + typeof val + ', must be a number');


        this.value    = val;
        this.decimals = dec;
    }



    static fromString(str)
    {
        return new NumberValue(
            parseFloat(str),
            decCount(str));
    }



    copy()
    {
        const copy = new NumberValue(
            this.value, 
            this.decimals);

        copy.copyBase(this);

        return copy;
    }



    equals(num)
    {
        return num
            && this.value    == num.value
            && this.decimals == num.decimals;
    }



    async eval(parse)
    {
        return this;
    }



    isValid()
    {
        return !isNaN(this.value)
            && !isNaN(this.decimals);
    }



    toInteger()
    {
        return new NumberValue(Math.round(this.value));
    }



    toNumber()
    {
        return roundTo(this.value, this.decimals);
    }



    toString()
    {
        return printNum(this.value) + ',' + printNum(this.decimals); // only NumberValue can do this, other _Values have to list all members
    }



    toSimpleString()
    {
        return !isNaN(this.value)
              ? numToString(this.value, this.decimals)
              : NAN_DISPLAY; // only NumberValue can do this, other _Values have to list all members
    }



    toDisplayString()
    {
        return printNum(this.value) 
             + (!isNaN(this.decimals)
                ? subscriptNumber(this.decimals)
                : '');
    }



    toJsCode()
    {
        return this.toSimpleString();
    }



    static NaN = Object.freeze(new NumberValue(
        Number.NaN, 
        Number.NaN));
}



const NullValue = Object.freeze(NumberValue.NaN);



function parseNumberValue(str)
{
    if (str.indexOf(',') < 0)
        console.assert(false, 'number value missing \',\'');
    
    const parts = str.split(',');

    const num = new NumberValue(
        parseNum(parts[0]),
        parseNum(parts[1]));

    return [num, 1];
}



function parseSimpleNumberValue(str)
{
    const num = 
        str == NAN_DISPLAY
        ? NumberValue.NaN
        : NumberValue.fromString(str);

    return [num, 1];
}