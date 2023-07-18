class GVectorEdge
extends GOperator1
{
    input0       = null;
    input1       = null;

    startTangent = null;
    endTangent   = null;



    constructor(nodeId, options)
    {
        super(VECTOR_EDGE, nodeId, options);
    }



    copy()
    {
        const copy = new GVectorEdge(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input0      ) copy.input0       = this.input0      .copy();
        if (this.input1      ) copy.input1       = this.input1      .copy();
        if (this.startTangent) copy.startTangent = this.startTangent.copy();
        if (this.endTangent  ) copy.endTangent   = this.endTangent  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const input0       = this.input0       ? (await this.input0      .eval(parse)).toValue() : VectorVertexValue.NaN;
        const input1       = this.input1       ? (await this.input1      .eval(parse)).toValue() : VectorVertexValue.NaN;
        const startTangent = this.startTangent ? (await this.startTangent.eval(parse)).toValue() : PointValue.NaN;
        const   endTangent = this.  endTangent ? (await this.  endTangent.eval(parse)).toValue() : PointValue.NaN;


        this.value = new VectorEdgeValue(
            this.nodeId,
            input0,
            input1,
            startTangent,
              endTangent);


        await this.evalObjects(parse);


        this.updateValues = [['value', this.value]];


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (   !this.options.enabled
            || !this.value.start.isValid()
            || !this.value.end  .isValid())
            return;
            
            
        this.value.objects = [];


        if (   this.value.start.isValid()
            && this.value.end  .isValid())
        {
            const path = new FigmaVectorPath(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                [ this.value.start,
                  this.value.startTangent.isValid() ? this.value.startTangent : this.value.start,
                  this.value.endTangent  .isValid() ? this.value.  endTangent : this.value.end,
                  this.value.end ],
                0,
                2, // cubic
                0,
                0);

            
            const bounds = getObjBounds([path]);

            let x = bounds.x;
            let y = bounds.y;
            let w = bounds.w;
            let h = bounds.h;


            path.createDefaultTransform(x, y);


            this.value.objects.push(path, ...path.createTransformPoints(parse, x, y, w, h));
        }


        await super.evalObjects(parse);
    }



    toValue()
    {
        const edge = new VectorEdgeValue(
            this.nodeId,
            this.input0 ? this.input0.toValue() : VectorVertexValue.NaN,
            this.input1 ? this.input1.toValue() : VectorVertexValue.NaN,
            this.startTangent.toValue(),
            this.endTangent  .toValue());

        edge.uniqueId = this.value.uniqueId;
        edge.objects  = this.value.objects.map(o => o.copy());

        return edge;
    }



    isValid()
    {
        return super.isValid()
            && this.input0      .isValid()
            && this.input1      .isValid()
            && this.startTangent.isValid()
            && this.endTangent  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0      ) this.input0      .pushValueUpdates(parse);
        if (this.input1      ) this.input1      .pushValueUpdates(parse);
        if (this.startTangent) this.startTangent.pushValueUpdates(parse);
        if (this.endTangent  ) this.endTangent  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input0      ) this.input0      .invalidateInputs(from);
        if (this.input1      ) this.input1      .invalidateInputs(from);
        if (this.startTangent) this.startTangent.invalidateInputs(from);
        if (this.endTangent  ) this.endTangent  .invalidateInputs(from);
    }
}