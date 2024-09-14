class GRepeat
extends GOperator1
{
    count            = null;
    iteration        = null;
   _while            = null;
    loop             = null;

    iterationObjects = [];

    isTerminal       = false; // this is a terminal, active or not
    activeAfter      = false; // there are active nodes after this one
    listAfter        = false; // there is a list node after this one



    constructor(nodeId, options)
    {
        super(REPEAT, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this. count      = null;
        this. iteration  = null;
        this._while      = null;
        this. loop       = null;

        this.isTerminal  = false;
        this.activeAfter = false;
        this.listAfter   = false;

        this.iterationObjects = [];
    }



    copy()
    {
        const copy = new GRepeat(this.nodeId, this.options);

        copy.copyBase(this);

        if (this. value    ) copy. value     = this. value    .copy();
        if (this. iteration) copy. iteration = this. iteration.copy();
        if (this. count    ) copy. count     = this. count    .copy();
        if (this._while    ) copy._while     = this._while    .copy();
        if (this. loop     ) copy. loop      = this. loop     .copy();

        copy.isTerminal  = this.isTerminal;
        copy.activeAfter = this.activeAfter;
        copy.listAfter   = this.listAfter;

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        let   count     = await evalNumberValue(this.count,     parse);
        let   iteration = await evalNumberValue(this.iteration, parse);
        let  _while     = new NumberValue(1);


        let iterations = [];

        if (iteration.isValid())
        {
            if (iteration.type != TEXT_VALUE)
                iteration = new TextValue(iteration.value.toString());

            iterations = parseIndexRanges(iteration.value);
        }


        count = 
            count
            ? new NumberValue(Math.floor(count.value))
            : new NumberValue(0);


        if (   this.loop 
            && this.loop.type != NUMBER_VALUE) 
            assertVolatile(this.loop, this);


        this.value = new ListValue();
        this.value.objects = [];


        if (   count
            && count.value > 0)
            // && (   this.options.active
            //     // || this.isTerminal
            //     || this.activeAfter
            //     || this.listAfter))
        {
            if (this.input)
            {
                const startTime    = Date.now();
                let   showProgress = false;


                const nRepeats = 
                    this.options.enabled 
                    ? count.value 
                    : 1; 


                let repeat =
                {
                    repeatId:         this.nodeId,
                    currentIteration: 0,
                    total:            nRepeats
                };

                    
                parse.repeats.push(repeat);

                if (parse.repeats.length == 1)
                    parse.totalProgress += nRepeats;


                if (   this.loop
                    && this.loop.initLoop)
                    this.loop.initLoop(parse, this.nodeId);


                if (this.loop)
                {
                    parse.evalAccumulate = false;
                    await this.loop.eval(parse); // it needs to be evaluated at least once, better do it at the end
                    parse.evalAccumulate = true;
                }


                for (let i = 0, o = 0; i < Math.max(1, nRepeats); i++)
                {
                    if (  !showProgress
                        && Date.now() - startTime > 50)
                    {
                        genInitNodeProgress(this.nodeId);
                        showProgress = true;
                    }


                    repeat.currentIteration = i;



                    this.input.invalidateInputs(parse, this, false);

                    
                    const input = await evalValue      (this.input,  parse);
                         _while = await evalNumberValue(this._while, parse);


                    if (   input
                        && nRepeats > 0
                        && (  !_while 
                            || _while.value > 0))
                    {
                        // lists are automatically expanded unless explicitly kept as item
                        
                        if (isListValueType(input.type))
                        {
                            if (input.condensed === true)
                                this.value.items.push(input);
                            else
                            {
                                for (const item of input.items)
                                    this.value.items.push(item);
                            }
                        }
                        else
                            this.value.items.push(input);
        

                        if (   this.options.active
                            || this.options.beforeActive
                            || this.options.beforeList)
                        {
                            this.iterationObjects = [];
                        

                            if (input.objects)
                            {
                                for (let j = 0; j < input.objects.length; j++, o++)
                                {
                                    const obj = copyFigmaObject(input.objects[j]);


                                    this.iterationObjects.push(obj.copy());


                                    if (  !iteration.isValid()
                                        || iterations.includes(i))
                                    {
                                        obj.nodeId      = this.nodeId;
                                        obj.listId      = i;

                                        obj.objectId   += OBJECT_SEPARATOR + this.nodeId + ':' + (o+1).toString();
                                        obj.objectName += ' ' + (o+1).toString();

                                        obj.itemIndex   = repeat.currentIteration;

                                        if (this.value.objects)
                                            this.value.objects.push(obj);
                                    }
                                }
                            }
                        }
                    }


                    this.input.iterateLoop(parse);


                    if (   this.loop
                        && this.loop.iterateCache)
                        this.loop.iterateCache(parse, this);

                    
                    if (parse.repeats.length == 1)
                    {
                        parse.currentProgress++;

                        if (await checkStop(parse.requestId))
                        {
                            genEndNodeProgress(this.nodeId);
                            return this;
                        }
                    }
                    

                    if (showProgress)
                        genUpdateNodeProgress(parse, this.nodeId, i / nRepeats);
                }


                if (   this.loop
                    && this.loop.resetLoop)
                    this.loop.resetLoop(parse, this.nodeId);


                if (this.startTimer > -1)
                {
                    clearTimeout(this.startTimer);
                    this.startTimer = -1;
                }


                genEndNodeProgress(this.nodeId);


                consoleAssert(parse.repeats.at(-1) == repeat, 'invalid nested repeat \'' + this.nodeId + '\'');
                parse.repeats.pop();
            }
            else if (this.input)
                await evalValue(this.input, parse);
        }
        else if (this.input)
            await evalValue(this.input, parse);

        
        const type = this.outputListType();

        
        this.setUpdateValues(parse,
        [
            ['type',      type     ],
            ['count',     count    ],
            ['iteration', iteration]
        ]);


        this.validate();

        return this;
    }



    toValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return super.isValid()
            && this. count     && this. count    .isValid()
            && this. iteration && this. iteration.isValid()
            && (!this._while   || this._while    .isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this. count    ) this. count    .pushValueUpdates(parse);
        if (this. iteration) this. iteration.pushValueUpdates(parse);
        if (this._while    ) this._while    .pushValueUpdates(parse);
        if (this. loop     ) this. loop     .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this. count    ) this. count    .invalidateInputs(parse, from, force);
        if (this. iteration) this. iteration.invalidateInputs(parse, from, force);
        if (this._while    ) this._while    .invalidateInputs(parse, from, force);
        if (this. loop     ) this. loop     .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this. count    ) this. count    .iterateLoop(parse);
        if (this. iteration) this. iteration.iterateLoop(parse);
        if (this._while    ) this._while    .iterateLoop(parse);
        if (this. loop     ) this. loop     .iterateLoop(parse);
    }
}



function assertVolatile(loop, node)
{
    consoleAssert(
           loop.type == ITERATE
        || loop.type == FREEZE
        || loop.type == NUMBER_RANGE
        || loop.type == NUMBER_WAVE
        || loop.type == NUMBER_SEQUENCE
        || loop.type == NUMBER_RANDOM
        || loop.type == NUMBER_NOISE
        || loop.type == PROBABILITY
        || loop.type == LIST
        || loop.type == PARAM, // for OpFeedback
        'only volatile types can be repeated');
}