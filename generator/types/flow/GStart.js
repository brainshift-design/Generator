class GStart
extends GOperator1
{
    feedback = null;
    from     = null;

    loopId   = NULL;

    

    constructor(nodeId, options)
    {
        super(START, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.feedback = null;
        this.from     = null;
    }



    copy()
    {
        const copy = new GStart(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value   ) copy.value    = this.value   .copy();
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
            : new NullValue();


        this.setUpdateValues(parse, 
        [
            ['type',     this.outputType()],
            ['feedback', feedback         ]
        ]);


        await this.evalObjects(parse, {feedback: feedback.value > 0});

        
        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        const repeat = parse.repeats.find(r => r.repeatId == this.loopId);


        const objects =
               options.feedback
            && repeat
            && repeat.currentIteration > 0
            && this.from
            ? this.from.iterationObjects
            : (   this.input 
               && this.input.value.objects 
               ? this.input.value.objects 
               : []);

        
        if (this.value.isValid())
        {
            this.value.objects = objects.map(o => o.copy());

            for (const obj of this.value.objects)
            {
                obj.nodeId   = this.nodeId;
                obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
            }
        }


        await super.evalObjects(parse);
    }



    toValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.feedback && this.feedback.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.feedback) this.feedback.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.feedback) this.feedback.invalidateInputs(parse, from, force);
    }



    initLoop(parse, nodeId)
    {
        super.initLoop(parse, nodeId);

        this.from = parse.parsedNodes.find(n => n.nodeId == nodeId);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        this.from = null;
    }
}
