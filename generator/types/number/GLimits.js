class GLimits
extends GNumberType
{
    input = null;

    min;
    max;


    
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

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const min = (await this.min.eval(parse)).toValue();
        const max = (await this.max.eval(parse)).toValue();


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();
            //console.log('this.value =', this.value);

            console.assert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');


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


        if (this.feedbackValue)
            this.value = this.feedbackValue();


        this.updateValues =
        [
            [returnValueId, this.value],
            ['min',   min       ],
            ['max',   max       ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.min  ) this.min  .pushValueUpdates(parse);
        if (this.max  ) this.max  .pushValueUpdates(parse);
    }



    isCached()
    {
        return super.isCached()
            && (!this.input || this.input.isCached())
            && (!this.min   || this.min  .isCached())
            && (!this.max   || this.max  .isCached());
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        if (this.min  ) this.min  .invalidate();
        if (this.max  ) this.max  .invalidate();
    }
}
