class GVectorVertex
extends GOperator1
{
    x     = null;
    y     = null;
    join  = null;
    cap   = null;
    round = null;



    constructor(nodeId, options)
    {
        super(VECTOR_VERTEX, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.x     = null;
        this.y     = null;
        this.join  = null;
        this.cap   = null;
        this.round = null;
    }



    copy()
    {
        const copy = new GVectorVertex(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.x    ) copy.x     = this.x    .copy();
        if (this.y    ) copy.y     = this.y    .copy();
        if (this.join ) copy.join  = this.join .copy();
        if (this.cap  ) copy.cap   = this.cap  .copy();
        if (this.round) copy.round = this.round.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        let   input = this.input ? (await this.input.eval(parse)).toValue() : null;

        const x     = this.x     ? (await this.x    .eval(parse)).toValue() : null;
        const y     = this.y     ? (await this.y    .eval(parse)).toValue() : null;
        const join  = this.join  ? (await this.join .eval(parse)).toValue() : null;
        const cap   = this.cap   ? (await this.cap  .eval(parse)).toValue() : null;
        const round = this.round ? (await this.round.eval(parse)).toValue() : null;


        if (input)
        {
            if (input.type == POINT_VALUE)
                input = new VectorVertexValue(input.nodeId, input.x, input.y);
            
            this.value = new VectorVertexValue(
                this.nodeId,
                x     ?? input.x,
                y     ?? input.y,
                join  ?? input.join,
                cap   ?? input.cap,
                round ?? input.round);
        }
        else
        {
            this.value = new VectorVertexValue(
                this.nodeId, 
                x, 
                y, 
                join, 
                cap, 
                round);
        }

       
        await this.evalObjects(parse);


        this.setUpdateValues(parse, [['value', this.value]]);


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
            && this.value.join 
            && this.value.cap  
            && this.value.round)
        {
            const x     = this.value.x    .value;
            const y     = this.value.y    .value;
            //const join  = this.value.join .value;
            //const cap   = this.value.cap  .value;
            //const round = this.value.round.value;

            const point = new FigmaPoint(this.nodeId, this.nodeId, this.nodeName, x, y);

            point.createDefaultTransform(x, y);

            this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    toValue()
    {
        const point = new VectorVertexValue(
            this.nodeId,
            this.x    .toValue(),
            this.y    .toValue(),
            this.join .toValue(),
            this.cap  .toValue(),
            this.round.toValue());

        point.copyCustomParams(this.value);

        point.objects  = this.value.objects.map(o => o.copy());
        point.uniqueId = this.value.uniqueId;

        return point;
    }



    isValid()
    {
        return super.isValid()
            && this.x    .isValid()
            && this.y    .isValid()
            && this.join .isValid()
            && this.cap  .isValid()
            && this.round.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x    ) this.x    .pushValueUpdates(parse);
        if (this.y    ) this.y    .pushValueUpdates(parse);
        if (this.join ) this.join .pushValueUpdates(parse);
        if (this.cap  ) this.cap  .pushValueUpdates(parse);
        if (this.round) this.round.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.x    ) this.x    .invalidateInputs(parse, from, force);
        if (this.y    ) this.y    .invalidateInputs(parse, from, force);
        if (this.join ) this.join .invalidateInputs(parse, from, force);
        if (this.cap  ) this.cap  .invalidateInputs(parse, from, force);
        if (this.round) this.round.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.x    ) this.x    .iterateLoop(parse);
        if (this.y    ) this.y    .iterateLoop(parse);
        if (this.join ) this.join .iterateLoop(parse);
        if (this.cap  ) this.cap  .iterateLoop(parse);
        if (this.round) this.round.iterateLoop(parse);
    }
}