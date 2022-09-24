class GLimits
extends GOperator
{
    input = null;

    min;
    max;

    minMaxPriority = -1; 


    constructor(nodeId, options)
    {
        super(NUMBER_LIMITS, nodeId, options);
    }


    
    copy()
    {
        const lim = new GLimits(this.nodeId, this.options);

        if (this.input) 
            lim.input = this.input.copy();

        lim.min = this.min.copy();
        lim.max = this.max.copy();

        lim.minMaxPriority = this.minMaxPriority;

        return lim;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new NumberValue(0);


            if (this.input)
                this.result = this.input.eval(parse).copy();


            const min = this.min.eval(parse).copy();
            const max = this.max.eval(parse).copy();


            // min.value = Math.min(min.value, max.value);
            // max.value = Math.max(min.value, max.value);


            this.result.value = Math.min(Math.max(
                min.value,
                this.result.value),
                max.value);


            this.valid        = true;
            this.result.valid = true;


            genPushUpdateValue(parse, this.nodeId, 'min',   min);
            genPushUpdateValue(parse, this.nodeId, 'max',   max);
            genPushUpdateValue(parse, this.nodeId, 'value', this.result);
        }


        return this.result;
    }
}
