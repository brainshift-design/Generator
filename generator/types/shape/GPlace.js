class GPlace
extends GOperator
{
    input = null;

    points = null;



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

        if (this.points) copy.x = this.points.copy();

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


        this.value   = new ListValue();

        this.objects = [];


        if (this.input)
        {
            for (let i = 0, o = 0; i < points.items.length; i++)
            {
                this.input.invalidateInputs(from);
                let input = (await this.input.eval(parse)).toValue();


                if (!LIST_VALUES.includes(input.type))
                    input = new ListValue([input]);

                
                for (let j = 0; j < this.input.objects.length; j++, o++)
                {
                    const obj = copyFigmaObject(this.input.objects[o % input.items.length]);

                    obj.nodeId      = this.nodeId;

                    obj.objectId    = this.nodeId + ':' + (o+1).toString() + obj.objectId;
                    obj.objectName += ' ' + (o+1).toString();

                    obj.listId      = i;
    

                    obj.applyTransform(createTransform(
                        -obj.xp0.x + points.items[i].x,
                        -obj.xp0.y + points.items[i].y));


                    this.objects.push(obj);
                }
            }
        }

        
        this.updateValues =
        [
            //['value',  this.value],
            ['points', points    ]
        ];


        await this.evalObjects(parse, {points: points});


        this.validate();

        return this;
    }



    // async evalObjects(parse, options = {})
    // {
    //     this.objects = this.input ? this.input.objects.map(o => o.copy()) : [];
    //     //this.value.objects = this.input ? this.input.objects.map(o => o.copy()) : [];

            
    //     if (!this.options.enabled)
    //         return;
            

    //     // const x = options.x.toNumber();
    //     // const y = options.y.toNumber();

    //     // const xform = createTransform(x, y);


    //     // let i = 0;
        
    //     // for (const obj of this.objects)
    //     // {
    //     //     obj.nodeId   = this.nodeId;
    //     //     obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

    //     //     obj.applyTransform(xform);
    //     // }

        
    //     await super.evalObjects(parse);
    // }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.points    ) this.points    .pushValueUpdates(parse);
        if (this.y    ) this.y    .pushValueUpdates(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.points.isValid()
            && this.y.isValid();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input ) this.input .invalidateInputs(from);
        if (this.points     ) this.points     .invalidateInputs(from);
        if (this.y     ) this.y     .invalidateInputs(from);
    }



    toValue()
    {
        return this.value.copy();
    }
}