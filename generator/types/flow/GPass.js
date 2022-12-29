class GPass
extends GOperator
{
    input = null;

    condition;



    constructor(nodeId, options)
    {
        super(PASS, nodeId, options);
    }


    
    copy()
    {
        const pass = new GPass(this.nodeId, this.options);

        pass.copyBase(this);

        if (this.input    ) pass.input     = this.input    .copy();
        if (this.condition) pass.condition = this.condition.copy();
        if (this.value    ) pass.value     = this.value    .copy();

        return pass;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

        
        const cond = this.condition.eval(parse).toValue();


        this.value = 
               this.input
            && cond.value != 0
            ? this.input.eval(parse).toValue()
            : null;


        genPushUpdateValue(parse, this.nodeId, 'condition', cond);
        
        if (this.value) genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        
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
