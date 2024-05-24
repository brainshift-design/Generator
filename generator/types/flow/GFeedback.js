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
        if (    /*this.isCached()
            ||*/ !parse.evalFeedback)
            return this;

        //console.trace();

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

        
        // if (repeat)
        //     console.log('repeat.currentIteration =', repeat.currentIteration);
        
        this.value = new ListValue();

        if (feedback)
        {
            for (const obj of this.from.iterationObjects)
                this.value.items.push(obj.toValue());

            //console.log('this.from.iterationObjects =', [...this.from.iterationObjects]);
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

        //console.log('this.value.objects =', this.value.objects);

        //console.log('repeat =', repeat);
        const iter =
            repeat 
            ? NAME_SEPARATOR + repeat.currentIteration 
            : '';
        //console.log('iter =', iter);

        for (const item of this.value.items)
            item.nodeId = this.nodeId;

        for (let i = 0; i < this.value.objects.length; i++)
        {
            const obj = this.value.objects[i];

            obj.nodeId   = this.nodeId;
            obj.objectId = this.nodeId + OBJECT_SEPARATOR + i + iter;
            //console.log('obj.objectId =', obj.objectId);
        }
        // console.log('this.value =', this.value);

        //console.log('');


        await super.evalObjects(parse);
    }



    toValue()
    {
        return this.value.copy();
    }



    // invalidateInputs(parse, from, force)
    // {
    //     super.invalidateInputs(parse, from, force);

    // }



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
