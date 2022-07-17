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


            for (const input of this.inputs)
            {
                const val = input.eval(parse);
                console.assert(val.type == NUMBER_VALUE);

                this.result.value   += val.value;
                this.result.decimals = Math.max(this.result.decimals, val.decimals);
            }


            genPushUpdateParamValue(parse, this.nodeId, 'value', this.result);


            this.valid        = true;
            this.result.valid = true;
        }


        return this.result;
    }
}
