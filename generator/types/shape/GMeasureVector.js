class GMeasureVector
extends GOperator1
{
    length = null;
    angle  = null;


    
    constructor(nodeId, options)
    {
        super(MEASURE_VECTOR, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.length = null;
        this.angle  = null;
    }



    copy()
    {
        const copy = new GMeasureVector(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.length) copy.length = this.length.copy();
        if (this.angle ) copy.angle  = this.angle .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalPointValue(this.input, parse);


        if (input)
        {
            const v   = input.toPoint();

            const len = lengthv(v);
            let   ang = anglev (v);

            if (ang > Tau/2) ang -= Tau;

            this.length = new NumberValue(len, -2);

            this.angle = 
                len > 0 
                ? new NumberValue(ang/Tau * 360, -2) 
                : NumberValue.NaN();
        }
        else
        {
            this.length = NumberValue.NaN();
            this.angle  = NumberValue.NaN();
        }


        this.setUpdateValues(parse,
        [
            ['length', this.length],
            ['angle',  this.angle ]
        ]);
        

        this.validate();

        return this;
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const measure = new GMeasureVector(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(measure, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, measure);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
        
        if (nInputs == 1)
            measure.input = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
    
    
            
        parse.nTab--;
    
    
        genParseNodeEnd(parse, measure);
        return measure;
    }
}