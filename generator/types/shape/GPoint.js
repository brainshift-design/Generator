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
            this.value = new PointValue(this.nodeId, x, y);
        }

       
        if (parse.isLastRepeat())
        {
            genPushUpdateValue(parse, this.nodeId, 'value', this.value);
            genPushUpdateValue(parse, this.nodeId, 'x',     x         );
            genPushUpdateValue(parse, this.nodeId, 'y',     y         );
        }


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        if (   this.value.x
            && this.value.y)
        {
            const size = 8 / parse.viewportZoom;

            const point = new FigmaEllipse(
                this.nodeId,
                NULL,
                this.value.x.value - size/2,
                this.value.y.value - size/2,
                size,
                size,
                0);

            point  .fills.push(['SOLID', '255 255 255 100']);
            point.strokes.push(['SOLID',  '12 140 233 100']);

            point.strokeWeight     =  1.25 / parse.viewportZoom;
            point.strokeAlign      = 'INSIDE';
            point.strokeJoin       = 'MITER';
            point.strokeMiterLimit =  28.96;
            point.data             = 'point';
            point._x               = this.value.x.value;
            point._y               = this.value.y.value;

            this.objects = [point];
        }

        
        await super.evalObjects(parse);
    }



    toValue()
    {
        const rect = new PointValue(
            this.nodeId,
            this.x.toValue(),
            this.y.toValue());

        return rect;
    }



    isValid()
    {
        return super.isValid()
            && this.x.isValid()
            && this.y.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
        if (this.x    ) this.x    .invalidate();
        if (this.y    ) this.y    .invalidate();
    }
}