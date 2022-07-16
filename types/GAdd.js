class GAdd
extends GOperator
{
    values;



    constructor(nodeId, values = [])
    {
        super(NUMBER_ADD, nodeId);
        
        this.values = values;
    }


    
    eval(parse)
    {
        if (this.valid)
            return this.value;


        this.value = new GNumber(0);


        for (const _val of this.values)
        {
            const val = _val.value.eval();

            this.value.value   += val.value;
            this.value.decimals = Math.max(result.decimals, val.decimals);
        }


        genPushUpdateParamValue(parse, this.nodeId, 'value', this.value);

        this.valid = true;
        return this.value;
    }
}
