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
    }



    get valid()
    {
        return !isNaN(this.value)
            && !isNaN(this.decimals);
    }



    eval(parse)
    {
        return this;
    }



    toString()
    {
        return isNaN(this.value)
            ? '?'
            : numToString(this.value, this.decimals);    
    }
}



function parseGnumVal(str, nodeId = '')
{
    return str == '?'
        ? new GNumberValue(nodeId, Number.NaN, 0)
        : new GNumberValue(
              nodeId,
              parseFloat(str),
              decCount(str));
}
