class GPoint
extends GOperator1
{
    x = null;
    y = null;



    constructor(nodeId, options)
    {
        super(POINT, nodeId, options);
    }



    copy()
    {
        const copy = new GPoint(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.x    ) copy.x     = this.x    .copy();
        if (this.y    ) copy.y     = this.y    .copy();

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

       
        await this.evalObjects(parse);


        this.setUpdateValues(parse, [['value', this.value]]);


        if (!this.x) this.x = this.value.x.copy();
        if (!this.y) this.y = this.value.y.copy();


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
            const x = this.value.x.value;
            const y = this.value.y.value;

            const point = new FigmaPoint(this.nodeId, this.nodeId, this.nodeName, x, y);

            point.createDefaultTransform(x, y);

            this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    toValue()
    {
        const point = new PointValue(
            this.nodeId,
            this.x.toValue(),
            this.y.toValue());

        point.objects = this.value.objects.map(o => o.copy());

        return point;
    }



    isValid()
    {
        return super.isValid()
            && this.x && this.x.isValid()
            && this.y && this.y.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x) this.x.pushValueUpdates(parse);
        if (this.y) this.y.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.x) this.x.invalidateInputs(parse, from);
        if (this.y) this.y.invalidateInputs(parse, from);
    }
}