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
            const input = (await this.inputs[i].eval(parse)).toValue();
            stops.items.push(input);
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
        

        if (!this.gradType) this.gradType = this.value.gradType.copy();
        if (!this.x       ) this.x        = this.value.x       .copy();
        if (!this.y       ) this.y        = this.value.y       .copy();
        if (!this.size    ) this.size     = this.value.size    .copy();
        if (!this.angle   ) this.angle    = this.value.angle   .copy();
        if (!this.aspect  ) this.aspect   = this.value.aspect  .copy();
        if (!this.skew    ) this.skew     = this.value.skew    .copy();
        if (!this.blend   ) this.blend    = this.value.blend   .copy();


        this.validate();

        return this;
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
        return !this.inputs.find(i => !i.isValid())
            && this.gradType && this.gradType.isValid()
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
        if (this.x       ) this.x       .pushValueUpdates(parse);
        if (this.y       ) this.y       .pushValueUpdates(parse);
        if (this.size    ) this.size    .pushValueUpdates(parse);
        if (this.angle   ) this.angle   .pushValueUpdates(parse);
        if (this.aspect  ) this.aspect  .pushValueUpdates(parse);
        if (this.skew    ) this.skew    .pushValueUpdates(parse);
        if (this.blend   ) this.blend   .pushValueUpdates(parse);
    }    



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        this.inputs.forEach(i => i.invalidateInputs(parse, from));
        
        if (this.gradType) this.gradType.invalidateInputs(parse, from);
        if (this.x       ) this.x       .invalidateInputs(parse, from);
        if (this.y       ) this.y       .invalidateInputs(parse, from);
        if (this.size    ) this.size    .invalidateInputs(parse, from);
        if (this.angle   ) this.angle   .invalidateInputs(parse, from);
        if (this.aspect  ) this.aspect  .invalidateInputs(parse, from);
        if (this.skew    ) this.skew    .invalidateInputs(parse, from);
        if (this.blend   ) this.blend   .invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));

        if (this.gradType) this.gradType.iterateLoop(parse);
        if (this.x       ) this.x       .iterateLoop(parse);
        if (this.y       ) this.y       .iterateLoop(parse);
        if (this.size    ) this.size    .iterateLoop(parse);
        if (this.angle   ) this.angle   .iterateLoop(parse);
        if (this.aspect  ) this.aspect  .iterateLoop(parse);
        if (this.skew    ) this.skew    .iterateLoop(parse);
        if (this.blend   ) this.blend   .iterateLoop(parse);
    }    
}