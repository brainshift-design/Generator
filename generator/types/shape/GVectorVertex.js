class GVectorVertex
extends GOperator1
{
    x     = null;
    y     = null;
    join  = null;
    cap   = null;
    round = null;



    constructor(nodeId, options)
    {
        super(VECTOR_VERTEX, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.x     = null;
        this.y     = null;
        this.join  = null;
        this.cap   = null;
        this.round = null;
    }



    copy()
    {
        const copy = new GVectorVertex(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.x    ) copy.x     = this.x    .copy();
        if (this.y    ) copy.y     = this.y    .copy();
        if (this.join ) copy.join  = this.join .copy();
        if (this.cap  ) copy.cap   = this.cap  .copy();
        if (this.round) copy.round = this.round.copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'x':     return this.input ? this.value.x     : this.x;
            case 'y':     return this.input ? this.value.y     : this.y;
            case 'join':  return this.input ? this.value.join  : this.join;
            case 'cap':   return this.input ? this.value.cap   : this.cap;
            case 'round': return this.input ? this.value.round : this.round;
        }

        return null;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        let input = await evalVectorVertexValue(this.input, parse);
        let x     = await evalNumberValue      (this.x,     parse);
        let y     = await evalNumberValue      (this.y,     parse);
        let join  = await evalNumberValue      (this.join,  parse);
        let cap   = await evalNumberValue      (this.cap,   parse);
        let round = await evalNumberValue      (this.round, parse);


        if (input)
        {
            const _input = input;

            if (input.type == POINT_VALUE)
            {
                input = new VectorVertexValue(input.nodeId, input.x, input.y);
                input.copyCustomParams(_input);
            }
            
            this.value        = input.copy();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            // this.value = new VectorVertexValue(
            //     this.nodeId,
            //     x     ?? input.x,
            //     y     ?? input.y,
            //     join  ?? input.join,
            //     cap   ?? input.cap,
            //     round ?? input.round);
                
            this.value.x     = new NumberValue(this.value.objects[0].x    );
            this.value.y     = new NumberValue(this.value.objects[0].y    );
            this.value.join  = new NumberValue(this.value.objects[0].join );
            this.value.cap   = new NumberValue(this.value.objects[0].cap  );
            this.value.round = new NumberValue(this.value.objects[0].round);

            if (x    )  this.value.x     = x;      else  x     = this.value.x;
            if (y    )  this.value.y     = y;      else  y     = this.value.y;
            if (join )  this.value.join  = join;   else  join  = this.value.join;
            if (cap  )  this.value.cap   = cap;    else  cap   = this.value.cap;
            if (round)  this.value.round = round;  else  round = this.value.round;
        }
        else
        {
            this.value = new VectorVertexValue(
                this.nodeId, 
                x, 
                y, 
                join, 
                cap, 
                round);
        }

       
        this.value.uniqueId = this.uniqueId;


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
        if (!this.options.enabled)
            return;
            
            
        this.value.objects = [];


        if (   this.value.x    
            && this.value.y    
            && this.value.join 
            && this.value.cap  
            && this.value.round)
        {
            const x     = this.value.x    .value;
            const y     = this.value.y    .value;
            //const join  = this.value.join .value;
            //const cap   = this.value.cap  .value;
            //const round = this.value.round.value;

            const point = new FigmaPoint(this.nodeId, this.nodeId, this.nodeName, x, y);

            point.createDefaultTransform(x, y);

            this.value.objects = [point];
        }


        await super.evalObjects(parse);
    }



    toNewValue()
    {
        const point = new VectorVertexValue(
            this.nodeId,
            this.x    .toNewValue(),
            this.y    .toNewValue(),
            this.join .toNewValue(),
            this.cap  .toNewValue(),
            this.round.toNewValue());

        point.copyCustomParams(this.value);

        point.objects  = this.value.objects.map(o => o.copy());
        point.uniqueId = this.value.uniqueId;

        return point;
    }



    isValid()
    {
        return super.isValid()
            && this.x    .isValid()
            && this.y    .isValid()
            && this.join .isValid()
            && this.cap  .isValid()
            && this.round.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x    ) this.x    .pushValueUpdates(parse);
        if (this.y    ) this.y    .pushValueUpdates(parse);
        if (this.join ) this.join .pushValueUpdates(parse);
        if (this.cap  ) this.cap  .pushValueUpdates(parse);
        if (this.round) this.round.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.x    ) this.x    .invalidateInputs(parse, from, force);
        if (this.y    ) this.y    .invalidateInputs(parse, from, force);
        if (this.join ) this.join .invalidateInputs(parse, from, force);
        if (this.cap  ) this.cap  .invalidateInputs(parse, from, force);
        if (this.round) this.round.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.x    ) this.x    .iterateLoop(parse);
        if (this.y    ) this.y    .iterateLoop(parse);
        if (this.join ) this.join .iterateLoop(parse);
        if (this.cap  ) this.cap  .iterateLoop(parse);
        if (this.round) this.round.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const point = new GVectorVertex(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(point, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, point);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            point.input = genParse(parse);
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {
            case 'x':     point.x     = genParse(parse); break;
            case 'y':     point.y     = genParse(parse); break;
            case 'join':  point.join  = genParse(parse); break;
            case 'cap':   point.cap   = genParse(parse); break;
            case 'round': point.round = genParse(parse); break;
            }
        }
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, point);
        return point;
    }
}