class GRepeat
extends GOperator
{
    input       = null;

    count       = null;
   _while       = null;
    iterateLoop = null;
    resetLoop   = null;

    iterationObjects = [];



    constructor(nodeId, options)
    {
        super(REPEAT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GRepeat(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();

        copy. value       = this. value      .copy();
        copy. count       = this. count      .copy();
        copy._while       = this._while      .copy();
        copy. iterateLoop = this. iterateLoop.copy();
        copy. resetLoop   = this. resetLoop  .copy();

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
            

        let   count       = (await this.count.eval(parse)).toValue();
        let  _while       = new NumberValue(1);
        const iterateLoop = (await this.iterateLoop.eval(parse)).toValue();
        const resetLoop   = (await this.resetLoop  .eval(parse)).toValue();


        count = 
            count
            ? new NumberValue(Math.round(count.value))
            : new NumberValue(0);


        if (this.iterateLoop.type != NUMBER_VALUE) assertVolatile(this.iterateLoop, this);
        if (this.resetLoop  .type != NUMBER_VALUE) assertVolatile(this.resetLoop,   this);


        this.value = new ListValue();


        let repeat =
        {
            repeatId:  this.nodeId,
            index:     0,
            iteration: 0,
            total:     1
        };


        if (count.value > 0)
        {
            if (this.input)
            {
                const startTime    = Date.now();
                let   showProgress = false;


                const nRepeats = 
                       this.options.enabled 
                    && (   this.options.active
                        || this.options.beforeActive)
                    ? count.value 
                    : 1;
                
                repeat.total = nRepeats;

                    
                parse.repeats.push(repeat);

                if (parse.repeats.length == 1)
                    parse.totalProgress += nRepeats;


                if (this.iterateLoop.type != NUMBER_VALUE) this.iterateLoop.initLoop(parse, this.nodeId);
                if (this.resetLoop  .type != NUMBER_VALUE) this.resetLoop  .initLoop(parse, this.nodeId);


                for (let i = 0, o = 0; i < nRepeats; i++)
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


                    repeat.index = i;
                    repeat.iteration++;

                    if (this.iterateLoop.type != NUMBER_VALUE)
                        this.iterateLoop.invalidateLoop(parse, this.nodeId);
                    
                    
                    this.input.invalidateInputs(this);
                    

                    const input = (await this.input.eval(parse)).toValue();


                    if (input)
                    {
                        this.value.items.push(input.copy());


                        this.iterationObjects = [];
                    
                        for (let j = 0; j < this.input.value.objects.length; j++, o++)
                        {
                            const obj = copyFigmaObject(this.input.value.objects[j]);

                            this.iterationObjects.push(obj.copy());

                            obj.nodeId      = this.nodeId;
                            obj.listId      = i;

                            obj.objectId    = obj.objectId + OBJECT_SEPARATOR + this.nodeId + ':' + (o+1).toString();
                            obj.objectName += ' ' + (o+1).toString();

                            this.value.objects.push(obj);
                        }
                    }


                    if (parse.repeats.length == 1)
                    {
                        parse.currentProgress++;
                        
                        const stopRequestId = await genGetValueFromUi('stopRequestId');

                        if (   parse.requestId == stopRequestId.value
                            || curRequestIds.includes(parse.requestId)) 
                        { 
                            parse.stopGenerate = true;
                            break; 
                        }
                    }


                    if (showProgress)
                        genUpdateNodeProgress(parse, this.nodeId, i / nRepeats);
                }


                if (this.resetLoop.type != NUMBER_VALUE)
                {
                    //repeat.iteration = 0;
                    this.resetLoop.resetLoop(parse, this.nodeId);
                }


                if (this.startTimer > -1)
                {
                    clearTimeout(this.startTimer);
                    this.startTimer = -1;
                }


                genEndNodeProgress(this.nodeId);


                consoleAssert(parse.repeats.at(-1) == repeat, 'invalid nested repeat \'' + this.nodeId + '\'');
                parse.repeats.pop();
            }
        }
        else
        {
            if (this.input)
                await this.input.eval(parse);
        }


        const type = 
            this.value
            ? new TextValue(finalListTypeFromItems(this.value.items))
            : TextValue.NaN;


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
        return this. input && this. input.isValid()
            && this. count && this. count.isValid()
            && this._while && this._while.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this. input      ) this. input      .pushValueUpdates(parse);
        if (this. count      ) this. count      .pushValueUpdates(parse);
        if (this._while      ) this._while      .pushValueUpdates(parse);
        if (this. iterateLoop) this. iterateLoop.pushValueUpdates(parse);
        if (this. resetLoop  ) this. resetLoop  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this. input      ) this. input      .invalidateInputs(from);
        if (this. count      ) this. count      .invalidateInputs(from);
        if (this._while      ) this._while      .invalidateInputs(from);
        if (this. iterateLoop) this. iterateLoop.invalidateInputs(from);
        if (this. resetLoop  ) this. resetLoop  .invalidateInputs(from);
    }
}



function assertVolatile(loop, node)
{
    consoleAssert(
           loop.type == DEFINE
        || loop.type == FREEZE
        || loop.type == NUMBER_RANGE
        || loop.type == NUMBER_SEQUENCE
        || loop.type == NUMBER_RANDOM
        || loop.type == NUMBER_NOISE
        || loop.type == NUMBER_PROBABILITY
        || loop.type == LIST
        || loop.type == PARAM, // for OpStart
        'only volatile types can be repeated');
}