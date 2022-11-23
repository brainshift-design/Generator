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
        if (this.valid)
            return this;


        this.value = new NumberValue(0);

        
        this.min = this.min.eval(parse).copy();
        this.max = this.max.eval(parse).copy();

        const min = this.min.toValue();
        const max = this.max.toValue();


        if (this.input)
        {
            this.input = this.input.eval(parse).copy();
            this.value = this.input.toValue();

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


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }
}
