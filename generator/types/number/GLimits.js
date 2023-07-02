class GLimits
extends GNumberType1
{
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

        copy.min = this.min.copy();
        copy.max = this.max.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.min || this.min.isCached())
            && (!this.max || this.max.isCached());
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
            ['value', this.value],
            ['min',   min       ],
            ['max',   max       ]
        ];


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.min  ) this.min  .pushValueUpdates(parse);
        if (this.max  ) this.max  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
        if (this.min  ) this.min  .invalidateInputs(from);
        if (this.max  ) this.max  .invalidateInputs(from);
    }
}
