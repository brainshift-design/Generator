class GColorStyle
extends GShape
{
    id;

    colorStyle;

    existing;
    linked;



    constructor(nodeId, options, styleId)
    {
        super(COLOR_STYLE, nodeId, options);

        this.id == styleId;
    }



    copy()
    {
        const copy = new GColorStyle(this.nodeId, this.options);

        copy.id         = this.id;
        copy.colorStyle = this.colorStyle.copy();
        
        copy.existing   = this.existing;
        copy.linked     = this.linked;

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        this.value = (await this.value.eval(parse)).toValue();


        if (   this.value.isValid()
            && (  !this.existing
                || this.linked))
        {
            if (this.value.type == COLOR_VALUE)
                this.value = FillValue.fromRgb(scaleRgb(this.value.toRgb()), 0xff);

            const rgba       = this.value.toRgba();
            const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);

            this.evalStyle({rgba: rgbaStripe});
        }
        else
            this.value = FillValue.NaN;


        this.updateValues = [['value', this.value]];


        this.validate();

        return this;
    }



    evalStyle(options = {})
    {
        if (!this.options.enabled)
            return;

            
        const colorStyle = new FigmaColorStyle(this.nodeId, this.id, this.name);

        colorStyle.existing = this.existing;


        colorStyle.paints = 
        [
            [ 'SOLID', 
                      Math.round(options.rgba[0] * 0xff)
              + ' ' + Math.round(options.rgba[1] * 0xff)
              + ' ' + Math.round(options.rgba[2] * 0xff)
              + ' ' + Math.round(options.rgba[3] * 100 ) ]
        ];


        this.colorStyle = colorStyle;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.colorStyle) this.colorStyle.pushValueUpdates(parse);
    }



    invalidate()
    {
        super.invalidate();

        if (this.colorStyle) this.colorStyle.invalidate();
    }
}