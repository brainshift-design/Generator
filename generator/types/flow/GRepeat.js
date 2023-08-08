class GRepeat
extends GOperator
{
    input = null;

    count = null;
   _while = null;
    loop  = null;

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

        copy. value = this. value.copy();
        copy. count = this. count.copy();
        copy._while = this._while.copy();
        copy. loop  = this. loop .copy();

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
            

        let   count = (await this. count.eval(parse)).toValue();
        let  _while = new NumberValue(1);
        const loop  = (await this. loop .eval(parse)).toValue();


        count = 
            count
            ? new NumberValue(Math.round(count.value))
            : new NumberValue(0);


        if (this.loop.type != NUMBER_VALUE)
        {
            assertVolatile(this);
            this.setRepeatCount(this.loop, count.value);
        }


        this.value = new ListValue();


        let repeat =
        {
            repeatId:  this.nodeId,
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
                
                
                parse.repeats.push(repeat);


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

                    
                    if (this.loop.type != NUMBER_VALUE)
                    {
                        this.invalidateRepeat(parse, this.loop, this.nodeId);

                        repeat.iteration = i;
                        repeat.total     = nRepeats;
                    }
                    
                    
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


                    if (showProgress)
                        genUpdateNodeProgress(this.nodeId, i / nRepeats);
                }


                if (this.startTimer > -1)
                {
                    clearTimeout(this.startTimer);
                    this.startTimer = -1;
                }


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



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this. input) this. input.pushValueUpdates(parse);
        if (this. count) this. count.pushValueUpdates(parse);
        if (this._while) this._while.pushValueUpdates(parse);
        //if (this. loop ) this. loop .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this. input) this. input.invalidateInputs(from);
        if (this. count) this. count.invalidateInputs(from);
        if (this._while) this._while.invalidateInputs(from);
        //if (this. loop ) this. loop .invalidateInputs(from);
    }



    invalidateRepeat(parse, loop, nodeId)
    {
        if (loop.type == LIST)
        {
            for (const input of loop.inputs)
                this.invalidateLoopInput(parse, input);
        }
        else
            this.invalidateLoopInput(parse, loop);
    }



    invalidateLoopInput(parse, input)
    {
        input.invalidateLoop(parse, this.nodeId);
    }



    setRepeatCount(loop, count)
    {
        if (loop.type == LIST)
        {
            for (const input of loop.inputs)
                this.setRepeatCount(input, count);
        }
        else
        {
            loop.repeatCount = count;
        }
    }
}



function assertVolatile(node)
{
    consoleAssert(
           node.loop.type == DEFINE
        || node.loop.type == FREEZE
        || node.loop.type == NUMBER_RANGE
        || node.loop.type == NUMBER_SEQUENCE
        || node.loop.type == NUMBER_RANDOM
        || node.loop.type == NUMBER_NOISE
        || node.loop.type == NUMBER_PROBABILITY
        || node.loop.type == LIST
        || node.loop.type == PARAM, // for OpStart
        'only volatile types can be repeated');
}