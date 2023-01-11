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
        const ifElse = new GIfElse(this.nodeId, this.options);

        ifElse.copyBase(this);

        if (this.input    ) ifElse.input     = this.input    .copy();
        if (this.condition) ifElse.condition = this.condition.copy();
        if (this.value    ) ifElse.value     = this.value    .copy();

        return ifElse;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        
        const cond = this.condition.eval(parse).toValue();


        if (   this.input0 
            && this.input1)
        {
            const val0 = this.input0.eval(parse).toValue();
            const val1 = this.input1.eval(parse).toValue();

            this.value = cond.value != 0 ? val0 : val1;
        }
        else if (this.input0
              && cond.value != 0)
            this.value = this.input0.eval(parse).toValue();

        else if (this.input1
              && cond.value == 0) 
            this.value = this.input1.eval(parse).toValue();

        else                  
            this.value = NumberValue.NaN;


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
}
