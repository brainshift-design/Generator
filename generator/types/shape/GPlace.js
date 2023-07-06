class GPlace
extends GOperator
{
    input  = null;

    points = null;
    loop   = null;

    iterationObjects = [];



    constructor(nodeId, options)
    {
        super(PLACE, nodeId, options);
    }



    copy()
    {
        const copy = new GPlace(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.points) copy.points = this.points.copy();
        if (this.loop  ) copy.loop   = this.loop  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        let points = this.points ? (await this.points.eval(parse)).toValue() : null;

        if (   points
            && points.type == POINT_VALUE)
            points = new ListValue([points]);


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


        if (points.items.length > 0)
        {
            if (this.input)
            {
                const startTime    = Date.now();
                let   showProgress = false;


                const nItems = 
                    this.options.enabled 
                    ? points.items.length
                    : 1;


                this.value.objects = [];


                parse.repeats.push(repeat);


                for (let i = 0, o = 0; i < points.items.length; i++)
                {
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
                        repeat.total     = nItems;
                    }
                    
                    
                    this.input.invalidateInputs(this);


                    let input = (await this.input.eval(parse)).toValue();

                    if (!LIST_VALUES.includes(input.type))
                        input = new ListValue([input]);

                    
                    if (input)
                    {
                        this.value.items.push(input.copy());


                        this.iterationObjects = [];


                        for (let j = 0; j < this.input.value.objects.length; j++, o++)
                        {
                            const obj = copyFigmaObject(this.input.value.objects[o % input.items.length]);

                            this.iterationObjects.push(obj.copy());

                            obj.nodeId      = this.nodeId;
                            obj.listId      = i;

                            obj.objectId    = obj.objectId + OBJECT_SEPARATOR + this.nodeId + ':' + (o+1).toString();
                            obj.objectName += ' ' + (o+1).toString();


                            obj.applyTransform(createTransform(
                                points.items[i].x.toNumber(),
                                points.items[i].y.toNumber()));

                                
                            this.value.objects.push(obj);
                        }
                    }


                    if (showProgress)
                        genUpdateNodeProgress(this.nodeId, i / nItems);
                }


                if (this.startTimer > -1)
                {
                    clearTimeout(this.startTimer);
                    this.startTimer = -1;
                }


                consoleAssert(parse.repeats.at(-1) == repeat, 'invalid nested repeat \'' + this.nodeId + '\'');
                parse.repeats.pop();
            }

            
            this.updateValues =
            [
                ['value',  this.value     ],
                ['points', points         ],
                ['loop',   NumberValue.NaN]
            ];
        }
        else
        {
            if (this.input)
                await this.input.eval(parse);

            this.updateValues = [['', NullValue]];
        }


        //await this.evalObjects(parse, {points: points});


        this.validate();

        return this;
    }



    // async evalObjects(parse, options = {})
    // {
    //     this.value.objects = this.input ? this.input.objects.map(o => o.copy()) : [];
    //     //this.value.objects = this.input ? this.input.objects.map(o => o.copy()) : [];

            
    //     if (!this.options.enabled)
    //         return;
            

    //     // const x = options.x.toNumber();
    //     // const y = options.y.toNumber();

    //     // const xform = createTransform(x, y);


    //     // let i = 0;
        
    //     // for (const obj of this.value.objects)
    //     // {
    //     //     obj.nodeId   = this.nodeId;
    //     //     obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

    //     //     obj.applyTransform(xform);
    //     // }

        
    //     await super.evalObjects(parse);
    // }



    isValid()
    {
        return super.isValid()
            && this.points.isValid()
            && this.loop  .isValid();
    }



    toValue()
    {
        return this.value.copy();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input ) this.input .pushValueUpdates(parse);
        if (this.points) this.points.pushValueUpdates(parse);
        if (this.loop  ) this.loop  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input ) this.input .invalidateInputs(from);
        if (this.points) this.points.invalidateInputs(from);
        if (this.loop  ) this.loop  .invalidateInputs(from);
    }
}