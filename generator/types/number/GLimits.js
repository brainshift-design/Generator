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
        const copy = new GLimits(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        copy.min = this.min.copy();
        copy.max = this.max.copy();

        //lim.minMaxPriority = this.minMaxPriority;

        return copy;
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


            if (this.options.enabled)
            {
                this.value.value = Math.min(Math.max(
                    min.value,
                    this.value.value),
                    max.value);
            }
        }
        else
            this.value = NumberValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'min',   min);
        genPushUpdateValue(parse, this.nodeId, 'max',   max);
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }
}
