class GLimits
extends GNumberType
{
    input = null;

    min;
    max;

    minMaxPriority = -1; 


    constructor(nodeId, options)
    {
        super(NUMBER_LIMITS, nodeId, options);
    }


    
    eval(parse)
    {
        if (this.valid)
            return;


        this.value = new NumberValue(0);


        if (this.input)
        {
            this.input.eval(parse);
            this.value = this.input.toValue();
        }


        this.min.eval(parse);
        this.max.eval(parse);

        const min = this.min.toValue();
        const max = this.max.toValue();


        this.value.value = Math.min(Math.max(
            min.value,
            this.value.value),
            max.value);


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);
        genPushUpdateValue(parse, this.nodeId, 'min',   min);
        genPushUpdateValue(parse, this.nodeId, 'max',   max);


        this.valid = true;
    }
}
