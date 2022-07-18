class GExponent
extends GOperator
{
    inputs = [];



    constructor(nodeId, active)
    {
        super(NUMBER_EXPONENT, nodeId, active);
    }


    
    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GNumberValue(0);


            if (this.inputs.length > 0)
            {
                this.result = this.inputs[0].eval(parse);

                for (let i = 1; i < this.inputs.length; i++)
                {
                    const input = this.inputs[i].eval(parse);
                    console.assert(input.type == NUMBER_VALUE);
                        
                    this.result.value    = Math.pow(this.result.value, input.value);
                    this.result.decimals = Math.max(this.result.decimals, input.decimals);
                }
            }


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateParamValue(parse, this.nodeId, 'value', this.result);
        }


        return this.result;
    }
}
