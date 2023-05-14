class GLine
extends GShape
{
    input  = null;



    constructor(nodeId, options)
    {
        super(LINE, nodeId, options);
    }



    copy()
    {
        const copy = new GLine(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const [x, y, width, height, angle] = await this.evalBaseParams(parse, false);

            
        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new LineValue(
                this.nodeId,
                x     ?? input.x,
                y     ?? input.y,
                width ?? input.width,
                angle ?? input.angle);
        }
        else
        {
            this.value = new LineValue(this.nodeId, x, y, width, angle);
        }


        this.updateValues = [['value', this.value]];


        await this.evalShapeBase(parse, input, false);


        this.evalObjects(parse);


        this.validate();

        return this;
    }



    evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        if (   this.x 
            && this.y 
            && this.width 
            && this.angle)
        {
            const line = new FigmaLine(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                this.value.x    .value,
                this.value.y    .value,
                this.value.width.value,
                this.value.angle.value);

            line.createDefaultTransform(
                this.value.x    .value,
                this.value.y    .value,
                this.value.angle.value/360*Tau);

            this.objects       = [line];
            this.value.objects = [line];
        }

        
        super.evalObjects(parse);
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    toValue()
    {
        const line = new LineValue(
            this.nodeId,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue(),
            this.angle .toValue());

        line.props   = this.props.toValue();
        line.objects = this.objects.map(o => o.copy());

        return line;
    }



    invalidate()
    {
        super.invalidate();

        if (this.input) this.input.invalidate();
    }
}