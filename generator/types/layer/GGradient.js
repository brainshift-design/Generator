class GGradient
extends GOperator
{
    inputs = [];

    gradType = null;
    position = null;
    x        = null;
    y        = null;
    size     = null;
    angle    = null;
    aspect   = null;
    skew     = null;
    blend    = null;
    
    diagAspect;
    

    
    constructor(nodeId, options)
    {
        super(GRADIENT, nodeId, options);
    }
    
    
    
    reset()
    {
        super.reset();
        
        this.inputs = [];
    
        this.gradType = null;
        this.position = null;
        this.x        = null;
        this.y        = null;
        this.size     = null;
        this.angle    = null;
        this.aspect   = null;
        this.skew     = null;
        this.blend    = null;
    }



    copy()
    {
        const copy = new GGradient(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.gradType) copy.gradType = this.x       .copy();
        if (this.position) copy.position = this.position.copy();
        if (this.x       ) copy.x        = this.x       .copy();
        if (this.y       ) copy.y        = this.y       .copy();
        if (this.size    ) copy.size     = this.size    .copy();
        if (this.angle   ) copy.angle    = this.angle   .copy();
        if (this.aspect  ) copy.aspect   = this.aspect  .copy();
        if (this.skew    ) copy.skew     = this.skew    .copy();
        if (this.blend   ) copy.blend    = this.blend   .copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'gradType':  return this.input ? this.value.gradType : this.gradType;
            case 'position':  return this.input ? this.value.position : this.position;
            case 'x':         return this.input ? this.value.x        : this.x;
            case 'y':         return this.input ? this.value.y        : this.y;
            case 'size':      return this.input ? this.value.size     : this.size;
            case 'angle':     return this.input ? this.value.angle    : this.angle;
            case 'aspect':    return this.input ? this.value.aspect   : this.aspect;
            case 'skew':      return this.input ? this.value.skew     : this.skew;
            case 'blend':     return this.input ? this.value.blend    : this.blend;
        }

        return null;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        let gradType = await evalNumberValue(this.gradType, parse);
        let position = await evalNumberValue(this.position, parse);
        let x        = await evalNumberValue(this.x,        parse);
        let y        = await evalNumberValue(this.y,        parse);
        let size     = await evalNumberValue(this.size,     parse);
        let angle    = await evalNumberValue(this.angle,    parse);
        let aspect   = await evalNumberValue(this.aspect,   parse);
        let skew     = await evalNumberValue(this.skew,     parse);
        let blend    = await evalNumberValue(this.blend,    parse);


        if (position) position.value = Math.min(Math.max(0, Math.floor(position.value)), 4);
        if (blend   ) blend   .value = Math.min(Math.max(0, Math.floor(blend   .value)), BlendModes.length-1);


        let stops = new ListValue();


        const inputs = [];
        
        for (const input of this.inputs)
            inputs.push(await evalValue(input, parse));


        if (   inputs.length == 1
            && inputs[0].type == GRADIENT_VALUE)
        {
            this.value        = inputs[0].toValue();
            this.value.nodeId = this.nodeId;
            
            this.value.copyCustomParams(inputs[0]);

            if (gradType)  this.value.gradType = gradType;  else  gradType = this.value.gradType;      
            if (position)  this.value.position = position;  else  position = this.value.position;      
            if (x       )  this.value.x        = x;         else  x        = this.value.x;      
            if (y       )  this.value.y        = y;         else  y        = this.value.y;      
            if (size    )  this.value.size     = size;      else  size     = this.value.size;      
            if (angle   )  this.value.angle    = angle;     else  angle    = this.value.angle;      
            if (aspect  )  this.value.aspect   = aspect;    else  aspect   = this.value.aspect;      
            if (skew    )  this.value.skew     = skew;      else  skew     = this.value.skew;      
            if (blend   )  this.value.blend    = blend;     else  blend    = this.value.blend;      
        }
        else
        {
            for (let i = 0, o = 0; i < inputs.length; i++)
            {
                const input = inputs[i];

                if (   input
                    && this.options.enabled)
                {
                    if (isListValueType(input.type))
                    {
                        for (const item of input.items)
                            if (item.isValid())
                                stops.items.push(item);
                    }
                    else if (input.type == GRADIENT_VALUE)
                    {
                        for (const item of input.stops.items)
                            stops.items.push(item);
                    }
                    else
                        if (input.isValid())
                            stops.items.push(input);
                }
            }


            stops.items = validateColorStops(stops.items);

            setColorStopPositions(stops.items);


            this.value = new GradientValue(
                stops,
                gradType,
                position,
                x, 
                y, 
                size, 
                angle, 
                aspect,
                this.diagAspect,
                skew,
                blend);
        }

        
        this.setUpdateValues(parse,
        [
            ['value',    this.value],
            ['gradType', gradType  ],
            ['position', position  ],
            ['x',        x         ],
            ['y',        y         ],
            ['size',     size      ],
            ['angle',    angle     ],
            ['aspect',   aspect    ],
            ['skew',     skew      ],
            ['blend',    blend     ]
        ]);
        

        if (   inputs.length == 1
            && inputs[0].type == GRADIENT_VALUE)
        {
            if (!this.gradType) this.gradType = this.value.gradType.copy();
            if (!this.position) this.position = this.value.position.copy();
            if (!this.x       ) this.x        = this.value.x       .copy();
            if (!this.y       ) this.y        = this.value.y       .copy();
            if (!this.size    ) this.size     = this.value.size    .copy();
            if (!this.angle   ) this.angle    = this.value.angle   .copy();
            if (!this.aspect  ) this.aspect   = this.value.aspect  .copy();
            if (!this.skew    ) this.skew     = this.value.skew    .copy();
            if (!this.blend   ) this.blend    = this.value.blend   .copy();
        }


        this.validate();

        return this;
    }

    
    
    toValue()
    {
        return this.value.copy();
    }                 



    isValid()
    {
        return !this.inputs.find(i => !i.isValid())
            && this.gradType && this.gradType.isValid()
            && this.position && this.position.isValid()
            && this.x        && this.x       .isValid()
            && this.y        && this.y       .isValid()
            && this.size     && this.size    .isValid()
            && this.angle    && this.angle   .isValid()
            && this.aspect   && this.aspect  .isValid()
            && this.skew     && this.skew    .isValid()
            && this.blend    && this.blend   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.gradType) this.gradType.pushValueUpdates(parse);
        if (this.position) this.position.pushValueUpdates(parse);
        if (this.x       ) this.x       .pushValueUpdates(parse);
        if (this.y       ) this.y       .pushValueUpdates(parse);
        if (this.size    ) this.size    .pushValueUpdates(parse);
        if (this.angle   ) this.angle   .pushValueUpdates(parse);
        if (this.aspect  ) this.aspect  .pushValueUpdates(parse);
        if (this.skew    ) this.skew    .pushValueUpdates(parse);
        if (this.blend   ) this.blend   .pushValueUpdates(parse);
    }    



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
        
        if (this.gradType) this.gradType.invalidateInputs(parse, from, force);
        if (this.position) this.position.invalidateInputs(parse, from, force);
        if (this.x       ) this.x       .invalidateInputs(parse, from, force);
        if (this.y       ) this.y       .invalidateInputs(parse, from, force);
        if (this.size    ) this.size    .invalidateInputs(parse, from, force);
        if (this.angle   ) this.angle   .invalidateInputs(parse, from, force);
        if (this.aspect  ) this.aspect  .invalidateInputs(parse, from, force);
        if (this.skew    ) this.skew    .invalidateInputs(parse, from, force);
        if (this.blend   ) this.blend   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.gradType) this.gradType.iterateLoop(parse);
        if (this.position) this.position.iterateLoop(parse);
        if (this.x       ) this.x       .iterateLoop(parse);
        if (this.y       ) this.y       .iterateLoop(parse);
        if (this.size    ) this.size    .iterateLoop(parse);
        if (this.angle   ) this.angle   .iterateLoop(parse);
        if (this.aspect  ) this.aspect  .iterateLoop(parse);
        if (this.skew    ) this.skew    .iterateLoop(parse);
        if (this.blend   ) this.blend   .iterateLoop(parse);
    }    
}