class GVectorRegion
extends GOperator1
{
    loops   = null;
    winding = null;
    props   = null;



    constructor(nodeId, options)
    {
        super(VECTOR_REGION, nodeId, options);
    }



    copy()
    {
        const copy = new GVectorRegion(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.loops  ) copy.loops   = this.loops  .copy();
        if (this.winding) copy.winding = this.winding.copy();
        if (this.props  ) copy.props   = this.props  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const loops   = this.loops   ? (await this.loops  .eval(parse)).toValue() : null;
        const winding = this.winding ? (await this.winding.eval(parse)).toValue() : null;
        const props   = this.props   ? (await this.props  .eval(parse)).toValue() : null;


        let input = null;

        if (this.input)
        {
            input = (await this.input.eval(parse)).toValue();

            this.value = new VectorRegionValue(
                this.nodeId,
                loops   ?? input.loops,  
                winding ?? input.winding,
                props   ?? input.props);  
        }
        else
        {
            this.value = new VectorRegionValue(
                this.nodeId, 
                loops,       
                winding, 
                props);
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


        if (   this.value.loops    
            && this.value.winding
            && this.value.props)
        {
            // const loops   = this.value.loops  .value;
            // const winding = this.value.winding.value;
            // const props   = this.value.props  .value;

            // const point = new FigmaPoint(this.nodeId, this.nodeId, this.nodeName, x, y);

            // point.createDefaultTransform(x, y);

            // this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    toValue()
    {
        const point = new VectorRegionValue(
            this.nodeId,
            this.loops  .toValue(),
            this.winding.toValue(),
            this.props  .toValue());

        point.objects = this.value.objects.map(o => o.copy());

        return point;
    }



    isValid()
    {
        return super.isValid()
            && this.loops  .isValid()
            && this.winding.isValid()
            && this.props  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.loops  ) this.loops  .pushValueUpdates(parse);
        if (this.winding) this.winding.pushValueUpdates(parse);
        if (this.props  ) this.props  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.loops  ) this.loops  .invalidateInputs(from);
        if (this.winding) this.winding.invalidateInputs(from);
        if (this.props  ) this.props  .invalidateInputs(from);
    }
}