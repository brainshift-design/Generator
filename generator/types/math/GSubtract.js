class GSubtract
extends GArithmetic
{
    constructor(nodeId, options)
    {
        super(NUMBER_SUBTRACT, nodeId, options);
    }


    
    eval(parse)
    {
        if (this.valid)
            return;


        this.value = new NumberValue(0);


        if (this.inputs.length > 0)
        {
            this.inputs[0].eval(parse);
            const val0 = this.inputs[0].toValue();

            this.value.value    = val0.value;
            this.value.decimals = val0.decimals;


            for (let i = 1; i < this.inputs.length; i++)
            {
                this.inputs[i].eval(parse);
                const val = this.inputs[i].toValue();

                console.assert(
                    val.type == NUMBER_VALUE, 
                    'val.type must be NUMBER_VALUE');
                    
                this.value.value   -= val.value;
                this.value.decimals = Math.max(this.value.decimals, val.decimals);
            }
        }


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.valid = true;
    }
}
