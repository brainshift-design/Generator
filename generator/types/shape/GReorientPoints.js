class GReorientPoints
extends GShape
{
    static { 
        GNode.types[ REORIENT_POINTS ] = this; 
    }
    

    inputs  = [];

    reverse = null;


    constructor(nodeId, options)
    {
        super(REORIENT_POINTS, nodeId, options);
    }


    reset()
    {
        super.reset();

        this.inputs  = [];

        this.reverse = null;
    }


    copy()
    {
        const copy = new GReorientPoints(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.reverse) 
            copy.reverse = this.reverse.copy();

        return copy;
    }


    async eval(parse)
    {
        if (this.isCached())
            return this;
        

        const reverse = await evalNumberValue(this.reverse, parse);


        // Collect all points from each input
        let allPoints = [];
        if (this.inputs.length > 0)
        {
            for (const input of this.inputs)
            {
                const value = await evalPointValue(input, parse)
                                   || await evalListValue(input, parse);
                
                if (value)
                {
                    if (value.type === POINT_VALUE)
                        allPoints.push(value);
                    else if (isListValueType(value.type))
                    {
                        for (const item of value.items)
                        {
                            if (item.type == POINT_VALUE)
                                allPoints.push(item);
                        }
                    }
                }
            }
        }

        // Sort points if we have any
        if (allPoints.length > 0)
        {
            this.value = new ListValue();
            const sortedPoints = GReorientPoints.reorientPoints(allPoints, reverse.value > 0);
            for (const pt of sortedPoints)
            {
                // Ensure each sorted point carries its basis copy
                this.value.items.push( pt.copy() );
            }
        }
        else
        {
            this.value = new ListValue();
        }
        

        this.setUpdateValues(parse, 
        [
            ['reverse', reverse]
        ]);
        

        await this.evalShapeBase(parse);
        await this.evalObjects(parse);
        

        this.validate();
        return this;
    }


    async evalObjects(parse, options = {})
    {
        this.value.objects = [];
        

        for (let i = 0; i < this.value.items.length; i++)
        {
            const ptValue = this.value.items[i];
            if (!ptValue) 
                continue;
            

            if (ptValue.x.isValid() && 
                ptValue.y.isValid())
            {
                const pointObj = new FigmaPoint(
                     this.nodeId,
                     this.nodeId + OBJECT_SEPARATOR + i,
                     this.nodeName,
                     ptValue.x.value,
                     ptValue.y.value);
                
                pointObj.createDefaultTransform(ptValue.x.value, ptValue.y.value);
                ptValue.objects = [pointObj];
                this.value.objects.push(pointObj);
            }
        }


        await super.evalObjects(parse);
    }


    isValid()
    {
        if (!super.isValid()) 
            return false;

        for (const input of this.inputs)
            if (!input.isValid())
                return false;

        return this.reverse && this.reverse.isValid();
    }


    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);
        this.inputs.forEach(i => i.pushValueUpdates(parse));
        if (this.reverse) 
            this.reverse.pushValueUpdates(parse);
    }


    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);
        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
        if (this.reverse) 
            this.reverse.invalidateInputs(parse, from, force);
    }


    iterateLoop(parse)
    {
        super.iterateLoop(parse);
        this.inputs.forEach(i => i.iterateLoop(parse));
        if (this.reverse) 
            this.reverse.iterateLoop(parse);
    }


    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
        
        const reorient = new GReorientPoints(nodeId, options);
        
        let nInputs = 0;
        if (!ignore)
            nInputs = parseInt(parse.move());
        
        if (parse.settings.logRequests) 
            logReq(reorient, parse, ignore, nInputs);
        
        if (ignore) 
        {
            genParseNodeEnd(parse, reorient);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
        
        parse.nTab++;
        
        for (let i = 0; i < nInputs; i++)
            reorient.inputs.push(genParse(parse));
        
        reorient.reverse = genParse(parse);
        
        parse.inParam = false;
        parse.nTab--;
        
        genParseNodeEnd(parse, reorient);
        return reorient;
    }


    // Compute the centroid and then sort by angle relative to the centroid.
    // If reverse is true, the resulting order is clockwise.
    static reorientPoints(points, reverse)
    {
        // Compute centroid
        let sumX = 0;
        let sumY = 0;
        for (const pt of points)
        {
            sumX += pt.x.value;
            sumY += pt.y.value;
        }
        const cx = sumX / points.length;
        const cy = sumY / points.length;
        
        // Compute angle for each point (atan2 returns radians)
        points.sort((a, b) => 
        {
            const angleA = Math.atan2(a.y.value - cy, a.x.value - cx);
            const angleB = Math.atan2(b.y.value - cy, b.x.value - cx);
            return angleA - angleB;
        });
        
        if (reverse)
        {
            points.reverse();
        }
        return points;
    }
}