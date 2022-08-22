class NumberValue
extends GType
{
    value;
    decimals;



    constructor(val, dec = 0)
    {
        super(NUMBER_VALUE);

        if (typeof val !== 'number')
        { 
            console.trace();
            console.assert(false, 'NumberValue.value must be a number');
        }


        this.value    = val;
        this.decimals = dec;

        this.result   = null;
        this.valid    = true;
    }



    copy()
    {
        return new NumberValue(
            this.value, 
            this.decimals);
    }



    isValid()
    {
        return !isNaN(this.value)
            && !isNaN(this.decimals);
    }



    equals(num)
    {
        return this.value    == num.value
            && this.decimals == num.decimals;
    }



    eval(parse)
    {
        return this;
    }



    toString()
    {
        return !isNaN(this.value)
            ? numToString(this.value, this.decimals)
            : INVALID;
    }



    static NaN = Object.freeze(new NumberValue(
        Number.NaN, 
        Number.NaN));
}



function parseNumberValue(str)
{
    const num = 
        str == INVALID
        ? new NumberValue(Number.NaN, 0)
        : new NumberValue(
              parseFloat(str),
              decCount(str));

    return [num, 1];
}
