class GVectorNetwork
extends GOperator1
{
    points  = null;
    edges   = null;
    regions = null;



    constructor(nodeId, options)
    {
        super(VECTOR_NETWORK, nodeId, options);
    }



    copy()
    {
        const copy = new GVectorNetwork(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.points ) copy.points  = this.points .copy();
        if (this.edges  ) copy.edges   = this.edges  .copy();
        if (this.regions) copy.regions = this.regions.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const points  = this.points  ? (await this.points .eval(parse)).toValue() : null;
        const edges   = this.edges   ? (await this.edges  .eval(parse)).toValue() : null;
        const regions = this.regions ? (await this.regions.eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new VectorNetworkValue(
                this.nodeId,
                points  ?? input.points,  
                edges   ?? input.edges,
                regions ?? input.regions);
        }
        else
        {
            this.value = new VectorNetworkValue(
                this.nodeId, 
                points,       
                edges, 
                regions);
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


        if (   this.value.points   
            && this.value.edges  
            && this.value.regions)
        {
            // const points  = this.value.points .value;
            // const edges   = this.value.edges  .value;
            // const regions = this.value.regions.value;

            // const point = new FigmaVectorNetwork(this.nodeId, this.nodeId, this.nodeName, x, y);

            // point.createDefaultTransform(x, y);

            // this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    toValue()
    {
        const point = new VectorNetworkValue(
            this.nodeId,
            this.points .toValue(),
            this.edges  .toValue(),
            this.regions.toValue());

        point.objects = this.value.objects.map(o => o.copy());

        return point;
    }



    isValid()
    {
        return super.isValid()
            && this.points .isValid()
            && this.edges  .isValid()
            && this.regions.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.points ) this.points .pushValueUpdates(parse);
        if (this.edges  ) this.edges  .pushValueUpdates(parse);
        if (this.regions) this.regions.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.points ) this.points .invalidateInputs(from);
        if (this.edges  ) this.edges  .invalidateInputs(from);
        if (this.regions) this.regions.invalidateInputs(from);
    }
}