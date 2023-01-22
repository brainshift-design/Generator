class GLimits
extends GNumberType
{
    input = null;

    min;
    max;

    //minMaxPriority = -1; 


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

        //lim.minMaxPriority = this.minMaxPriority;

        return lim;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        const min = this.min.eval(parse).toValue();
        const max = this.max.eval(parse).toValue();


        if (this.input)
        {
            this.value = this.input.eval(parse).toValue();

            console.assert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must belong to NUMBER_VALUE');

            this.value.value = Math.min(Math.max(
                min.value,
                this.value.value),
                max.value);
        }
        else
            this.value = NumberValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'min',   min);
        genPushUpdateValue(parse, this.nodeId, 'max',   max);
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}
