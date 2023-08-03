class GGradient
extends GOperator
{
    inputs = [];

    gradType = null;
    x        = null;
    y        = null;
    size     = null;
    angle    = null;
    aspect   = null;
    skew     = null;
    blend    = null;



    constructor(nodeId, options)
    {
        super(GRADIENT, nodeId, options);
    }



    copy()
    {
        const copy = new GGradient(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.gradType) copy.gradType = this.x     .copy();
        if (this.x       ) copy.x        = this.x     .copy();
        if (this.y       ) copy.y        = this.y     .copy();
        if (this.size    ) copy.size     = this.size  .copy();
        if (this.angle   ) copy.angle    = this.angle .copy();
        if (this.aspect  ) copy.aspect   = this.aspect.copy();
        if (this.skew    ) copy.skew     = this.skew  .copy();
        if (this.blend   ) copy.blend    = this.blend .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        const gradType = this.gradType ? (await this.gradType.eval(parse)).toValue() : null;
        const x        = this.x        ? (await this.x       .eval(parse)).toValue() : null;
        const y        = this.y        ? (await this.y       .eval(parse)).toValue() : null;
        const size     = this.size     ? (await this.size    .eval(parse)).toValue() : null;
        const angle    = this.angle    ? (await this.angle   .eval(parse)).toValue() : null;
        const aspect   = this.aspect   ? (await this.aspect  .eval(parse)).toValue() : null;
        const skew     = this.skew     ? (await this.skew    .eval(parse)).toValue() : null;
        const blend    = this.blend    ? (await this.blend   .eval(parse)).toValue() : null;


        const stops = new ListValue();

        for (let i = 0, o = 0; i < this.inputs.length; i++)
        {
            await this.inputs[i].eval(parse);
            stops.items.push(this.inputs[i].toValue());
        }


        this.value = new GradientValue(
            stops,
            gradType,
            x, 
            y, 
            size, 
            angle, 
            aspect,
            skew,
            blend);

            
        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.gradType) this.gradType.pushValueUpdates(parse);
        if (this.x       ) this.x       .pushValueUpdates(parse);
        if (this.y       ) this.y       .pushValueUpdates(parse);
        if (this.size    ) this.size    .pushValueUpdates(parse);
        if (this.angle   ) this.angle   .pushValueUpdates(parse);
        if (this.aspect  ) this.aspect  .pushValueUpdates(parse);
        if (this.skew    ) this.skew    .pushValueUpdates(parse);
        if (this.blend   ) this.blend   .pushValueUpdates(parse);
    }    
    
    
    toValue()
    {
        const stops = new ListValue();

        for (let i = 0, o = 0; i < this.inputs.length; i++)
            stops.items.push(this.inputs[i].toValue());


        return new GradientValue(
            stops,
            this.gradType ? this.gradType.toValue() : this.input.gradType.toValue(),
            this.x        ? this.x       .toValue() : this.input.x       .toValue(),
            this.y        ? this.y       .toValue() : this.input.y       .toValue(),
            this.size     ? this.size    .toValue() : this.input.size    .toValue(),
            this.angle    ? this.angle   .toValue() : this.input.angle   .toValue(),
            this.aspect   ? this.aspect  .toValue() : this.input.aspect  .toValue(),
            this.skew     ? this.skew    .toValue() : this.input.skew    .toValue(),
            this.blend    ? this.blend   .toValue() : this.input.blend   .toValue());
    }                 



    isValid()
    {
        return this.gradType.isValid()
            && this.x       .isValid()
            && this.y       .isValid()
            && this.size    .isValid()
            && this.angle   .isValid()
            && this.aspect  .isValid()
            && this.skew    .isValid()
            && this.blend   .isValid();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        this.inputs.forEach(i => i.invalidateInputs(from));
        
        if (this.gradType) this.gradType.invalidateInputs(from);
        if (this.x       ) this.x       .invalidateInputs(from);
        if (this.y       ) this.y       .invalidateInputs(from);
        if (this.size    ) this.size    .invalidateInputs(from);
        if (this.angle   ) this.angle   .invalidateInputs(from);
        if (this.aspect  ) this.aspect  .invalidateInputs(from);
        if (this.skew    ) this.skew    .invalidateInputs(from);
        if (this.blend   ) this.blend   .invalidateInputs(from);
    }
}