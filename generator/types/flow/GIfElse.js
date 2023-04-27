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


        genPushUpdateValue(parse, this.nodeId, 'condition', cond);
        genPushUpdateValue(parse, this.nodeId, 'value',     this.value);
        
        
        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }



    invalidate()
    {
        super.invalidate();

        if (this.input0   ) this.input0   .invalidate();
        if (this.input1   ) this.input1   .invalidate();
        if (this.condition) this.condition.invalidate();
    }
}
