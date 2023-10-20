class GLine
extends GShape
{
    constructor(nodeId, options)
    {
        super(LINE, nodeId, options);
    }



    copy()
    {
        const copy = new GLine(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const [x, y, width, ] = await this.evalBaseParams(parse, false);

            
        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new LineValue(
                this.nodeId,
                x     ?? input.x,
                y     ?? input.y,
                width ?? input.width);
        }
        else
        {
            this.value = new LineValue(
                this.nodeId, 
                x, 
                y, 
                width);
        }


        this.setUpdateValues(parse, [['value', this.value]]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (this.input)
        {
            this.x     = this.value.x    .copy();
            this.y     = this.value.y    .copy();
            this.width = this.value.width.copy();
        }


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        this.value.objects = [];


        if (   super.baseIsValid()   
            && this.value.x    .isValid()
            && this.value.y    .isValid()
            && this.value.width.isValid()) 
        {
            let x = this.value.x    .value;
            let y = this.value.y    .value;
            let w = this.value.width.value;


            [x, y, w, , , ] = validateObjectRect(x, y, w, 0);


            if (w != 0)
            {
                const line = new FigmaLine(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w);

                line.createDefaultTransform(x, y);
                line.createDefaultTransformPoints(x, y, w, 0.01);
                
                this.value.objects.push(line);
            }
        }

        
        await super.evalObjects(parse);
    }



    toValue()
    {
        const line = new LineValue(
            this.nodeId,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue());

        line.props   = this.props.toValue();
        line.objects = this.value.objects.map(o => o.copy());

        return line;
    }
}