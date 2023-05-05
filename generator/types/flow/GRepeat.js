class GRepeat
extends GOperator
{
    input = null;

    count;
    repeatId;



    constructor(nodeId, options)
    {
        super(REPEAT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GRepeat(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) copy.input = this.input.copy();

        copy.value    = this.value   .copy();
        copy.count    = this.count   .copy();
        copy.repeatId = this.repeatId.copy();

        return copy;
    }



    isCached()
    {
        return this.valid;//
            //|| this.repeatId;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        let count = (await this.count.eval(parse)).toValue();
        //const repeatId = (await this.repeatId.eval(parse)).toValue();


        count = new NumberValue(Math.round(count.value));


        if (this.repeatId.type != NUMBER_VALUE)
        {
            console.assert(
                   this.repeatId.type == NUMBER_DISTRIBUTE
                || this.repeatId.type == NUMBER_SEQUENCE
                || this.repeatId.type == NUMBER_RANDOM
                || this.repeatId.type == LIST,
                'only volatile types can be repeated');

            setRepeatCount(this.repeatId, count.value);
        }


        this.value = new ListValue();

        this.objects = [];


        let repeat =             
        {
            nodeId:    this.nodeId,
            iteration: 0,
            total:     1
        };

        //if (this.repeatId.type != NUMBER_VALUE)
        
        
        if (this.input)
        {
            const nItems = 
                this.options.enabled 
                ? count.value 
                : 1;
            
            
            parse.repeats.push(repeat);


            for (let i = 0, o = 0; i < nItems; i++)
            {
                if (this.repeatId.type != NUMBER_VALUE)
                {
                    invalidateRepeat(this.repeatId, this.nodeId);

                    repeat.iteration = i;
                    repeat.total     = nItems;
                }
                
                
                this.input.invalidate();
                await this.input.eval(parse);

                
                for (let j = 0; j < this.input.objects.length; j++, o++)
                {
                    const obj = copyFigmaObject(this.input.objects[j]);

                    obj.nodeId = this.nodeId;

                    if (obj.objectId != NULL) obj.objectId += ' ';
                    obj.objectId += (o+1).toString();

                    obj.listId = i;
    
                    this.objects.push(obj);
                }
    

                const input = this.input.toValue();

                if (input)
                    this.value.items.push(input.copy());
            }


            console.assert(parse.repeats.at(-1) == repeat, 'invalid nested repeat');
            parse.repeats.pop();

                
            if (this.repeatId)
                uninitRepeat(this.repeatId);
        }


        this.updateValues =
        [
            ['value',    this.value     ],
            ['count',    count          ],
            ['repeatId', NumberValue.NaN]
        ];


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
}



function setRepeatCount(repeat, count)
{
    if (repeat.type == LIST)
    {
        for (const input of repeat.inputs)
            setRepeatCount(input, count);
    }
    else
    {
        repeat.repeatCount = count;
    }
}



function invalidateRepeat(repeat, nodeId)
{
    if (repeat.type == LIST)
    {
        for (const input of repeat.inputs)
        {
            input.valid        = false;
            input.repeatNodeId = nodeId;
        }
    }
    else
    {
        repeat.valid        = false;
        repeat.repeatNodeId = nodeId;
    }
}



function uninitRepeat(repeat)
{
    if (repeat.type == LIST)
    {
        for (const input of repeat.inputs)
            uninitRepeat(input);
    }
    else
    {
        repeat.init = false;
    }
}