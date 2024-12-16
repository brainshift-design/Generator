class GVectorEdge
extends GOperator2
{
    startTangent = null;
    endTangent   = null;
    
    
    
    constructor(nodeId, options)
    {
        super(VECTOR_EDGE, nodeId, options);
    }



    reset()
    {
        super.reset();
        
        this.startTangent = null;
        this.endTangent   = null;
    }



    copy()
    {
        const copy = new GVectorEdge(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.startTangent) copy.startTangent = this.startTangent.copy();
        if (this.endTangent  ) copy.endTangent   = this.endTangent  .copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'startTangent': return this.input ? this.value.startTangent : this.startTangent;
            case 'endTangent':   return this.input ? this.value.endTangent   : this.endTangent;
        }

        return null;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        let input0       = await evalVectorVertexValue(this.input0,       parse);
        let input1       = await evalVectorVertexValue(this.input1,       parse);
        let startTangent = await evalNumberValue      (this.startTangent, parse);
        let   endTangent = await evalNumberValue      (this.  endTangent, parse);

        if (   input0
            && input1
            && startTangent
            && endTangent)
        {
            if (input0.type == POINT_VALUE) input0 = new VectorVertexValue(input0.nodeId, input0.x, input0.y);
            if (input1.type == POINT_VALUE) input1 = new VectorVertexValue(input1.nodeId, input1.x, input1.y);

            if (startTangent.type == VECTOR_VERTEX_VALUE) startTangent = new PointValue(startTangent.nodeId, startTangent.x, startTangent.y);
            if (  endTangent.type == VECTOR_VERTEX_VALUE)   endTangent = new PointValue(  endTangent.nodeId,   endTangent.x,   endTangent.y);


            this.value = new VectorEdgeValue(
                this.nodeId,
                input0,
                input1,
                startTangent,
                endTangent);


            this.value.uniqueId = this.uniqueId;
        }
        else
            this.value = VectorEdgeValue.NaN();
        
        
        await this.evalObjects(parse);


        this.setUpdateValues(parse, 
        [
            ['value', this.value]
        ]);


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
            path.createDefaultTransformPoints(x, y, w, h);

            this.value.objects.push(path);
        }


        await super.evalObjects(parse);
    }



    // toNewValue()
    // {
    //     const edge = new VectorEdgeValue(
    //         this.nodeId,
    //         this.input0 ? this.input0.toNewValue() : VectorVertexValue.NaN(),
    //         this.input1 ? this.input1.toNewValue() : VectorVertexValue.NaN(),
    //         this.startTangent.toNewValue(),
    //         this.endTangent  .toNewValue());

    //     edge.copyCustomParams(this.value);

    //     edge.uniqueId = this.value.uniqueId;
    //     edge.objects  = this.value.objects.map(o => o.copy());

    //     return edge;
    // }



    isValid()
    {
        return super.isValid()
            && this.startTangent.isValid()
            && this.endTangent  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.startTangent) this.startTangent.pushValueUpdates(parse);
        if (this.endTangent  ) this.endTangent  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.startTangent) this.startTangent.invalidateInputs(parse, from, force);
        if (this.endTangent  ) this.endTangent  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.startTangent) this.startTangent.iterateLoop(parse);
        if (this.endTangent  ) this.endTangent  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const edge = new GVectorEdge(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(edge, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, edge);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 2)
        {
            edge.input0 = genParse(parse);
            edge.input1 = genParse(parse);
        }
        else if (nInputs == 1)
        {
            edge.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        }
    
    
        edge.startTangent = genParse(parse);
        edge.  endTangent = genParse(parse);
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, edge);
        return edge;
    }
}