class GLine
extends GShape
{
    input = null;



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


        const [x, y, width, height] = await this.evalBaseParams(parse, false);

            
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
            this.value = new LineValue(this.nodeId, x, y, width);
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
            

        const objects = [];


        if (   this.x 
            && this.y 
            && this.width) 
        {
            let  x = this.value.x     .value;
            let  y = this.value.y     .value;
            let  w = this.value.width .value;
            let  a = 0;
            let _a = a/360*Tau;


            [x, y, w, , a, _a] = validateObjectRect(x, y, w, 0, a, _a);


            if (w != 0)
            {
                const line = new FigmaLine(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, a);

                line.createDefaultTransform(x, y);
                
                objects.push(line, ...line.createTransformPoints(parse, x, y, w, 0.01));
            }
        }

        
        this      .objects = [...objects];
        this.value.objects = [...objects];


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
            this.width .toValue());

        line.props   = this.props.toValue();
        line.objects = this.objects.map(o => o.copy());

        return line;
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input) this.input.invalidateInputs(from);
    }
}