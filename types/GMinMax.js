class GMinMax
extends GOperator
{
    input = null;

    min;
    max;


    constructor(nodeId, active)
    {
        super(NUMBER_MINMAX, nodeId, active);
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

            this.result.value = Math.min(Math.max(
                min.value,
                this.result.value),
                max.value);


            this.valid        = true;
            this.result.valid = true;


            genPushUpdateParamValue(parse, this.nodeId, 'value', this.result);
            genPushUpdateParamValue(parse, this.nodeId, 'min',   min);
            genPushUpdateParamValue(parse, this.nodeId, 'max',   max);
        }


        return this.result;
    }
}
