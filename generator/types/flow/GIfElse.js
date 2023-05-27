class GIfElse
extends GOperator
{
    input0 = null;
    input1 = null;

    condition;



    constructor(nodeId, options)
    {
        super(IF_ELSE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GIfElse(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input    ) copy.input     = this.input    .copy();
        if (this.condition) copy.condition = this.condition.copy();
        if (this.value    ) copy.value     = this.value    .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const cond = (await this.condition.eval(parse)).toValue();


        if (   this.input0 
            && this.input1)
        {
            const val0 = (await this.input0.eval(parse)).toValue();
            const val1 = (await this.input1.eval(parse)).toValue();

            this.value = cond.value != 0 ? val0 : val1;
        }
        else if (this.input0)
        {
            const input0 = (await this.input0.eval(parse)).toValue();

            this.value = 
                cond.value != 0
                ? input0
                : input0.getNaN()
        }
        else if (this.input1)
        {
            const input1 = (await this.input1.eval(parse)).toValue();

            this.value = 
                cond.value == 0
                ? input1
                : input1.getNaN();
        }
        else                  
            this.value = NullValue;


        this.updateValues =
        [
            ['value',     this.value],
            ['condition', cond      ]
        ];
        
        
        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0   ) this.input0   .pushValueUpdates(parse);
        if (this.input1   ) this.input1   .pushValueUpdates(parse);
        if (this.condition) this.condition.pushValueUpdates(parse);
    }



    toValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input0   ) this.input0   .invalidateInputs();
        if (this.input1   ) this.input1   .invalidateInputs();
        if (this.condition) this.condition.invalidateInputs();
    }
}
