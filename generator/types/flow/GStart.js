class GStart
extends GOperator
{
    input    = null;

    feedback = null;
    from     = null;

    loopId   = NULL;

    

    constructor(nodeId, options)
    {
        super(START, nodeId, options);
    }


    
    copy()
    {
        const copy = new GStart(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value   ) copy.value    = this.value   .copy();
        if (this.input   ) copy.input    = this.input   .copy();
        if (this.feedback) copy.feedback = this.feedback.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const feedback = this.feedback ? (await this.feedback.eval(parse)).toValue() : null;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : NullValue;


        this.setUpdateValues(parse, 
        [
            ['feedback', feedback]
        ]);


        await this.evalObjects(parse, {feedback: feedback.value > 0});

        
        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        const repeat = parse.repeats.find(r => r.repeatId == this.loopId);


        this.updateObjects(
               this.from
            && repeat
            && repeat.iteration > 0
            && options.feedback
            ? this.from.iterationObjects 
            : (this.input ? this.input.value.objects : []),
            repeat 
            ? repeat.iteration.toString()
            : '');

        this.from = null;

        
        await super.evalObjects(parse);
    }



    updateObjects(objects, iteration)
    {
        if (!this.value.isValid())
            return;
            
        this.value.objects = objects.map(o => o.copy());

        for (const obj of this.value.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
        }
    }
    

    
    toValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.feedback.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input   ) this.input   .pushValueUpdates(parse);
        if (this.feedback) this.feedback.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        this.from = from;

        if (this.input   ) this.input   .invalidateInputs(from);
        if (this.feedback) this.feedback.invalidateInputs(from);
    }
}
