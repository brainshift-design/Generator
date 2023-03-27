class GFill
extends GOperator
{
    input   = null;

    color   = null;
    opacity = null;



    constructor(nodeId, options)
    {
        super(FILL, nodeId, options);
    }



    copy()
    {
        const copy = new GFill(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.color  ) copy.color   = this.color  .copy();
        if (this.opacity) copy.opacity = this.opacity.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;
``

        const color   = this.color   ? this.color  .eval(parse).toValue() : null;
        const opacity = this.opacity ? this.opacity.eval(parse).toValue() : null;

        
        if (this.input)
        {
            const input = this.input.eval(parse).toValue();

            this.value = new FillValue(
                color   ?? input.color,
                opacity ?? input.opacity);
        }
        else
        {
            this.value = new FillValue(color, opacity);
        }


        this.color   = this.value.color  .copy();
        this.opacity = this.value.opacity.copy();


        genPushUpdateValue(parse, this.nodeId, 'color',   this.color  );
        genPushUpdateValue(parse, this.nodeId, 'opacity', this.opacity);


        this.validate();

        return this;
    }



    isValid()
    {
        return this.color  .isValid()
            && this.opacity.isValid();
    }



    toValue()
    {
        return new FillValue(
            this.color   ? this.color  .toValue() : this.input.color  .toValue(),
            this.opacity ? this.opacity.toValue() : this.input.opacity.toValue());
    }
}