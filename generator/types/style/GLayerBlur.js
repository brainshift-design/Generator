class GLayerBlur
extends GOperator
{
    input  = null;

    radius = null;



    constructor(nodeId, options)
    {
        super(LAYER_BLUR, nodeId, options);
    }



    copy()
    {
        const copy = new GLayerBlur(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.radius) copy.radius = this.radius.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
``

        const radius = this.radius ? (await this.radius.eval(parse)).toValue() : null;

        
        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = new LayerBlurValue(
                radius ?? input.radius,
                this.options.enabled);
        }
        else
        {
            this.value = new LayerBlurValue(
                radius,
                this.options.enabled);
        }


        this.updateValues =
        [
            ['radius', this.value.radius]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.radius) this.radius.pushValueUpdates(parse);
    }
    
    
    
    toValue()
    {
        return new LayerBlurValue(
            this.radius ? this.radius.toValue() : this.input.radius.toValue(),
            this.options.enabled);
    }



    isValid()
    {
        return this.radius.isValid();
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input ) this.input .invalidateInputs();
        if (this.radius) this.radius.invalidateInputs();
    }
}