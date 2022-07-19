class GLimits
extends GOperator
{
    input = null;

    min;
    max;

    minMaxPriority = -1; 


    constructor(nodeId, active)
    {
        super(NUMBER_LIMITS, nodeId, active);
    }


    
    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GNumberValue(0);


            if (this.input)
                this.result = this.input.eval(parse);


            const min = this.min.eval(parse);
            const max = this.max.eval(parse);


            this.valid        = true;
            this.result.valid = true;


            // min.value = Math.min(min.value, max.value);
            // max.value = Math.max(min.value, max.value);


            this.result.value = Math.min(Math.max(
                min.value,
                this.result.value),
                max.value);


            genPushUpdateParamValue(parse, this.nodeId, 'value', this.result);
            genPushUpdateParamValue(parse, this.nodeId, 'min',   min);
            genPushUpdateParamValue(parse, this.nodeId, 'max',   max);
        }


        return this.result;
    }
}
