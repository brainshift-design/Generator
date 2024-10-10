class GPointCorner
extends GOperator1
{
    smooth = null;



    constructor(nodeId, options)
    {
        super(POINT_CORNER, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.smooth = null;
    }



    copy()
    {
        const copy = new GPointCorner(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value ) copy.value  = this.value .copy();
        if (this.smooth) copy.smooth = this.smooth.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const input  = await evalPointValue (this.input,  parse);
        const smooth = await evalNumberValue(this.smooth, parse);
        
        if (input)
        {
            this.value        = input;
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            this.value.smooth = smooth;


            if (   this.value.objects
                && this.value.objects.length > 0)
            {
                this.value.x = new NumberValue(this.value.objects[0].x);
                this.value.y = new NumberValue(this.value.objects[0].y);
            }
        }
        else
            this.value = PointValue.NaN();


        await this.evalObjects(parse);


        this.setUpdateValues(parse, 
        [
            ['smooth', smooth]
        ]);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        this.value.objects = [];


        if (   this.value.x.isValid()
            && this.value.y.isValid())
        {
            const x      = this.value.x.value;
            const y      = this.value.y.value;
            const smooth = this.value.smooth ? this.value.smooth.value/100 : 1;

            const point = new FigmaPoint(
                this.nodeId, 
                this.nodeId, 
                this.nodeName, 
                x, 
                y, 
                smooth);

            point.createDefaultTransform(x, y);

            this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    toNewValue()
    {
        return this.value.copy();
    //     const point = new PointValue(
    //         this.nodeId,
    //         this.x.toNewValue(),
    //         this.y.toNewValue());

    //     point.objects = 
    //         this.value.objects
    //         ? this.value.objects.map(o => o.copy())
    //         : [];

    //     return point;
    }



    isValid()
    {
        return super.isValid()
            && this.smooth && this.smooth.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.smooth) this.smooth.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.smooth) this.smooth.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.smooth) this.smooth.iterateLoop(parse);
    }
}