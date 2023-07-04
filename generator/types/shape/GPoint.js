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

       
        await this.evalObjects(parse);


        this.updateValues = [['value', this.value]];


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        this.value.objects = [];


        if (   this.value.x
            && this.value.y)
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
            && this.x.isValid()
            && this.y.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x) this.x.pushValueUpdates(parse);
        if (this.y) this.y.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.x) this.x.invalidateInputs(from);
        if (this.y) this.y.invalidateInputs(from);
    }
}