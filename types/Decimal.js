class Decimal
{
    num;
    dec;

    constructor(num, dec)
    {
        this.num = num;
        this.dec = dec;
    }

    toString()
    {
        return isNaN(this.num)
            ? '?'
            : numToString(this.num, this.dec);    
    }
}



function parseDec(str)
{
    return str == '?'
        ? new Decimal(Number.NaN, 0)
        : new Decimal(
              parseFloat(str),
              decCount(str));
}
