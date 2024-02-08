class GRepeat
extends GOperator1
{
    count   = null;
   _while   = null;
    //iterate = null;
    loop    = null;

    iterationObjects = [];



    constructor(nodeId, options)
    {
        super(REPEAT, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this. count   = null;
        this._while   = null;
        //this. iterate = null;
        this. loop    = null;

        this.iterationObjects = [];
    }



    copy()
    {
        const copy = new GRepeat(this.nodeId, this.options);

        copy.copyBase(this);

        if (this. value  ) copy. value   = this. value  .copy();
        if (this. count  ) copy. count   = this. count  .copy();
        if (this._while  ) copy._while   = this._while  .copy();
        //if (this. iterate) copy. iterate = this. iterate.copy();
        if (this. loop   ) copy. loop    = this. loop   .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        let   count   = (await this.count  .eval(parse)).toValue();
        let  _while   = new NumberValue(1);
        //const iterate = (await this.iterate.eval(parse)).toValue();
        const loop    = (await this.loop   .eval(parse)).toValue();


        count = 
            count
            ? new NumberValue(Math.floor(count.value))
            : new NumberValue(0);


        //if (this.iterate.type != NUMBER_VALUE) assertVolatile(this.iterate, this);
        if (this.loop   .type != NUMBER_VALUE) assertVolatile(this.loop,    this);


        this.value = new ListValue();
        this.value.objects = [];


        if (   count.value > 0)
            // && (   this.options.active
            //     || ))
        {
            if (this.input)
                //&& this.input.isValid())
            {
                const startTime    = Date.now();
                let   showProgress = false;


                const nRepeats = 
                    this.options.enabled 
                    ? count.value 
                    : 0;
                

                let repeat =
                {
                    repeatId:  this.nodeId,
                    iteration: 0,
                    total:     nRepeats
                };

                    
                parse.repeats.push(repeat);

                if (parse.repeats.length == 1)
                    parse.totalProgress += nRepeats;


                if (this.loop.type != NUMBER_VALUE) 
                    this.loop.initLoop(parse, this.nodeId);


                for (let i = 0, o = 0; i < Math.max(1, nRepeats); i++)
                {
                    _while = (await this._while.eval(parse)).toValue();
                    
                    if (_while.value == 0)
                        break;
                

                    if (  !showProgress
                        && Date.now() - startTime > 50)
                    {
                        genInitNodeProgress(this.nodeId);
                        showProgress = true;
                    }


                    repeat.iteration = i;


                    this.input.invalidateInputs(parse, this, false);


                    const input = (await this.input.eval(parse)).toValue();


                    if (   input
                        && nRepeats > 0)
                    {
                        this.value.items.push(input);


                        if (   this.options.active
                            || this.options.beforeActive)
                        {
                            this.iterationObjects = [];
                        
                            if (this.input.value.objects)
                            {
                                for (let j = 0; j < this.input.value.objects.length; j++, o++)
                                {
                                    const obj = copyFigmaObject(this.input.value.objects[j]);

                                    this.iterationObjects.push(obj.copy());

                                    obj.nodeId      = this.nodeId;
                                    obj.listId      = i;

                                    obj.objectId    = obj.objectId + OBJECT_SEPARATOR + this.nodeId + ':' + (o+1).toString();
                                    obj.objectName += ' ' + (o+1).toString();

                                    obj.itemIndex   = repeat.iteration;

                                    if (this.value.objects)
                                        this.value.objects.push(obj);
                                }
                            }
                        }
                    }


                    this.input.iterateLoop(parse);


                    // if (this.iterate.type != NUMBER_VALUE)
                    // {
                    //     this.iterate.invalidateInputs(parse, this, false);
                    //     this.iterate.iterateLoop(parse);
                    // }

                    if (this.loop.type != NUMBER_VALUE)
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


                if (this.loop.type != NUMBER_VALUE)
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
                await this.input.eval(parse);
        }
        else
        {
            if (this.input)
                await this.input.eval(parse);
        }


        const type = this.outputListType();
        
        this.setUpdateValues(parse,
        [
            ['type',  type ],
            ['count', count]
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
            && this. count && this. count.isValid()
            && this._while && this._while.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this. count  ) this. count  .pushValueUpdates(parse);
        if (this._while  ) this._while  .pushValueUpdates(parse);
        //if (this. iterate) this. iterate.pushValueUpdates(parse);
        if (this. loop   ) this. loop   .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this. count  ) this. count  .invalidateInputs(parse, from, force);
        if (this._while  ) this._while  .invalidateInputs(parse, from, force);
        //if (this. iterate) this. iterate.invalidateInputs(parse, from, force);
        if (this. loop   ) this. loop   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this. count  ) this. count  .iterateLoop(parse);
        if (this._while  ) this._while  .iterateLoop(parse);
        //if (this. iterate) this. iterate.iterateLoop(parse);
        if (this. loop   ) this. loop   .iterateLoop(parse);
    }
}



function assertVolatile(loop, node)
{
    consoleAssert(
           loop.type == DEFINE
        || loop.type == FREEZE
        || loop.type == NUMBER_RANGE
        || loop.type == NUMBER_WAVE
        || loop.type == NUMBER_SEQUENCE
        || loop.type == NUMBER_RANDOM
        || loop.type == NUMBER_NOISE
        || loop.type == NUMBER_PROBABILITY
        || loop.type == COMBINE
        || loop.type == PARAM, // for OpStart
        'only volatile types can be repeated');
}