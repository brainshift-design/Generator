class GNumber
extends GOperator
{
    value;



    constructor(nodeId, value)
    {
        super(NUMBER, nodeId);

        this.value = value;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.value = this.value.eval(parse);
            this.valid = true;
        }
        
        genPushUpdateParamValue(parse, this.nodeId, 'value', this.value);

        return this.value;
    }
}