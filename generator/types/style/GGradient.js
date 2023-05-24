class GGradient
extends GOperator
{
    inputs = [];

    gradType = null;
    x1       = null;
    y1       = null;
    x2       = null;
    y2       = null;
    aspect   = null;
    angle    = null;



    constructor(nodeId, options)
    {
        super(GRADIENT, nodeId, options);
    }



    copy()
    {
        const copy = new GGradient(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.gradType) copy.gradType = this.x1    .copy();
        if (this.x1      ) copy.x1       = this.x1    .copy();
        if (this.y1      ) copy.y1       = this.y1    .copy();
        if (this.x2      ) copy.x2       = this.x2    .copy();
        if (this.y2      ) copy.y2       = this.y2    .copy();
        if (this.aspect  ) copy.aspect   = this.aspect.copy();
        if (this.angle   ) copy.angle    = this.angle .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        const gradType = this.gradType ? (await this.gradType.eval(parse)).toValue() : null;
        const x1       = this.x1       ? (await this.x1      .eval(parse)).toValue() : null;
        const y1       = this.y1       ? (await this.y1      .eval(parse)).toValue() : null;
        const x2       = this.x2       ? (await this.x2      .eval(parse)).toValue() : null;
        const y2       = this.y2       ? (await this.y2      .eval(parse)).toValue() : null;
        const aspect   = this.aspect   ? (await this.aspect  .eval(parse)).toValue() : null;
        const angle    = this.angle    ? (await this.angle   .eval(parse)).toValue() : null;


        const stops = new ListValue();

        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);
            stops.items.push(this.inputs[i].toValue());
        }


        this.value = new GradientValue(
            stops,
            gradType,
            x1, 
            y1, 
            x2, 
            y2, 
            aspect,
            angle);


        this.updateValues =
        [
            ['value',  this.value],
            ['type',   gradType  ],
            ['x1',     x1        ],
            ['y1',     y1        ],
            ['x2',     x2        ],
            ['y2',     y2        ],
            ['aspect', aspect    ],
            ['angle',  angle     ]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.gradType) this.gradType.pushValueUpdates(parse);
        if (this.x1      ) this.x1      .pushValueUpdates(parse);
        if (this.y1      ) this.y1      .pushValueUpdates(parse);
        if (this.x2      ) this.x2      .pushValueUpdates(parse);
        if (this.y2      ) this.y2      .pushValueUpdates(parse);
        if (this.aspect  ) this.aspect  .pushValueUpdates(parse);
        if (this.angle   ) this.angle   .pushValueUpdates(parse);
    }    
    
    
    toValue()
    {
        return new GradientValue(
            new ListValue(),
            this.gradType ? this.gradType.toValue() : this.input.gradType.toValue(),
            this.x1       ? this.x1      .toValue() : this.input.x1      .toValue(),
            this.y1       ? this.y1      .toValue() : this.input.y1      .toValue(),
            this.x2       ? this.x2      .toValue() : this.input.x2      .toValue(),
            this.y2       ? this.y2      .toValue() : this.input.y2      .toValue(),
            this.aspect   ? this.aspect  .toValue() : this.input.aspect  .toValue(),
            this.angle    ? this.angle   .toValue() : this.input.angle   .toValue());
    }                 



    isValid()
    {
        return this.gradType.isValid()
            && this.x1      .isValid()
            && this.y1      .isValid()
            && this.x2      .isValid()
            && this.y2      .isValid()
            && this.aspect  .isValid()
            && this.angle   .isValid();
    }



    invalidate()
    {
        super.invalidate();

        this.inputs.forEach(i => i.invalidate());
        
        if (this.gradType) this.gradType.invalidate();
        if (this.x1      ) this.x1      .invalidate();
        if (this.y1      ) this.y1      .invalidate();
        if (this.x2      ) this.x2      .invalidate();
        if (this.y2      ) this.y2      .invalidate();
        if (this.aspect  ) this.aspect  .invalidate();
        if (this.angle   ) this.angle   .invalidate();
    }
}