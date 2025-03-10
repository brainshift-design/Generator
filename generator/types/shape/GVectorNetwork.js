class GVectorNetwork
extends GShape
{
    static { GNode.types[VECTOR_NETWORK] = this; }



    inputs = [];



    constructor(nodeId, options)
    {
        super(VECTOR_NETWORK, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.inputs = [];
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

        
        const regions = new ListValue();

        for (let i = 0; i < this.inputs.length; i++)
        {
            const input = await evalVectorRegionValue(this.inputs[i], parse);

            consoleAssert(
                 input.type == VECTOR_REGION_VALUE, 
                'input.type must be VECTOR_REGION_VALUE');

            regions.items.push(input);
        }


        this.value = new VectorNetworkValue(
            this.nodeId,
            regions);


        this.setUpdateValues(parse, 
        [
            ['value', this.value]
        ]);


        await this.evalShapeBase(parse);

        
        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (   !this.options.enabled
            || !this.value.isValid())
            return;
            
            
        this.value.objects = [];


        if (!isEmpty(this.value.regions.items))
        {
            let points  = [];
            let edges   = [];
            let regions = [];


            for (const region of this.value.regions.items)
            {
                if (!isEmpty(region.objects))
                    region.fills = region.objects[0].fills;


                if (region.loops)
                {
                    for (const loop of region.loops.items)
                    {
                        for (const edge of loop.items)
                        {
                            pushUniqueBy(points, edge.start, p => p.uniqueId == edge.start.uniqueId);
                            pushUniqueBy(points, edge.end,   p => p.uniqueId == edge.end  .uniqueId);

                            pushUniqueBy(edges, edge, e => e.uniqueId == edge.uniqueId);
                        }
                    }

                    pushUniqueBy(regions, region, r => r.uniqueId == region.uniqueId);
                }
            }

            
            const network = new FigmaVectorNetwork(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                points,
                edges,
                regions);

            
            const bounds = getObjBounds([network]);

            let x = bounds.x;
            let y = bounds.y;
            let w = bounds.w;
            let h = bounds.h;


            network.createDefaultTransform(x, y);
            network.createDefaultTransformPoints(x, y, w, h);

            this.value.objects.push(network);
        }


        await super.evalObjects(parse);
    }



    // toNewValue()
    // {
    //     const network = new VectorNetworkValue(
    //         this.nodeId,
    //         this.regions.toNewValue());

    //     network.copyCustomParams(this.value);

    //     network.uniqueId = this.value.uniqueId;
    //     network.objects  = this.value.objects.map(o => o.copy());

    //     return network;
    // }



    isValid()
    {
        return super.isValid()
            && this.regions.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const network = new GVectorNetwork(nodeId, options);
    
    
        let nInputs = 0;
        
        if (!ignore)
            nInputs = parseInt(parse.move());
    
    
        if (parse.settings.logRequests) 
            logReq(network, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, network);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        for (let i = 0; i < nInputs; i++)
            network.inputs.push(genParse(parse));
    
        network.props = genParse(parse);
    
    
        parse.nTab--;
    
    
    
        genParseNodeEnd(parse, network);
        return network;
    }
}