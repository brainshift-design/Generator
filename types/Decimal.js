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
        return numToString(this.num, this.dec);    
    }
}



function parseDec(str)
{
    return new Decimal(
        parseFloat(str),
        decCount(str));
}
