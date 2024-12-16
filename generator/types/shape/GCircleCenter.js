class GCircleCenter
extends GOperator3
{
    constructor(nodeId, options)
    {
        super(CIRCLE_CENTER, nodeId, options);
    }


    
    // reset()
    // {
    //     super.reset();
    // }



    copy()
    {
        const copy = new GCircleCenter(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = await evalPointValue(this.input0, parse);
        const input1 = await evalPointValue(this.input1, parse);
        const input2 = await evalPointValue(this.input2, parse);


        if (   input0 && input0.isValid()
            && input1 && input1.isValid()
            && input2 && input2.isValid())
        {
            const pc = circleCenter(
                input0.toPoint(),
                input1.toPoint(),
                input2.toPoint());

            this.value = PointValue.fromPoint(this.nodeId, pc);
        }
        else
        {
            this.value = PointValue.NaN();
        }


        await this.evalObjects(parse);


        this.setUpdateValues(parse, 
        [
            ['', new NullValue()]
        ]);
        

        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            
            
        this.value.objects = [];


        if (   this.value.x.isValid()
            && this.value.y.isValid())
        {
            const x = this.value.x.value;
            const y = this.value.y.value;

            const point = new FigmaPoint(this.nodeId, this.nodeId, this.nodeName, x, y);

            point.createDefaultTransform(x, y);

            this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const center = new GCircleCenter(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 3, 'nInputs must be [0, 3]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(center, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, center);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
        
        if (nInputs == 3)
        {
            center.input0 = genParse(parse);
            center.input1 = genParse(parse);
            center.input2 = genParse(parse);
        }
        else if (nInputs == 2)
        {
            center.input0 = genParse(parse);
            center.input1 = genParse(parse);
        }
        else if (nInputs == 1)
        {
            center.input0 = genParse(parse);
        }
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, center);
        return center;
    }
}