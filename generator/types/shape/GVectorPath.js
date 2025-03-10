class GVectorPath
extends GShape
{
    static { GNode.types[VECTOR_PATH] = this; }



    points  = null;
    closed  = null;
    degree  = null;
    winding = null;
    round   = null;



    constructor(nodeId, options)
    {
        super(VECTOR_PATH, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.points  = null;
        this.closed  = null;
        this.degree  = null;
        this.winding = null;
        this.round   = null;
    }



    copy()
    {
        const copy = new GVectorPath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.points ) copy.points  = this.points .copy();
        if (this.closed ) copy.closed  = this.closed .copy();
        if (this.degree ) copy.degree  = this.degree .copy();
        if (this.winding) copy.winding = this.winding.copy();
        if (this.round  ) copy.round   = this.round  .copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'points':  return this.input ? this.value.points  : this.points;
            case 'closed':  return this.input ? this.value.closed  : this.closed;
            case 'degree':  return this.input ? this.value.degree  : this.degree;
            case 'winding': return this.input ? this.value.winding : this.winding;
            case 'round':   return this.input ? this.value.round   : this.round;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input   = await evalVectorPathValue (this.input,   parse);
        let   points  = await evalPointOrListValue(this.points,  parse);
        let   closed  = await evalNumberValue     (this.closed,  parse);
        let   degree  = await evalNumberValue     (this.degree,  parse);
        let   winding = await evalNumberValue     (this.winding, parse);
        let   round   = await evalNumberValue     (this.round,   parse);


        await this.evalBaseParams(parse);


        if (input)
        {
            // if (this.nodeId == 'path2')
            //     console.log('input =', input);
            
            if (   input.points
                && input.points.items
                && input.points.objects)
            {
                consoleAssert(
                     input.points.items.length == input.points.objects.length,
                    'Vector path points input item count must match object count');

                for (let i = 0; i < input.points.items.length; i++)
                {
                    const item = input.points.items  [i].copy();
                    const obj  = input.points.objects[i].copy();

                    if (item && obj)
                    {
                        item.x = new NumberValue(obj.x);
                        item.y = new NumberValue(obj.y);
                    }
                }
            }


            this.value = new VectorPathValue(
                this.nodeId,
                   points 
                && points.items.length > 0 
                ? points
                : input.points,
                closed  ?? input.closed,
                degree  ?? input.degree,
                winding ?? input.winding,
                round   ?? input.round);

            this.value.copyCustomParams(input);

            
            if (points )  this.value.points   = points;   else  points  = this.value.points;    
            if (closed )  this.value.closed   = closed;   else  closed  = this.value.closed;    
            if (degree )  this.value.degree   = degree;   else  degree  = this.value.degree;  
            if (winding)  this.value.windingt = winding;  else  winding = this.value.winding; 
            if (round  )  this.value.round    = round;    else  round   = this.value.round;  
        }
        else
        {
            this.value = new VectorPathValue(
                this.nodeId, 
                points, 
                closed, 
                degree, 
                winding, 
                round);
        }

        
        this.setUpdateValues(parse, 
        [
          //['points',  points ],
            ['closed',  closed ],
            ['degree',  degree ],
            ['winding', winding],
            ['round',   round  ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        const points = [];

        if (this.value.points.objects)
        {
            const objPoints = this.value.points.objects.filter(o => o.type == POINT);

            for (const pt of objPoints)
            {
                const p = PointValue.create(this.nodeId, pt.x, pt.y);
                
                if (pt.smooth != null)
                    p.smooth = new NumberValue(pt.smooth);

                points.push(p);
            }
        }


        this.value.objects = [];


        if (   super.baseIsValid()   
            && points.length >= 2
            && this.value.closed .isValid()
            && this.value.degree .isValid()
            && this.value.winding.isValid()
            && this.value.round  .isValid())
        {
            const path = new FigmaVectorPath(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                points,
                this.value.closed .value,
                this.value.degree .value,
                this.value.winding.value,
                this.value.round  .value);

                
            const bounds = getObjBounds([path]);

            path.createDefaultSpace(
                bounds.x + bounds.width /2,            
                bounds.y + bounds.height/2);


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



    isValid()
    {
        return super.isValid()
            && this.points  && this.points .isValid()
            && this.closed  && this.closed .isValid()
            && this.degree  && this.degree .isValid()
            && this.winding && this.winding.isValid()
            && this.round   && this.round  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.points ) this.points .pushValueUpdates(parse);
        if (this.closed ) this.closed .pushValueUpdates(parse);
        if (this.degree ) this.degree .pushValueUpdates(parse);
        if (this.winding) this.winding.pushValueUpdates(parse);
        if (this.round  ) this.round  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.points ) this.points .invalidateInputs(parse, from, force);
        if (this.closed ) this.closed .invalidateInputs(parse, from, force);
        if (this.degree ) this.degree .invalidateInputs(parse, from, force);
        if (this.winding) this.winding.invalidateInputs(parse, from, force);
        if (this.round  ) this.round  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.points ) this.points .iterateLoop(parse);
        if (this.closed ) this.closed .iterateLoop(parse);
        if (this.degree ) this.degree .iterateLoop(parse);
        if (this.winding) this.winding.iterateLoop(parse);
        if (this.round  ) this.round  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const path = new GVectorPath(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(path, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, path);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            path.input = genParse(parse);
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {       
            case 'points':  path.points  = genParse(parse); break;
            case 'closed':  path.closed  = genParse(parse); break;
            case 'degree':  path.degree  = genParse(parse); break;
            case 'winding': path.winding = genParse(parse); break;
            case 'round':   path.round   = genParse(parse); break;
            case 'props':   path.props   = genParse(parse); break;
            }
        }
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, path);
        return path;
    }
}