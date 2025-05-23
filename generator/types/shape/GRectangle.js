class GRectangle
extends GShape
{
    static { GNode.types[RECTANGLE] = this; }



    round = null;



    constructor(nodeId, options)
    {
        super(RECTANGLE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.round = null;
    }



    copy()
    {
        const copy = new GRectangle(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.round) copy.round = this.round.copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'x':      return this.input ? this.value.x      : this.x;
            case 'y':      return this.input ? this.value.y      : this.y;
            case 'width':  return this.input ? this.value.width  : this.width;
            case 'height': return this.input ? this.value.height : this.height;
            case 'round':  return this.input ? this.value.round  : this.round;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalRectangleValue(this.input, parse);
        let   round = await evalNumberValue   (this.round, parse);

        if (round && !round.isValid()) round = NumberValue.NaN();

        
        let [x, y, width, height] = await this.evalBaseParams(parse);


        if (input)
        {
            this.value        = input.toNewValue();
            this.value.nodeId = this.nodeId;
            
            this.value.copyCustomParams(input);
            
            if (x     )  this.value.x      = x;       else  x      = this.value.x;      
            if (y     )  this.value.y      = y;       else  y      = this.value.y;      
            if (width )  this.value.width  = width;   else  width  = this.value.width;  
            if (height)  this.value.height = height;  else  height = this.value.height; 
            if (round )  this.value.round  = round;   else  round  = this.value.round;  
        }
        else
        {
            this.value = new RectangleValue(
                this.nodeId, 
                x, 
                y, 
                width, 
                height, 
                round);
        }

       
        this.setUpdateValues(parse, 
        [
            ['x',      x     ],
            ['y',      y     ],
            ['width',  width ],
            ['height', height],
            ['round',  round ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.x     ) this.x      = this.value.x     .copy();
        if (!this.y     ) this.y      = this.value.y     .copy();
        if (!this.width ) this.width  = this.value.width .copy();
        if (!this.height) this.height = this.value.height.copy();
        if (!this.round ) this.round  = this.value.round .copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
     
        
        this.value.objects = [];


        if (   super.baseIsValid()   
            && this.value.x     .isValid()
            && this.value.y     .isValid()
            && this.value.width .isValid()
            && this.value.height.isValid()
            && this.value.round .isValid())
        {
            let   x = this.value.x     .value;
            let   y = this.value.y     .value;
            let   w = this.value.width .value;
            let   h = this.value.height.value;
            const r = Math.max(0, this.value.round.value);


            [x, y, w, h, , ] = validateObjectRect(x, y, w, h);


            if (   w != 0 
                && h != 0)
            {
                const rect = new FigmaRectangle(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, r);

                rect.createDefaultTransform(x, y);
                rect.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(rect);
            }
        }

        
        await super.evalObjects(parse);
    }



    // toNewValue()
    // {
    //     const rect = new RectangleValue(
    //         this.nodeId,
    //         this.x     .toNewValue(),
    //         this.y     .toNewValue(),
    //         this.width .toNewValue(),
    //         this.height.toNewValue(),
    //         this.round .toNewValue());

    //     rect.copyCustomParams(this.value);

    //     rect.props   = this.props.toNewValue();
    //     rect.objects = this.value.objects.map(o => o.copy());

    //     return rect;
    // }



    isValid()
    {
        return super.isValid()
            && this.round && this.round.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.round) this.round.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.round) this.round.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.round) this.round.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const rect = new GRectangle(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(rect, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, rect);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            rect.input = genParse(parse);
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {
            case 'x':      rect.x      = genParse(parse); break;
            case 'y':      rect.y      = genParse(parse); break;
            case 'width':  rect.width  = genParse(parse); break;
            case 'height': rect.height = genParse(parse); break;
            case 'round':  rect.round  = genParse(parse); break;
            case 'props':  rect.props  = genParse(parse); break;
            }
        }
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, rect);
        return rect;
    }
}