class GFeedback
extends GOperator1
{
    objects    = null;
    transforms = null;
    from       = null;

    loopId     = NULL;

    

    constructor(nodeId, options)
    {
        super(FEEDBACK, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.objects    = null;
        this.transforms = null;
        this.from       = null;
    }



    copy()
    {
        const copy = new GFeedback(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value     ) copy.value      = this.value     .copy();
        if (this.objects   ) copy.objects    = this.objects   .copy();
        if (this.transforms) copy.transforms = this.transforms.copy();

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
        if (    this.isCached()
            || !parse.evalFeedback)
            return this;


        const objects    = this.objects    ? (await this.objects   .eval(parse)).toValue() : null;
        const transforms = this.transforms ? (await this.transforms.eval(parse)).toValue() : null;


        this.value = 
            this.input 
            ? (await this.input.eval(parse)).toValue() 
            : new NullValue();


        this.setUpdateValues(parse, 
        [
            ['type',       this.outputType()],
            ['objects',    objects          ],
            ['transforms', transforms       ]
        ]);


        await this.evalObjects(parse, {objects: objects.value > 0});

        
        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        const repeat = parse.repeats.find(r => r.repeatId == this.loopId);


        const objects =
               options.objects
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
            && this.objects    && this.objects   .isValid()
            && this.transforms && this.transforms.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.objects   ) this.objects   .pushValueUpdates(parse);
        if (this.transforms) this.transforms.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.objects   ) this.objects   .invalidateInputs(parse, from, force);
        if (this.transforms) this.transforms.invalidateInputs(parse, from, force);
    }



    initLoop(parse, nodeId)
    {
        super.initLoop(parse, nodeId);

        this.from = parse.parsedNodes.find(n => n.nodeId == nodeId);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.objects   ) this.objects   .iterateLoop(parse);
        if (this.transforms) this.transforms.iterateLoop(parse);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        this.from = null;
    }
}
