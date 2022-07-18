class GSubtract
extends GOperator
{
    inputs = [];



    constructor(nodeId, active)
    {
        super(NUMBER_SUBTRACT, nodeId, active);
    }


    
    eval(parse)
    {
        if (!this.valid)
        {
            const result = new GNumber(0);


            if (this.values.length > 0)
            {
                result = this.inputs[0].eval(parse);

                for (let i = 1; i < this.inputs.length; i++)
                {
                    const input = this.inputs[i].eval(parse);
                    console.assert(input.type == NUMBER_VALUE);
                        
                    this.result.value  -= val.value;
                    this.result.decimals = Math.max(this.result.decimals, input.decimals);
                }
            }


            genPushUpdateParamValue(parse, this.nodeId, 'value', this.result);


            this.valid        = true;
            this.result.valid = true;
        }


        return result;
    }
}
