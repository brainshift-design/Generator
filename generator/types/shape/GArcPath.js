class GArcPath
extends GShape
{
    position = null;
    start    = null;
    sweep    = null;

    sweepInDegrees;



    constructor(nodeId, options)
    {
        super(ARC_PATH, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.position = null;
        this.start    = null;
        this.sweep    = null;
    }



    copy()
    {
        const copy = new GArcPath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.position) copy.position = this.position.copy();
        if (this.start   ) copy.start    = this.start   .copy();
        if (this.sweep   ) copy.sweep    = this.sweep   .copy();
        
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
            case 'start':    return this.input ? this.value.start    : this.start;
            case 'sweep':    return this.input ? this.value.sweep    : this.sweep;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let [x, y, width, height] = await this.evalBaseParams(parse);

        let input = await evalArcPathValue(this.input,    parse);
        let pos   = await evalNumberValue (this.position, parse);
        let start = await evalNumberValue (this.start,    parse);
        let sweep = await evalNumberValue (this.sweep,    parse);


        if (input)
        {
            this.value        = input.copy();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            if (pos   )  this.value.position = pos;     else  pos    = this.value.position;
            if (x     )  this.value.x        = x;       else  x      = this.value.x;      
            if (y     )  this.value.y        = y;       else  y      = this.value.y;      
            if (width )  this.value.width    = width;   else  width  = this.value.width;  
            if (height)  this.value.height   = height;  else  height = this.value.height; 
            if (start )  this.value.start    = start;   else  start  = this.value.start;
            if (sweep )  this.value.sweep    = sweep;   else  sweep  = this.value.sweep;
        }
        else
        {
            this.value = new ArcPathValue(
                this.nodeId,
                pos,
                x, 
                y, 
                width, 
                height,
                start,
                sweep);
        }


        this.setUpdateValues(parse, 
        [
            ['position', pos   ],
            ['x',        x     ],
            ['y',        y     ],
            ['width',    width ],
            ['height',   height],
            ['start',    start ],
            ['sweep',    sweep ]
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
           
           
        this.value.objects = [];


        if (   super.baseIsValid()
            && this.value.x     .isValid()
            && this.value.y     .isValid()
            && this.value.width .isValid()
            && this.value.height.isValid()) 
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

            let   x  = _x.value;
            let   y  = _y.value;
            let   w  = _w.value;
            let   h  = _h.value;
            const st = this.value.start.value/360 * Tau;
            let   sw = this.value.sweep.value/100 * Tau;


            [x, , w, , , ] = validateObjectRect(x, y, w, h);


            if (   w != 0 
                && h != 0)
            {
                if (this.sweepInDegrees) sw /= 3.6;

                const arc = new FigmaArcPath(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    vpos.value,
                    x, y, w, h, st, sw);


                const bounds = getObjBounds([arc]);
        
                arc.createDefaultSpace(x + w/2, y + h/2);
                arc.createDefaultTransform(bounds.x, bounds.y);
                arc.createDefaultTransformPoints(bounds.x, bounds.y, bounds.w, bounds.h);


                this.value.objects.push(arc);
            }
        }


        await super.evalObjects(parse);
    }
   
    
        
    isValid()
    {
        return super.isValid()
            && this.position && this.position.isValid()
            && this.start    && this.start   .isValid()
            && this.sweep    && this.sweep   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);
 
        if (this.position) this.position.pushValueUpdates(parse);
        if (this.start   ) this.start   .pushValueUpdates(parse);
        if (this.sweep   ) this.sweep   .pushValueUpdates(parse);
    }

   
        
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.position) this.position.invalidateInputs(parse, from, force);
        if (this.start   ) this.start   .invalidateInputs(parse, from, force);
        if (this.sweep   ) this.sweep   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);
 
        if (this.position) this.position.iterateLoop(parse);
        if (this.start   ) this.start   .iterateLoop(parse);
        if (this.sweep   ) this.sweep   .iterateLoop(parse);
    }
}