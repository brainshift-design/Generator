class GLine
extends GShape
{
    static { GNode.types[LINE] = this; }



    constructor(nodeId, options)
    {
        super(LINE, nodeId, options);
    }



    copy()
    {
        const copy = new GLine(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'x':     return this.input ? this.value.x     : this.x;
            case 'y':     return this.input ? this.value.y     : this.y;
            case 'width': return this.input ? this.value.width : this.width;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let input = await evalLineValue(this.input, parse);

        let [x, y, width, ] = await this.evalBaseParams(parse, false);
            

        if (input)
        {
            this.value        = input.toNewValue();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            if (x    )  this.value.x     = x;      else  x     = this.value.x;      
            if (y    )  this.value.y     = y;      else  y     = this.value.y;      
            if (width)  this.value.width = width;  else  width = this.value.width;  
        }
        else
        {
            this.value = new LineValue(
                this.nodeId, 
                x, 
                y, 
                width);
        }


        this.setUpdateValues(parse, 
        [
            ['x',      x     ],
            ['y',      y     ],
            ['width',  width ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.x    ) this.x     = this.value.x    .copy();
        if (!this.y    ) this.y     = this.value.y    .copy();
        if (!this.width) this.width = this.value.width.copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        this.value.objects = [];


        if (   super.baseIsValid()   
            && this.value.x    .isValid()
            && this.value.y    .isValid()
            && this.value.width.isValid()) 
        {
            let x = this.value.x    .value;
            let y = this.value.y    .value;
            let w = this.value.width.value;


            [x, y, w, , , ] = validateObjectRect(x, y, w, 0);


            if (w != 0)
            {
                const line = new FigmaLine(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w);

                line.createDefaultTransform(x, y);
                line.createDefaultTransformPoints(x, y, w, 0.01);
                
                this.value.objects.push(line);
            }
        }

        
        await super.evalObjects(parse);
    }



    isValid()
    {
        return super.isValid()
            && this.x     && this.x    .isValid()
            && this.y     && this.y    .isValid()
            && this.width && this.width.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);
 
        if (this.x    ) this.x    .pushValueUpdates(parse);
        if (this.y    ) this.y    .pushValueUpdates(parse);
        if (this.width) this.width.pushValueUpdates(parse);
    }

   
        
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.x    ) this.x    .invalidateInputs(parse, from, force);
        if (this.y    ) this.y    .invalidateInputs(parse, from, force);
        if (this.width) this.width.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);
 
        if (this.x    ) this.x    .iterateLoop(parse);
        if (this.y    ) this.y    .iterateLoop(parse);
        if (this.width) this.width.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
      
        const line = new GLine(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(line, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, line);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            line.input = genParse(parse);
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {
            case 'x':     line.x     = genParse(parse); break;
            case 'y':     line.y     = genParse(parse); break;
            case 'width': line.width = genParse(parse); break;
            case 'props': line.props = genParse(parse); break;
            }
        }
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, line);
        return line;
    }
}