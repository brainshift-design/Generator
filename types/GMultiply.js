class GMultiply
extends GOperator
{
    inputs = [];



    constructor(nodeId, active)
    {
        super(NUMBER_MULTIPLY, nodeId, active);
    }


    
    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GNumberValue(0);


            if (this.inputs.length > 0)
            {
                this.result.value = 1;

                for (const _input of this.inputs)
                {
                    const input = _input.eval(parse);

                    this.result.value   *= input.value;
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
