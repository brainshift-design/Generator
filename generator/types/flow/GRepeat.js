class GRepeat
extends GOperator
{
    input = null;

    count;
    loop;



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
                   this.loop.type == NUMBER_DISTRIBUTE
                || this.loop.type == NUMBER_SEQUENCE
                || this.loop.type == NUMBER_RANDOM
                || this.loop.type == LIST,
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
                        this.invalidateRepeat(this.loop, this.nodeId);

                        repeat.iteration = i;
                        repeat.total     = nItems;
                    }
                    
                    
                    this.input.invalidate();
                    await this.input.eval(parse);

                    
                    for (let j = 0; j < this.input.objects.length; j++, o++)
                    {
                        const obj = copyFigmaObject(this.input.objects[j]);

                        obj.nodeId = this.nodeId;

                        obj.objectId    = this.nodeId + ':' + (o+1).toString() + obj.objectId;
                        obj.objectName += ' ' + (o+1).toString();

                        obj.listId = i;
        
                        this.objects.push(obj);
                    }
        

                    const input = this.input.toValue();

                    if (input)
                        this.value.items.push(input.copy());
                }


                console.assert(parse.repeats.at(-1) == repeat, 'invalid nested repeat');
                parse.repeats.pop();
            }


            this.updateValues =
            [
                ['value',  this.value     ],
                ['count',  count          ],
                ['loop',   NumberValue.NaN]
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



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        if (this.count) this.count.invalidate();
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



    invalidateRepeat(loop, nodeId)
    {
        if (loop.type == LIST)
        {
            for (const input of loop.inputs)
            {
                input.valid        = false;
                input.loopId = nodeId;
            }
        }
        else
        {
            loop.valid        = false;
            loop.loopId = nodeId;
        }
    }
}