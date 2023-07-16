class GVectorRegion
extends GOperator
{
    inputs  = [];

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

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.winding) copy.winding = this.winding.copy();
        if (this.props  ) copy.props   = this.props  .copy();

        return copy;
    }



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached()
            && this.winding.isCached()
            && this.props  .isCached();
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const winding = this.winding ? (await this.winding.eval(parse)).toValue() : null;
        const props   = this.props   ? (await this.props  .eval(parse)).toValue() : null;


        if (!isEmpty(this.inputs))
        {
            const loops = new ListValue();

            const loop = new ListValue();

            for (let i = 0; i < this.inputs.length; i++)
            {
                const input = (await this.inputs[i].eval(parse)).toValue();

                if (LIST_VALUES.includes(input.type))
                {
                    const _loop = new ListValue();

                    for (const item of input.items)
                    {
                        if (item.type == VECTOR_EDGE_VALUE)
                            _loop.items.push(item);
                    }

                    if (!isEmpty(_loop.items))
                        loops.items.push(_loop);
                }
                else
                {
                    consoleAssert(
                        input.type == VECTOR_EDGE_VALUE, 
                        'input.type must be VECTOR_EDGE_VALUE');

                    loop.items.push(input);
                }
            }


            if (!isEmpty(loop.items))
                loops.items.push(loop);


            this.value = new VectorRegionValue(
                loops, 
                winding,
                props);
        }
        else
            this.value = VectorRegionValue.NaN;


        await this.evalObjects(parse);


        this.updateValues = [['value', this.value]];


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (   !this.options.enabled
            || !this.value.isValid())
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
            this.winding.toValue(),
            this.props  .toValue());

        point.objects = this.value.objects.map(o => o.copy());

        return point;
    }



    isValid()
    {
        if (!super.isValid())
            return false;
            
        for (const input of this.inputs)
            if (!input.isCached())
                return false;
        
        return this.winding.isValid()
            && this.props  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.winding) this.winding.pushValueUpdates(parse);
        if (this.props  ) this.props  .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        this.inputs.forEach(i => i.invalidateInputs(from));

        if (this.winding) this.winding.invalidateInputs(from);
        if (this.props  ) this.props  .invalidateInputs(from);
    }
}