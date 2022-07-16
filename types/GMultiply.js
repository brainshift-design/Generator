class GMultiply
extends GOperator
{
    values;



    constructor(nodeId, values = [])
    {
        super(NUMBER_MULTIPLY, nodeId);
        
        this.values = values;
    }


    
    eval(parse)
    {
        const result = new GNumber(0);

        
        if (this.values.length > 0)
        {
            result.value = 1;


            for (const _val of this.values)
            {
                const val = _val.value.eval(parse);

                result.value   *= val.value;
                result.decimals = Math.max(result.decimals, val.decimals);
            }


            genPushUpdateParamValue(parse, this.nodeId, 'value', result);
        }


        return result;
    }
}
