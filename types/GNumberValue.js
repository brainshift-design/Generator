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



    eval(parse)
    {
        return this.result = this;
    }



    toString()
    {
        return isNaN(this.value)
            ? '?'
            : numToString(this.value, this.decimals);    
    }
}



function parseGNumberValue(str)
{
    return str == '?'
        ? new GNumberValue(Number.NaN, 0)
        : new GNumberValue(
              parseFloat(str),
              decCount(str));
}
