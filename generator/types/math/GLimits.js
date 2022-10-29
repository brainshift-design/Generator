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


    
    copy()
    {
        const lim = new GLimits(this.nodeId, this.options);

        lim.copyBase(this);

        if (this.input) 
            lim.input = this.input.copy();

        lim.min = this.min.copy();
        lim.max = this.max.copy();

        lim.minMaxPriority = this.minMaxPriority;

        return lim;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        this.value = new NumberValue(0);


        if (this.input)
        {
            this.input = this.input.eval(parse).copy();
            this.value = this.input.toValue();
        }


        this.min = this.min.eval(parse).copy();
        this.max = this.max.eval(parse).copy();

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

        return this;
    }
}
