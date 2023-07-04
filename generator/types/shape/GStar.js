
class GStar
extends GShape
{
    round  = null;
    points = null;
    convex = null;



    constructor(nodeId, options)
    {
        super(STAR, nodeId, options);
    }



    copy()
    {
        const copy = new GStar(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.round ) copy.round  = this.round .copy();
        if (this.points) copy.points = this.points.copy();
        if (this.convex) copy.convex = this.convex.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const [x, y, width, height] = await this.evalBaseParams(parse);

        const round  = this.round  ? (await this.round .eval(parse)).toValue() : null;
        const points = this.points ? (await this.points.eval(parse)).toValue() : null;
        const convex = this.convex ? (await this.convex.eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new StarValue(
                this.nodeId,
                x      ?? input.x,
                y      ?? input.y,
                width  ?? input.width,
                height ?? input.height,
                round  ?? input.round,
                points ?? input.points,
                convex ?? input.convex);
        }
        else
        {
            this.value = new StarValue(
                this.nodeId, 
                x, 
                y, 
                width, 
                height, 
                round, 
                points, 
                convex);
        }

             
        this.updateValues = [['value', this.value]];


        await this.evalShapeBase(parse, input);


        await this.evalObjects(parse);


        this.validate();

        return this;
   }



   async evalObjects(parse, options = {})
   {
       if (!this.options.enabled)
           return;
           
           
        this.value.objects = [];


        if (   this.value.x 
            && this.value.y 
            && this.value.width 
            && this.value.height 
            && this.value.round
            && this.value.points
            && this.value.convex)
        {
            let   x = this.value.x     .value;
            let   y = this.value.y     .value;
            let   w = this.value.width .value;
            let   h = this.value.height.value;
            const r = Math.max(0, this.value.round.value);
            const p = this.value.points.value;
            const c = this.value.convex.value;


            if (   w != 0
                && h != 0)
            {
                const star = new FigmaStar(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, r, p, c);

                star.createDefaultTransform(x, y);

                this.value.objects.push(star, ...star.createTransformPoints(parse, x, y, w, h));
            }
        }

       
        await super.evalObjects(parse);
    }



    toValue()
    {
        const star = new StarValue(
            this.nodeId,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue(),
            this.height.toValue(),
            this.round .toValue(),
            this.points.toValue(),
            this.convex.toValue());
 
        star.props   = this.props.toValue();
        star.objects = this.value.objects.map(o => o.copy());
 
        return star;
    }



    isValid()
    {
        return super.isValid()
            && this.round .isValid()
            && this.points.isValid()
            && this.convex.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.round ) this.round .pushValueUpdates(parse);
        if (this.points) this.points.pushValueUpdates(parse);
        if (this.convex) this.convex.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.round ) this.round .invalidateInputs(from);
        if (this.points) this.points.invalidateInputs(from);
        if (this.convex) this.convex.invalidateInputs(from);
    }
}