class GNumberValue
extends GType
{
    value;
    decimals;



    constructor(val, dec = 0)
    {
        super(NUMBER_VALUE);

        this.value    = val;
        this.decimals = dec;

        this.result   = this;
        this.valid    = true;
    }



    copy()
    {
        return new GNumberValue(
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
        return this;//return this.result = this.copy();
    }



    toString()
    {
        return isNaN(this.value)
            ? INVALID
            : numToString(this.value, this.decimals);    
    }



    static NaN = Object.freeze(new GNumberValue(
        Number.NaN, 
        Number.NaN));
}



function parseGNumberValue(str)
{
    return str == INVALID
        ? new GNumberValue(Number.NaN, 0)
        : new GNumberValue(
              parseFloat(str),
              decCount(str));
}
