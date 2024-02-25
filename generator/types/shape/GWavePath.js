class GWavePath
extends GShape
{
    shape     = null;
    amplitude = null;
    frequency = null;
    offset    = null;
    alignX    = null;
    alignY    = null;



    constructor(nodeId, options)
    {
        super(WAVE_PATH, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.shape     = null;
        this.amplitude = null;
        this.frequency = null;
        this.offset    = null;
        this.alignX    = null;
        this.alignY    = null;
    }



    copy()
    {
        const copy = new GWavePath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.shape    ) copy.shape     = this.shape    .copy();
        if (this.amplitude) copy.amplitude = this.amplitude.copy();
        if (this.frequency) copy.frequency = this.frequency.copy();
        if (this.offset   ) copy.offset    = this.offset   .copy();
        if (this.alignX   ) copy.alignX    = this.alignX   .copy();
        if (this.alignY   ) copy.alignY    = this.alignY   .copy();
        
        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'shape':     return this.input ? this.value.shape     : this.shape;
            case 'x':         return this.input ? this.value.x         : this.x;
            case 'y':         return this.input ? this.value.y         : this.y;
            case 'width':     return this.input ? this.value.width     : this.width;
            case 'amplitude': return this.input ? this.value.amplitude : this.amplitude;
            case 'frequency': return this.input ? this.value.frequency : this.frequency;
            case 'offset':    return this.input ? this.value.offset    : this.offset;
            case 'alignX':    return this.input ? this.value.alignX    : this.alignX;
            case 'alignY':    return this.input ? this.value.alignY    : this.alignY;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let [x, y, width, ] = await this.evalBaseParams(parse);


        let input     = this.input     ? (await this.input    .eval(parse)).toValue() : null;
        let shape     = this.shape     ? (await this.shape    .eval(parse)).toValue() : null;
        let amplitude = this.amplitude ? (await this.amplitude.eval(parse)).toValue() : null;
        let frequency = this.frequency ? (await this.frequency.eval(parse)).toValue() : null;
        let offset    = this.offset    ? (await this.offset   .eval(parse)).toValue() : null;
        let alignX    = this.alignX    ? (await this.alignX   .eval(parse)).toValue() : null;
        let alignY    = this.alignY    ? (await this.alignY   .eval(parse)).toValue() : null;


        if (input)
        {
            this.value        = input.copy();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            if (shape    )  this.value.shape     = shape;      else  shape      = this.value.shape;
            if (x        )  this.value.x         = x;          else  x          = this.value.x;      
            if (y        )  this.value.y         = y;          else  y          = this.value.y;      
            if (width    )  this.value.width     = width;      else  width      = this.value.width;  
            if (amplitude)  this.value.amplitude = amplitude;  else  amplitude  = this.value.amplitude;
            if (frequency)  this.value.frequency = frequency;  else  frequency  = this.value.frequency;
            if (offset   )  this.value.offset    = offset;     else  offset     = this.value.offset;
            if (alignX   )  this.value.alignX    = alignX;     else  alignX     = this.value.alignX;
            if (alignY   )  this.value.alignY    = alignY;     else  alignY     = this.value.alignY;
        }
        else
        {
            this.value = new WavePathValue(
                this.nodeId,
                shape,
                x, 
                y, 
                width, 
                amplitude,
                frequency,
                offset,
                alignX,
                alignY);
        }


        this.setUpdateValues(parse, 
        [
            ['shape',     shape    ],
            ['x',         x        ],
            ['y',         y        ],
            ['width',     width    ],
            ['amplitude', amplitude],
            ['frequency', frequency],
            ['offset',    offset   ],
            ['alignX',    alignX   ],
            ['alignY',    alignY   ]
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
            && this.value.shape    .isValid()
            && this.value.x        .isValid()
            && this.value.y        .isValid()
            && this.value.width    .isValid()
            && this.value.amplitude.isValid()
            && this.value.frequency.isValid()
            && this.value.offset   .isValid()
            && this.value.alignX   .isValid()
            && this.value.alignY   .isValid())
        {
            const sh     = this.value.shape    .value;
            let   x      = this.value.x        .value;
            let   y      = this.value.y        .value;
            let   w      = this.value.width    .value;
            const amp    = this.value.amplitude.value;
            const freq   = this.value.frequency.value;
            const off    = this.value.offset   .value;
            const alignX = this.value.alignX   .value;
            const alignY = this.value.alignY   .value;


            [x, y, w, , ] = validateObjectRect(x, y, w, 0);


            if (   w   != 0 
                && amp != 0)
            {
                const wave = new FigmaWavePath(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    sh, 
                    x, y, w,
                    amp,
                    freq,
                    off,
                    alignX,
                    alignY);


                const bounds = getObjBounds([wave]);
        
                wave.createDefaultTransform(bounds.x, bounds.y);
                wave.createDefaultTransformPoints(bounds.x, bounds.y, bounds.w, bounds.h);


                this.value.objects.push(wave);
            }
        }


        await super.evalObjects(parse);
    }
   
    
        
    isValid()
    {
        return super.isValid()
            && this.shape     && this.shape    .isValid()
            && this.amplitude && this.amplitude.isValid()
            && this.frequency && this.frequency.isValid()
            && this.offset    && this.offset   .isValid()
            && this.alignX    && this.alignX   .isValid()
            && this.alignY    && this.alignY   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);
 
        if (this.shape    ) this.shape    .pushValueUpdates(parse);
        if (this.amplitude) this.amplitude.pushValueUpdates(parse);
        if (this.frequency) this.frequency.pushValueUpdates(parse);
        if (this.offset   ) this.offset   .pushValueUpdates(parse);
        if (this.alignX   ) this.alignX   .pushValueUpdates(parse);
        if (this.alignY   ) this.alignY   .pushValueUpdates(parse);
    }

   
        
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.shape    ) this.shape    .invalidateInputs(parse, from, force);
        if (this.amplitude) this.amplitude.invalidateInputs(parse, from, force);
        if (this.frequency) this.frequency.invalidateInputs(parse, from, force);
        if (this.offset   ) this.offset   .invalidateInputs(parse, from, force);
        if (this.alignX   ) this.alignX   .invalidateInputs(parse, from, force);
        if (this.alignY   ) this.alignY   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);
 
        if (this.shape    ) this.shape    .iterateLoop(parse);
        if (this.amplitude) this.amplitude.iterateLoop(parse);
        if (this.frequency) this.frequency.iterateLoop(parse);
        if (this.offset   ) this.offset   .iterateLoop(parse);
        if (this.alignX   ) this.alignX   .iterateLoop(parse);
        if (this.alignY   ) this.alignY   .iterateLoop(parse);
    }
}