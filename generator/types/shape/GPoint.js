class GPoint
extends GOperator
{
    input = null;

    x     = null;
    y     = null;



    constructor(nodeId, options)
    {
        super(POINT, nodeId, options);
    }



    copy()
    {
        const copy = new GPoint(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.x) copy.x = this.x.copy();
        if (this.y) copy.y = this.y.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const x = this.x ? (await this.x.eval(parse)).toValue() : null;
        const y = this.y ? (await this.y.eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new PointValue(
                this.nodeId,
                x ?? input.x,
                y ?? input.y);
        }
        else
        {
            this.value = new PointValue(
                this.nodeId, 
                x, 
                y);
        }

       
        this.updateValues =
        [
            [returnValueId, this.value],
            ['x',     x         ],
            ['y',     y         ]
        ];


        this.evalObjects(parse);


        this.validate();

        return this;
    }



    evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        if (   this.value.x
            && this.value.y)
        {
           const point = new FigmaPoint(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                this.value.x.value,
                this.value.y.value)

            point.createDefaultTransform(
                0, //this.value.x.value,
                0, //this.value.y.value,
                0);

            this.objects       = [point];
            this.value.objects = [point];
        }

        
        if (this.value)
            this.value.objects = this.objects.map(o => o.copy());


        super.evalObjects(parse);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.x    ) this.x    .pushValueUpdates(parse);
        if (this.y    ) this.y    .pushValueUpdates(parse);
    }



    toValue()
    {
        const point = new PointValue(
            this.nodeId,
            this.x.toValue(),
            this.y.toValue());

        point.objects = this.objects.map(o => o.copy());

        return point;
    }



    isValid()
    {
        return super.isValid()
            && this.x.isValid()
            && this.y.isValid();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input) this.input.invalidateInputs();
        if (this.x    ) this.x    .invalidateInputs();
        if (this.y    ) this.y    .invalidateInputs();
    }
}