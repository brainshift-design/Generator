class GNumber
{
    value;
    decimals;

    constructor(val, dec = 0)
    {
        this.value    = val;
        this.decimals = dec;
    }

    toString()
    {
        return isNaN(this.value)
            ? '?'
            : numToString(this.value, this.decimals);    
    }
}



function parseGnum(str)
{
    return str == '?'
        ? new GNumber(Number.NaN, 0)
        : new GNumber(
              parseFloat(str),
              decCount(str));
}
