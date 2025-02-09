class GVector
extends GOperator2
{
    static { GNode.types[VECTOR] = this; }



    transform = null;



    constructor(nodeId, options)
    {
        super(VECTOR, nodeId, options);
    }


    
    reset()
    {
        super.reset();
        
        this.transform = null;
    }



    copy()
    {
        const copy = new GVector(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.transform) copy.transform = this.transform .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0    = await evalPointValue (this.input0,    parse);
        const input1    = await evalPointValue (this.input1,    parse);
        const transform = await evalNumberValue(this.transform, parse);


        if (   input0 && input0.objects && input0.objects.length > 0 && input0.objects[0]
            && input1 && input1.objects && input1.objects.length > 0 && input1.objects[0])
        {
            this.value = PointValue.fromPoint(
                this.nodeId,
                subv(input1.objects[0].toPoint(), input0.objects[0].toPoint()));

            await this.evalObjects(
                parse, 
                {
                    transform: transform,
                });
        }
        else
        {
            this.value = PointValue.NaN();
        }


        this.setUpdateValues(parse,
        [
            ['transform', transform]
        ]);
        

        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        // if (!this.options.enabled)
        //     return;
            
            
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
                this.smooth ? this.smooth.value/100 : 1);


            point.createDefaultTransform(x, y);

            
            if (options.transform.value > 0)
            {
                point.applyTransform(
                    getTransformFromAngle(anglev(point.toPoint())),
                    2);
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
    
    
        const vector = new GVector(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(vector, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, vector);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
        
        if (nInputs == 2)
        {
            vector.input0 = genParse(parse);
            vector.input1 = genParse(parse);
        }
        else if (nInputs == 1)
        {
            vector.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        }
    
    
        vector.transform  = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, vector);
        return vector;
    }
}



function getTransformFromAngle(a) 
{
    const cosa = Math.cos(a);
    const sina = Math.sin(a);

    return [[ cosa, -sina, 0 ], 
            [ sina,  cosa, 0 ], 
            [ 0,     0,    1 ]];
}