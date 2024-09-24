class GIfElse
extends GOperator
{
    input0    = null;
    input1    = null;

    condition = null;



    constructor(nodeId, options)
    {
        super(IF_ELSE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.input0    = null;
        this.input1    = null;

        this.condition = null;
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

        
        const inputFalse = await evalValue(this.input0, parse);
        const inputTrue  = await evalValue(this.input1, parse);
        
        const cond       = await evalNumberValue(this.condition, parse);


          if (   inputFalse 
              && inputTrue ) this.value = cond.value >  0 ? inputTrue  : inputFalse;
        else if (inputFalse) this.value = cond.value == 0 ? inputFalse : nanFromType(inputFalse.type);
        else if (inputTrue ) this.value = cond.value >  0 ? inputTrue  : nanFromType(inputTrue .type);
        else                 this.value = new NullValue();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',      this.outputType()],
            ['value',     this.value       ],
            ['condition', cond             ]
        ]);
        
        
        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy() 
             : null;
    }



    isValid()
    {
        return this.input0    && this.input0   .isValid()
            && this.input1    && this.input1   .isValid()
            && this.condition && this.condition.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0   ) this.input0   .pushValueUpdates(parse);
        if (this.input1   ) this.input1   .pushValueUpdates(parse);
        if (this.condition) this.condition.pushValueUpdates(parse);
    }    



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input0   ) this.input0   .invalidateInputs(parse, from, force);
        if (this.input1   ) this.input1   .invalidateInputs(parse, from, force);
        if (this.condition) this.condition.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input0   ) this.input0   .iterateLoop(parse);
        if (this.input1   ) this.input1   .iterateLoop(parse);
        if (this.condition) this.condition.iterateLoop(parse);
    }    
}
