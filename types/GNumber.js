class GNumber
extends GOperator
{
    value;
    decimals;



    constructor(nodeId, val, dec = 0)
    {
        super(NUMBER, nodeId);

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
        if (this.valid)
            return this.value;


        this.value = this;
        
        genPushUpdateParamValue(parse, this.nodeId, 'value', this.value);

        
        this.valid = true;
        return this.value;
    }



    toString()
    {
        return isNaN(this.value)
            ? '?'
            : numToString(this.value, this.decimals);    
    }
}



function parseGnum(str, nodeId = '')
{
    return str == '?'
        ? new GNumber(nodeId, Number.NaN, 0)
        : new GNumber(
              nodeId,
              parseFloat(str),
              decCount(str));
}
