class GVectorEdge
extends GOperator1
{
    start        = null;
    startTangent = null;
    end          = null;
    endTangent   = null;



    constructor(nodeId, options)
    {
        super(VECTOR_EDGE, nodeId, options);
    }



    copy()
    {
        const copy = new GVectorEdge(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.start       ) copy.start        = this.start       .copy();
        if (this.startTangent) copy.startTangent = this.startTangent.copy();
        if (this.end         ) copy.end          = this.end         .copy();
        if (this.endTangent  ) copy.endTangent   = this.endTangent  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const start        = this.start        ? (await this.start       .eval(parse)).toValue() : null;
        const startTangent = this.startTangent ? (await this.startTangent.eval(parse)).toValue() : null;
        const end          = this.end          ? (await this.end         .eval(parse)).toValue() : null;
        const endTangent   = this.endTangent   ? (await this.endTangent  .eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new VectorEdgeValue(
                this.nodeId,
                start        ?? input.start,       
                startTangent ?? input.startTangent,
                end          ?? input.end,         
                endTangent   ?? input.endTangent);
        }
        else
        {
            this.value = new VectorEdgeValue(
                this.nodeId, 
                start,       
                startTangent, 
                end,         
                endTangent);
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


        if (   this.value.start       
            && this.value.startTangent
            && this.value.end         
            && this.value.endTangent)
        {
            // const start        = this.value.start       .value;
            // const startTangent = this.value.startTangent.value;
            // const end          = this.value.end         .value;
            // const endTangent   = this.value.endTangent  .value;

            // const point = new FigmaPoint(this.nodeId, this.nodeId, this.nodeName, x, y);

            // point.createDefaultTransform(x, y);

            // this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    toValue()
    {
        const point = new VectorEdgeValue(
            this.nodeId,
            this.start       .toValue(),
            this.startTangent.toValue(),
            this.end         .toValue(),
            this.endTangent  .toValue());

        point.objects = this.value.objects.map(o => o.copy());

        return point;
    }



    isValid()
    {
        return super.isValid()
            && this.start       .isValid()
            && this.startTangent.isValid()
            && this.end         .isValid()
            && this.endTangent  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start       ) this.start       .pushValueUpdates(parse);
        if (this.startTangent) this.startTangent.pushValueUpdates(parse);
        if (this.end         ) this.end         .pushValueUpdates(parse);
        if (this.endTangent  ) this.endTangent  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.start       ) this.start       .invalidateInputs(from);
        if (this.startTangent) this.startTangent.invalidateInputs(from);
        if (this.end         ) this.end         .invalidateInputs(from);
        if (this.endTangent  ) this.endTangent  .invalidateInputs(from);
    }
}