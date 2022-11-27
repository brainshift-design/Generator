class NumberValue
extends GValue
{
    value;
    decimals;



    constructor(val, dec = 0)
    {
        super(NUMBER_VALUE);

        if (typeof val !== 'number')
            console.assert(false, 'NumberValue(value) is ' + typeof val + ', must be a number');


        this.value    = val;
        this.decimals = dec;
    }



    copy()
    {
        const val = new NumberValue(
            this.value, 
            this.decimals);

        val.copyBase(this);

        return val;
    }



    equals(num)
    {
        return num
            && this.value    == num.value
            && this.decimals == num.decimals;
    }



    eval(parse)
    {
        return this;
    }



    isValid()
    {
        return !isNaN(this.value)
            && !isNaN(this.decimals);
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
              : NAN_CHAR; // only NumberValue can do this, other _Values have to list all members
    }



    toDisplayString()
    {
        return printNum(this.value) 
             + (!isNaN(this.decimals)
                ? subscriptNumber(this.decimals)
                : '');
    }



    static NaN = Object.freeze(new NumberValue(
        Number.NaN, 
        Number.NaN));
}



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
        str == NAN_CHAR
        ? NumberValue.NaN
        : new NumberValue(
              parseFloat(str),
              decCount(str));

    return [num, 1];
}