class GVectorNetwork
extends GOperator
{
    inputs  = [];



    constructor(nodeId, options)
    {
        super(VECTOR_NETWORK, nodeId, options);
    }



    copy()
    {
        const copy = new GVectorNetwork(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        return copy;
    }



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached();
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        if (!isEmpty(this.inputs))
        {
            const regions = new ListValue();

            for (let i = 0; i < this.inputs.length; i++)
            {
                const input = (await this.inputs[i].eval(parse)).toValue();

                consoleAssert(
                    input.type == VECTOR_REGION_VALUE, 
                    'input.type must be VECTOR_REGION_VALUE');

                regions.items.push(input);
            }


            this.value = new VectorNetworkValue(regions);
        }
        else
            this.value = VectorNetworkValue.NaN;

       
        await this.evalObjects(parse);


        console.log('GVectorNetwork.value =', this.value);
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


        if (this.value.regions)
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
            this.regions.toValue());

        point.objects = this.value.objects.map(o => o.copy());

        return point;
    }



    isValid()
    {
        return super.isValid()
            && this.regions.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.regions) this.regions.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.regions) this.regions.invalidateInputs(from);
    }
}