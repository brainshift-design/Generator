class GModulo
extends GOperator
{
    inputs = [];



    constructor(nodeId, active)
    {
        super(NUMBER_MODULO, nodeId, active);
    }


    
    copy()
    {
        const mod = new GModulo(this.nodeId, this.active);
        add.inputs = this.inputs.map(i => i.copy());
        return mod;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new NumberValue(0);

            
            if (this.inputs.length > 0)
            {
                this.result = this.inputs[0].eval(parse).copy();


                for (let i = 1; i < this.inputs.length; i++)
                {
                    const input = this.inputs[i].eval(parse).copy();

                    if (input.value == 0) 
                    { 
                        this.result.value    = Number.NaN; 
                        this.result.decimals = 0;
                        break; 
                    }

                    this.result.decimals = Math.max(this.result.decimals, input.decimals);
                    this.result.value    = floorTo(this.result.value % input.value, this.result.decimals);
                }
            }


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'value', this.result);
        }


        return this.result;
    }
}
