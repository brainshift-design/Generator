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
}



function parseGnumVal(str)
{
    return str == '?'
        ? new GNumberValue(Number.NaN, 0)
        : new GNumberValue(
              parseFloat(str),
              decCount(str));
}
