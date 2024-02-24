class GWavePath
extends GShape
{
    shape     = null;
    base      = null;
    amplitude = null;
    frequency = null;
    offset    = null;
    bias      = null;



    constructor(nodeId, options)
    {
        super(WAVE_PATH, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.shape     = null;
        this.base      = null;
        this.amplitude = null;
        this.frequency = null;
        this.offset    = null;
        this.bias      = null;
    }



    copy()
    {
        const copy = new GWavePath(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.shape    ) copy.shape     = this.shape    .copy();
        if (this.base     ) copy.base      = this.base     .copy();
        if (this.amplitude) copy.amplitude = this.amplitude.copy();
        if (this.frequency) copy.frequency = this.frequency.copy();
        if (this.offset   ) copy.offset    = this.offset   .copy();
        if (this.bias     ) copy.bias      = this.bias     .copy();
        
        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'x':         return this.input ? this.value.x         : this.x;
            case 'y':         return this.input ? this.value.y         : this.y;
            case 'width':     return this.input ? this.value.width     : this.width;
            case 'height':    return this.input ? this.value.height    : this.height;
            case 'shape':     return this.input ? this.value.shape     : this.shape;
            case 'base':      return this.input ? this.value.base      : this.base;
            case 'amplitude': return this.input ? this.value.amplitude : this.amplitude;
            case 'frequency': return this.input ? this.value.frequency : this.frequency;
            case 'offset':    return this.input ? this.value.offset    : this.offset;
            case 'bias':      return this.input ? this.value.bias      : this.bias;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let [x, y, width, height] = await this.evalBaseParams(parse);


        let input     = this.input     ? (await this.input    .eval(parse)).toValue() : null;
        let shape     = this.shape     ? (await this.shape    .eval(parse)).toValue() : null;
        let base      = this.base      ? (await this.base     .eval(parse)).toValue() : null;
        let amplitude = this.amplitude ? (await this.amplitude.eval(parse)).toValue() : null;
        let frequency = this.frequency ? (await this.frequency.eval(parse)).toValue() : null;
        let offset    = this.offset    ? (await this.offset   .eval(parse)).toValue() : null;
        let bias      = this.bias      ? (await this.bias     .eval(parse)).toValue() : null;


        if (input)
        {
            this.value        = input.copy();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            if (x        )  this.value.x         = x;          else  x          = this.value.x;      
            if (y        )  this.value.y         = y;          else  y          = this.value.y;      
            if (width    )  this.value.width     = width;      else  width      = this.value.width;  
            if (height   )  this.value.height    = height;     else  height     = this.value.height; 
            if (shape    )  this.value.shape     = shape;      else  shape      = this.value.shape;
            if (base     )  this.value.base      = base;       else  base       = this.value.base;
            if (amplitude)  this.value.amplitude = amplitude;  else  amplitude  = this.value.amplitude;
            if (frequency)  this.value.frequency = frequency;  else  frequency  = this.value.frequency;
            if (offset   )  this.value.offset    = offset;     else  offset     = this.value.offset;
            if (bias     )  this.value.bias      = bias;       else  bias       = this.value.bias;
        }
        else
        {
            this.value = new WavePathValue(
                this.nodeId,
                x, 
                y, 
                width, 
                height,
                shape,
                base,
                amplitude,
                frequency,
                offset,
                bias);
        }


        this.setUpdateValues(parse, 
        [
            ['x',          x        ],
            ['y',          y        ],
            ['width',      width    ],
            ['height',     height   ],
            ['shape',      shape    ],
            ['base',       base     ],
            ['amplitude',  amplitude],
            ['frequency',  frequency],
            ['offset',     offset   ],
            ['bias',       bias     ]
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
            && this.value.x        .isValid()
            && this.value.y        .isValid()
            && this.value.width    .isValid()
            && this.value.height   .isValid()
            && this.value.shape    .isValid()
            && this.value.base     .isValid()
            && this.value.amplitude.isValid()
            && this.value.frequency.isValid()
            && this.value.offset   .isValid()
            && this.value.bias     .isValid()) 
        {
            let   x    = this.value.x        .value;
            let   y    = this.value.y        .value;
            let   w    = this.value.width    .value;
            let   h    = this.value.height   .value;

            const sh   = this.value.shape    .value;
            const bs   = this.value.base     .value;
            const amp  = this.value.amplitude.value;
            const freq = this.value.frequency.value;
            const off  = this.value.offset   .value;
            const bias = this.value.bias     .value;


            [x, y, w, h, , ] = validateObjectRect(x, y, w, h);


            if (   w != 0 
                && h != 0)
            {
                const wave = new FigmaWavePath(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w, h, 
                    sh, 
                    bs,
                    amp,
                    freq,
                    off,
                    bias);


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
            && this.base      && this.base     .isValid()
            && this.amplitude && this.amplitude.isValid()
            && this.frequency && this.frequency.isValid()
            && this.offset    && this.offset   .isValid()
            && this.bias      && this.bias     .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);
 
        if (this.shape    ) this.shape    .pushValueUpdates(parse);
        if (this.base     ) this.base     .pushValueUpdates(parse);
        if (this.amplitude) this.amplitude.pushValueUpdates(parse);
        if (this.frequency) this.frequency.pushValueUpdates(parse);
        if (this.offset   ) this.offset   .pushValueUpdates(parse);
        if (this.bias     ) this.bias     .pushValueUpdates(parse);
    }

   
        
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.shape    ) this.shape    .invalidateInputs(parse, from, force);
        if (this.base     ) this.base     .invalidateInputs(parse, from, force);
        if (this.amplitude) this.amplitude.invalidateInputs(parse, from, force);
        if (this.frequency) this.frequency.invalidateInputs(parse, from, force);
        if (this.offset   ) this.offset   .invalidateInputs(parse, from, force);
        if (this.bias     ) this.bias     .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);
 
        if (this.shape    ) this.shape    .iterateLoop(parse);
        if (this.base     ) this.base     .iterateLoop(parse);
        if (this.amplitude) this.amplitude.iterateLoop(parse);
        if (this.frequency) this.frequency.iterateLoop(parse);
        if (this.offset   ) this.offset   .iterateLoop(parse);
        if (this.bias     ) this.bias     .iterateLoop(parse);
    }
}