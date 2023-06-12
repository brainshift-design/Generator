class GRepeat
extends GOperator
{
    input = null;

    count;
    loop;

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

        copy.value = this.value.copy();
        copy.count = this.count.copy();
        copy.loop  = this.loop .copy();

        return copy;
    }



    isCached()
    {
        return this.valid;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        let count = (await this.count.eval(parse)).toValue();


        count = new NumberValue(Math.round(count.value));


        if (this.loop.type != NUMBER_VALUE)
        {
            console.assert(
                   this.loop.type == NUMBER_DEFINE
                || this.loop.type == NUMBER_DISTRIBUTE
                || this.loop.type == NUMBER_SEQUENCE
                || this.loop.type == NUMBER_RANDOM
                || this.loop.type == LIST
                || this.loop.type == PARAM, // for OpStart
                'only volatile types can be repeated');

            this.setRepeatCount(this.loop, count.value);
        }


        this.value = new ListValue();

        this.objects = [];


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
                const nItems = 
                    this.options.enabled 
                    ? count.value 
                    : 1;
                
                
                parse.repeats.push(repeat);


                for (let i = 0, o = 0; i < nItems; i++)
                {
                    if (this.loop.type != NUMBER_VALUE)
                    {
                        this.invalidateRepeat(parse, this.loop, this.nodeId);

                        repeat.iteration = i;
                        repeat.total     = nItems;
                    }
                    
                    
                    this.input.invalidateInputs(this);
                    
                   
                    const input = (await this.input.eval(parse)).toValue();

                    if (input)
                    {
                        this.value.items.push(input.copy());


                        this.iterationObjects = [];
                    
                        for (let j = 0; j < this.input.objects.length; j++, o++)
                        {
                            const obj = copyFigmaObject(this.input.objects[j]);

                            this.iterationObjects.push(obj.copy());

                            obj.nodeId      = this.nodeId;
                            obj.listId      = i;

                            obj.objectId    = obj.objectId + OBJECT_SEPARATOR + this.nodeId + ':' + (o+1).toString();
                            obj.objectName += ' ' + (o+1).toString();

                            this      .objects.push(obj);
                            this.value.objects.push(obj);
                        }
                    }
                }


                console.assert(parse.repeats.at(-1) == repeat, 'invalid nested repeat');
                parse.repeats.pop();
            }


            this.updateValues =
            [
                ['value', this.value     ],
                ['count', count          ],
                ['loop',  NumberValue.NaN]
            ];
        }
        else
        {
            if (this.input)
                await this.input.eval(parse);

            this.updateValues = [['', NullValue]];
        }


        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.count) this.count.pushValueUpdates(parse);
    }



    toValue()
    {
        return this.value.copy();
    }



    invalidateInputs(src)
    {
        super.invalidateInputs(src);

        if (this.input) this.input.invalidateInputs(src);
        if (this.count) this.count.invalidateInputs(src);
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
        if (input.type == PARAM)
            input = parse.parsedNodes.find(n => n.nodeId == input.nodeId);

        input.valid  = false;
        input.loopId = this.nodeId;
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