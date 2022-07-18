class GModulo
extends GOperator
{
    inputs = [];



    constructor(nodeId, active)
    {
        super(NUMBER_MODULO, nodeId, active);
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

                    if (input.value == 0) 
                    { 
                        this.result.value    = Number.NaN; 
                        this.result.decimals = 0;
                        break; 
                    }

                    this.result.decimals = Math.max(this.result.decimals, input.decimals);
                    this.result.value    = floorTo(this.result.result % input.value, this.result.decimals);
                }
            }


            genPushUpdateParamValue(parse, this.nodeId, 'value', this.result);


            this.result.valid = true;
            this.valid        = true;
        }


        return this.result;
    }
}
