class NumberValue
extends GValue
{
    value;
    initValue;
    decimals;



    constructor(val = Number.NaN, dec = -1)
    {
        super(NUMBER_VALUE);

        if (typeof val !== 'number')
            consoleError('NumberValue(value) is ' + typeof val + ', must be a number');


        this.value     = val;
        this.initValue = val;
        
        this.decimals = 
              !isNaN(this.value) 
            && dec == -1 
            ? decDigits(this.value) 
            : dec;
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

        copy.initValue = this.initValue;

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



    hasInitValue()
    {
        return this.value == this.initValue;
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
        return printNum(this.value) + ',' + printNum(this.decimals);
    }



    toPreviewString()
    {
        return this.isValid()
             ? numToString(this.value, this.decimals)
             : NAN_DISPLAY;
    }



    toDisplayString()
    {
        return printNum(this.value) 
             + (!isNaN(this.decimals)
                ? subscriptNumber(this.decimals)
                : '');
    }



    toJsCode(gen)
    {
        return this.toPreviewString();
    }



    getNaN()
    {
        return NumberValue.NaN;
    }



    static NaN = Object.freeze(new NumberValue(
        Number.NaN, 
        Number.NaN));
}



const NullValue = Object.freeze(NumberValue.NaN);



function parseNumberValue(str)
{
    if (str.indexOf(',') < 0)
    {
        console.trace();
        consoleError('number value \'' + str + '\' missing \',\'');
    }

    
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