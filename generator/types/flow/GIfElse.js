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

        if (this.input0   ) copy.input0    = this.input0   .copy();
        if (this.input1   ) copy.input1    = this.input1   .copy();

        if (this.condition) copy.condition = this.condition.copy();

        if (this.value    ) copy.value     = this.value    .copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.input0 || this.input0.isCached())
            && (!this.input1 || this.input1.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const cond = (await this.condition.eval(parse)).toValue();


        if (   this.input0 
            && this.input1)
        {
            const input0 = (await this.input0.eval(parse)).toValue();
            const input1 = (await this.input1.eval(parse)).toValue();

            this.value = cond.value != 0 ? input0 : input1;
        }
        else if (this.input0)
        {
            const input0 = (await this.input0.eval(parse)).toValue();

            this.value = 
                cond.value != 0
                ? input0
                : null;
        }
        else if (this.input1)
        {
            const input1 = (await this.input1.eval(parse)).toValue();

            this.value = 
                cond.value == 0
                ? input1
                : null;
        }
        else                  
            this.value = null;


        this.updateValueObjects();


        this.updateValues =
        [
            //['value',     this.value],
            ['type',      new TextValue(this.value ? this.value.type : ANY_VALUE)],
            ['condition', cond                          ]
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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input0   ) this.input0   .invalidateInputs(from);
        if (this.input1   ) this.input1   .invalidateInputs(from);
        if (this.condition) this.condition.invalidateInputs(from);
    }
}
