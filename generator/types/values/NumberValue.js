class NumberValue
extends GValue
{
    value;
    initValue;
    decimals;

    isBoolean;
    
    suffix = '';
    ranges = []; // can be either objects or string IDs into a range dictionary



    constructor(val = Number.NaN, dec = -1, isBoolean = false, suffix = '', ranges = [])
    {
        super(NUMBER_VALUE, 'number');


        if (typeof val !== 'number')
            consoleError('NumberValue(value) is ' + typeof val + ', must be a number');
        

        this.value     = val;
        this.initValue = val;
        
        this.decimals = 
              !isNaN(this.value) 
            && dec == -1 
            ? decDigits(this.value) 
            : dec;

        this.isBoolean = isBoolean;

        this.suffix = suffix;
        this.ranges = ranges;
    }



    static fromString(str)
    {
             if (str === 'true' ) return new BooleanValue(true );
        else if (str === 'false') return new BooleanValue(false);

        else
            return new NumberValue(
                parseFloat(str),
                decCount(str));
    }



    copy()
    {
        const copy = new NumberValue(
            this.value, 
            this.decimals,
            this.isBoolean);

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



    // getMaxDecimals()
    // {
    //     return this.decimals;
    // }



    async eval(parse)
    {
        return this.copy();
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



    toValue()
    {
        return this.toNumber();//this.value;
    }



    toNumber()
    {
        return roundTo(this.value, this.decimals);
    }



    toString()
    {
        if (this.isBoolean)
            return this.value > 0 ? 'true' : 'false';
    
        else
            return printNum(this.value) 
                 + ',' 
                 + printNum(this.decimals);
    }



    toPreviewString()
    {
        if (this.isBoolean)
            return this.value > 0 ? 'true' : 'false';
    
        else
            return this.isValid()
                ? numToString(this.value, this.decimals)
                : NAN_DISPLAY;
    }



    toDisplayString()
    {
        if (this.isBoolean)
            return this.value > 0 ? 'true' : 'false';
    
        else
            return printNum(this.value) 
                + (!isNaN(this.decimals)
                    ? '_' + this.decimals //subscriptNumber(this.decimals)
                    : '');
    }



    toJsCode(gen)
    {
        return this.toPreviewString();
    }



    static NaN()
    {
        return new NumberValue(
            Number.NaN, 
            Number.NaN);
    }
}
