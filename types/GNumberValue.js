class GNumberValue
extends GType
{
    decimals;



    get value()    { return this.result; }
    set value(val) { this.result = val;  }



    constructor(val, dec = 0)
{
        super(NUMBER_VALUE);

        this.result   = val;
        this.decimals = dec;

        this.valid    = true;
    }



    isValid()
    {
        return !isNaN(this.result)
            && !isNaN(this.decimals);
    }



    eval(parse)
    {
        return this;
    }



    toString()
    {
        return isNaN(this.result)
            ? '?'
            : numToString(this.result, this.decimals);    
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
