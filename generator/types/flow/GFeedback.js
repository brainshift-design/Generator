class GFeedback
extends GOperator1
{
    static { GNode.types[FEEDBACK] = this; }



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

        
        this.value = new ListValue();

        if (feedback)
        {
            for (const obj of this.from.iterationObjects)
                this.value.items.push(obj.toNewValue());

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


        const iter =
            repeat 
            ? NAME_SEPARATOR + repeat.currentIteration 
            : '';

        for (const item of this.value.items)
            item.nodeId = this.nodeId;

        if (this.value.objects)
        {
            for (let i = 0; i < this.value.objects.length; i++)
            {
                const obj = this.value.objects[i];

                obj.nodeId   = this.nodeId;
                obj.objectId = this.nodeId + OBJECT_SEPARATOR + i + iter;
            }
        }


        await super.evalObjects(parse);
    }



    toNewValue()
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const feedback = new GFeedback(nodeId, options);
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(feedback, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, feedback);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            feedback.input = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, feedback);
        return feedback;
    }
}
