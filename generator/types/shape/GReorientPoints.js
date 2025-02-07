class GReorientPoints
extends GOperator1
{
    static { GNode.types[REORIENT_POINTS] = this; }
    


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

        if (this.reverse) copy.reverse = this.reverse.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
        

        const reverse = await evalNumberValue(this.reverse, parse);


        let points = [];

        if (this.inputs.length > 0)
        {
            for (const input of this.inputs)
            {
                const value = await evalValue(input, parse);
                
                if (value)
                {
                    if (value.type == POINT_VALUE)
                        points.push(value);
                 
                    else if (isListValueType(value.type))
                    {
                        for (const item of value.items)
                        {
                            if (item.type == POINT_VALUE)
                                points.push(item);
                        }
                    }
                }
            }
        }


        if (points.length > 0)
        {
            this.value = new ListValue();

            const sortedPoints = GReorientPoints.reorientPoints(points, reverse.value > 0);

            for (const pt of sortedPoints)
                this.value.items.push(pt.copy());
        }
        else
        {
            this.value = new ListValue();
        }
        

        this.setUpdateValues(parse, 
        [
            ['reverse', reverse]
        ]);
        

        await this.evalObjects(parse);
        

        this.validate();
        return this;
    }


    
    async evalObjects(parse, options = {})
    {
        this.value.objects = [];
        

        for (let i = 0; i < this.value.items.length; i++)
        {
            const _points = this.value.items[i];
            if (!_points) continue;
            

            if (_points.x.isValid() && 
                _points.y.isValid())
            {
                const point = new FigmaPoint(
                    this.nodeId,
                    this.nodeId + OBJECT_SEPARATOR + i,
                    this.nodeName,
                    _points.x.value,
                    _points.y.value);
               
                _points.objects = [point];
                

                this.value.objects.push(point);
            }
        }


        const bounds = getObjBounds(this.value.objects);

        for (const path of this.value.objects)
        {
            path.createDefaultSpace(
                bounds.x + bounds.width /2,            
                bounds.y + bounds.height/2            
            );


            let x = bounds.x;
            let y = bounds.y;
            let w = bounds.w;
            let h = bounds.h;
            
            path.createDefaultTransform(x, y);
            path.createDefaultTransformPoints(x, y, w, h);
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
        
        if (this.reverse) this.reverse.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
        
        if (this.reverse) this.reverse.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
        
        if (this.reverse) this.reverse.iterateLoop(parse);
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



    static reorientPoints(points, reverse)
    {
        // compute the centroid and then sort by angle relative to the centroid
        // if reverse is true, the resulting order is clockwise

        let sumX = 0;
        let sumY = 0;
        
        for (const pt of points)
        {
            sumX += pt.x.value;
            sumY += pt.y.value;
        }

        const cx = sumX / points.length;
        const cy = sumY / points.length;

        
        points.sort((a, b) => 
        {
            const aa = Math.atan2(a.y.value - cy, a.x.value - cx);
            const ab = Math.atan2(b.y.value - cy, b.x.value - cx);
            return aa - ab;
        });
        
        if (reverse)
            points.reverse();
        
        
        return points;
    }
}