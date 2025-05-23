
class GStar
extends GShape
{
    static { GNode.types[STAR] = this; }



    position = null;
    round    = null;
    points   = null;
    convex   = null;



    constructor(nodeId, options)
    {
        super(STAR, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.position = null;
        this.round    = null;
        this.points   = null;
        this.convex   = null;
    }



    copy()
    {
        const copy = new GStar(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.position) copy.position = this.position.copy();
        if (this.round   ) copy.round    = this.round   .copy();
        if (this.points  ) copy.points   = this.points  .copy();
        if (this.convex  ) copy.convex   = this.convex  .copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'position': return this.input ? this.value.position : this.position;
            case 'x':        return this.input ? this.value.x        : this.x;
            case 'y':        return this.input ? this.value.y        : this.y;
            case 'width':    return this.input ? this.value.width    : this.width;
            case 'height':   return this.input ? this.value.height   : this.height;
            case 'round':    return this.input ? this.value.round    : this.round;
            case 'points':   return this.input ? this.value.points   : this.points;
            case 'convex':   return this.input ? this.value.convex   : this.convex;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        let [x, y, width, height] = await this.evalBaseParams(parse);

        let input  = await evalValue      (this.input,    parse);
        let pos    = await evalNumberValue(this.position, parse);
        let round  = await evalNumberValue(this.round,    parse);
        let points = await evalNumberValue(this.points,   parse);
        let convex = await evalNumberValue(this.convex,   parse);


        if (input)
        {
            this.value        = input.toNewValue();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            if (pos   )  this.value.position = pos;     else  pos    = this.value.position;
            if (x     )  this.value.x        = x;       else  x      = this.value.x;      
            if (y     )  this.value.y        = y;       else  y      = this.value.y;      
            if (width )  this.value.width    = width;   else  width  = this.value.width;  
            if (height)  this.value.height   = height;  else  height = this.value.height; 
            if (round )  this.value.round    = round;   else  round  = this.value.round;  
            if (points)  this.value.points   = points;  else  points = this.value.points;  
            if (convex)  this.value.convex   = convex;  else  convex = this.value.convex; 
        }
        else
        {
            this.value = new StarValue(
                this.nodeId,
                pos,
                x, 
                y, 
                width, 
                height,
                round,
                points,
                convex);
        }


        this.setUpdateValues(parse, 
        [
            ['position', pos   ],
            ['x',        x     ],
            ['y',        y     ],
            ['width',    width ],
            ['height',   height],
            ['round',    round ],
            ['points',   points],
            ['convex',   convex]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.position) this.position = this.value.position.copy();
        if (!this.x       ) this.x        = this.value.x       .copy();
        if (!this.y       ) this.y        = this.value.y       .copy();
        if (!this.width   ) this.width    = this.value.width   .copy();
        if (!this.height  ) this.height   = this.value.height  .copy();
        if (!this.round   ) this.round    = this.value.round   .copy();
        if (!this.points  ) this.points   = this.value.points  .copy();
        if (!this.convex  ) this.convex   = this.value.convex  .copy();



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
            && this.value.round .isValid()
            && this.value.points.isValid()
            && this.value.convex.isValid())
        {
            const vpos = this.value.position;
            const vx   = this.value.x;
            const vy   = this.value.y;
            const vw   = this.value.width;
            const vh   = this.value.height;

            const _x = vpos.value <= 0 ? vx : new NumberValue(vx.value - vw.value, Math.max(vx.decimals, vw.decimals));
            const _y = vpos.value <= 0 ? vy : new NumberValue(vy.value - vh.value, Math.max(vy.decimals, vh.decimals));
            const _w = vpos.value <= 0 ? vw : new NumberValue(vw.value*2, Math.max(vx.decimals, vw.decimals));
            const _h = vpos.value <= 0 ? vh : new NumberValue(vh.value*2, Math.max(vy.decimals, vh.decimals));            

            let   x = _x.value;
            let   y = _y.value;
            let   w = _w.value;
            let   h = _h.value;
            const r = Math.max(0, this.value.round.value);
            const p = Math.max(3, Math.floor(this.value.points.value));
            const c = this.value.convex.value;


            if (   w != 0
                && h != 0)
            {
                const star = new FigmaStar(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, r, p, c);

                star.createDefaultTransform(x, y);
                star.createDefaultTransformPoints(x, y, w, h);

                this.value.objects.push(star);
            }
        }

       
        await super.evalObjects(parse);
    }



    // toNewValue()
    // {
    //     const star = new StarValue(
    //         this.nodeId,
    //         this.position.toNewValue(),
    //         this.x       .toNewValue(),
    //         this.y       .toNewValue(),
    //         this.width   .toNewValue(),
    //         this.height  .toNewValue(),
    //         this.round   .toNewValue(),
    //         this.points  .toNewValue(),
    //         this.convex  .toNewValue());

    //     star.copyCustomParams(this.value);

    //     star.props   = this.props.toNewValue();
    //     star.objects = this.value.objects.map(o => o.copy());
 
    //     return star;
    // }



    isValid()
    {
        return super.isValid()
            && this.position && this.position.isValid()
            && this.round    && this.round   .isValid()
            && this.points   && this.points  .isValid()
            && this.convex   && this.convex  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.position) this.position.pushValueUpdates(parse);
        if (this.round   ) this.round   .pushValueUpdates(parse);
        if (this.points  ) this.points  .pushValueUpdates(parse);
        if (this.convex  ) this.convex  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.position) this.position.invalidateInputs(parse, from, force);
        if (this.round   ) this.round   .invalidateInputs(parse, from, force);
        if (this.points  ) this.points  .invalidateInputs(parse, from, force);
        if (this.convex  ) this.convex  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.position) this.position.iterateLoop(parse);
        if (this.round   ) this.round   .iterateLoop(parse);
        if (this.points  ) this.points  .iterateLoop(parse);
        if (this.convex  ) this.convex  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const star = new GStar(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(star, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, star);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            star.input = genParse(parse);
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {
            case 'position': star.position = genParse(parse); break;
            case 'x':        star.x        = genParse(parse); break;
            case 'y':        star.y        = genParse(parse); break;
            case 'width':    star.width    = genParse(parse); break;
            case 'height':   star.height   = genParse(parse); break;
            case 'round':    star.round    = genParse(parse); break;
            case 'points':   star.points   = genParse(parse); break;
            case 'convex':   star.convex   = genParse(parse); break;
            case 'props':    star.props    = genParse(parse); break;
            }
        }
        
        
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, star);
        return star;
    }
}