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


        if (this.value)
        {
            for (let j = 0; j < this.value.objects.length; j++)
            {
                const obj  = this.value.objects[j].copy();

                obj.nodeId = this.nodeId;
                obj.listId = -1;
                
                this.objects.push(obj);
            }
        }


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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input0   ) this.input0   .invalidateInputs(from);
        if (this.input1   ) this.input1   .invalidateInputs(from);
        if (this.condition) this.condition.invalidateInputs(from);
    }
}
