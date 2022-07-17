class GDivide
extends GOperator
{
    values;



    constructor(nodeId, values = [])
    {
        super(NUMBER_DIVIDE, nodeId);
        
        this.values = values;
    }


    
    eval(parse)
    {
        const result = new GNumber(0);

        
        if (this.values.length > 0)
        {
            result = this.values[0].eval(parse);


            for (let i = 1; i < this.values.length; i++)
            {
                const val = this.values[i].eval(parse);

                if (val.value == 0) 
                { 
                    result.result    = Number.NaN; 
                    result.decimals = 0;
                    break; 
                }

                result.decimals = Math.max(result.decimals, val.decimals);
                result.result    = floorTo(result.result / val.value, result.decimals);
            }


            genPushUpdateParamValue(parse, this.nodeId, 'value', result);
        }


        return result;
    }
}
