class GFeedback
extends GOperator1
{
    from   = null;

    loopId = NULL;

    

    constructor(nodeId, options)
    {
        super(FEEDBACK, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.from = null;
    }



    copy()
    {
        const copy = new GFeedback(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();

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


        const input = await evalValue(this.input, parse);

        // this.value = input ? new ListValue([input]) : new ListValue();//NullValue();


        this.setUpdateValues(parse, 
        [
            ['type', this.outputListType()]
        ]);


        await this.evalObjects(parse, {input});

        
        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        const repeat = parse.repeats.find(r => r.repeatId == this.loopId);


        const feedback = 
               repeat
            && repeat.currentIteration > 0
            && this.from;

        
        this.value = new ListValue();

        if (feedback)
        {
            for (const obj of this.from.iterationObjects)
                this.value.items.push(obj.toValue());

            if (this.from.iterationObjects)
                this.value.objects = this.from.iterationObjects.map(o => o.copy());
        }
        else if (options.input
              && options.input.isValid())
        {
            this.value.items.push(options.input);

            if (options.input.objects)
                this.value.objects = options.input.objects.map(o => o.copy());
        }


        for (const item of this.value.items)
            item.nodeId = this.nodeId;

        for (const obj of this.value.objects)
        {
            obj.nodeId   = this.nodeId;
            obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
        }
        console.log('this.value =', this.value);


        await super.evalObjects(parse);
    }



    toValue()
    {
        return this.value.copy();
    }



    initLoop(parse, nodeId)
    {
        super.initLoop(parse, nodeId);

        this.from = parse.parsedNodes.find(n => n.nodeId == nodeId);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        this.from = null;
    }
}
