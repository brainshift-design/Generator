class GAdd
extends GOperator
{
    inputs = [];



    constructor(nodeId, active)
    {
        super(NUMBER_ADD, nodeId, active);
    }


    
    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GNumberValue(0);


            for (const _input of this.inputs)
            {
                const input = _input.eval(parse);
                console.assert(input.type == NUMBER_VALUE);

                this.result.value   += input.value;
                this.result.decimals = Math.max(this.result.decimals, input.decimals);
            }


            genPushUpdateParamValue(parse, this.nodeId, 'value', this.result);


            this.result.valid = true;
            this.valid        = true;
        }


        return this.result;
    }
}
