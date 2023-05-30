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

            
        const points = this.points ? (await this.points.eval(parse)).toValue() : null;


        this.evalObjects(parse, {points: points});


        if (this.input)
        {
            this.value = new ListValue();
        }
        else
            this.value = NullValue;

        
        this.updateValues =
        [
            ['points', points]
        ];


        this.validate();

        return this;
    }



    evalObjects(parse, options = {})
    {
        this.objects = this.input ? this.input.objects.map(o => o.copy()) : [];
        //this.value.objects = this.input ? this.input.objects.map(o => o.copy()) : [];

            
        if (!this.options.enabled)
            return;
            

        // const x = options.x.toNumber();
        // const y = options.y.toNumber();

        // const xform = createTransform(x, y);


        // let i = 0;
        
        // for (const obj of this.objects)
        // {
        //     obj.nodeId   = this.nodeId;
        //     obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;

        //     obj.applyTransform(xform);
        // }

        
        super.evalObjects(parse);
    }



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



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input ) this.input .invalidateInputs();
        if (this.points     ) this.points     .invalidateInputs();
        if (this.y     ) this.y     .invalidateInputs();
    }



    toValue()
    {
        return this.value.copy();
    }
}