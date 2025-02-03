class GClosestPointOnPath
extends GOperator2
{
    static { GNode.types[CLOSEST_POINT_ON_PATH] = this; }



    constrain = null;
    transform = null;
    
    
    
    constructor(nodeId, options)
    {
        super(CLOSEST_POINT_ON_PATH, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.constrain = null;
        this.transform = null;
    }



    copy()
    {
        const copy = new GClosestPointOnPath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.constrain) copy.constrain  = this.constrain.copy();
        if (this.transform) copy.transform  = this.transform.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0    = await evalVectorPathValue(this.input0,     parse);
        const input1    = await evalPointValue     (this.input1,     parse);

        const constrain = await evalNumberValue    (this.constrain,  parse);
        const transform = await evalNumberValue    (this.transform,  parse);


        let tangent = point_NaN;


        if (   input0
            && input1
            && input0.objects.length > 0
            && input1.objects.length > 0)
        {
            const degree = Math.min(input0.degree.value, 2) + 1;

            const points = createCompleteCurve(
                degree, 
                input0.objects[0].pathPoints, 
                input0.closed.value > 0);

            let closest;
            [closest, tangent] = closestTangentOnCurve(
                degree, 
                points, 
                input1.objects[0].toPoint(),
                constrain.value);
                
            this.value = PointValue.fromPoint(this.nodeId, closest);
        }
        else
            this.value = PointValue.NaN();


        this.setUpdateValues(parse,
        [
            ['constrain',  constrain ],
            ['transform',  transform ]
        ]);
        

        await this.evalObjects(parse,
        {
            transform: transform,
            tangent:   tangent
        });


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        if (!this.value.objects)
            this.value.objects = [];


        if (   this.value.x
            && this.value.y   
            && this.value.x.isValid()
            && this.value.y.isValid())
        {
            const x = this.value.x.value;
            const y = this.value.y.value;

            const point = new FigmaPoint(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                x,
                y,
                0,
                this.smooth ? this.smooth.value/100 : 1);

            point.createDefaultTransform(x, y);


            if (   options.transform.value > 0
                && options.tangent)
            {
                const a     = -anglev(options.tangent);
                const xform =  createRotateTransform(a);

                point.applyTransform2(xform, options.transform.value > 0 ? 2 : 0);
            }
            
            
            this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.transform && this.transform.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.transform) this.transform.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.transform) this.transform.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.transform) this.transform.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const cpop = new GClosestPointOnPath(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(cpop, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, cpop);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 2)
        {
            cpop.input0 = genParse(parse);
            cpop.input1 = genParse(parse);
        }
        else if (nInputs == 1)
        {
            cpop.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        }
    
    
        cpop.constrain  = genParse(parse);
        cpop.transform  = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, cpop);
        return cpop;
    }
}