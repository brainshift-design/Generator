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

        this.value = input ? input : new NullValue();


        this.setUpdateValues(parse, 
        [
            ['type', this.outputType()]
        ]);


        await this.evalObjects(parse);

        
        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        // console.log('parse.repeats =', parse.repeats);
        // console.log('this.loopId =', this.loopId);

        const repeat = parse.repeats.find(r => r.repeatId == this.loopId);


        //if (repeat)
        //    console.log('repeat.currentIteration =', repeat.currentIteration);
        //console.log('this.from =', this.from);
        // console.log('');
        const objects =
               repeat
            && repeat.currentIteration > 0
            && this.from
            ? this.from.iterationObjects
            : (   this.input 
               && this.input.value.objects 
               ? this.input.value.objects 
               : []);

        // if (   repeat
        //     && repeat.currentIteration > 0
        //     && this.from)
        //     console.log('this.from.iterationObjects == objects =', this.from.iterationObjects == objects);

        //console.log('objects =', objects);
        //console.log('');
        
        if (this.value.isValid())
        {
            //console.log('objects =', objects);
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
