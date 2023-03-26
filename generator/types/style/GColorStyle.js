class GColorStyle
extends GObjectBase
{
    id;
    style;

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

        copy.id       = this.id;
        copy.style    = this.style.copy();
        
        copy.existing = this.existing;
        copy.linked   = this.linked;

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;

            
        this.value = this.value.eval(parse).toValue();


        if (   this.value.isValid()
            && (  !this.existing
                || this.linked))
        {
            if (this.value.type == COLOR_VALUE)
                this.value = FillValue.fromRgb(scaleRgb(this.value.toRgb()), 0xff);

            const rgba = this.value.toRgba();
            this.evalStyle({rgba: rgba});
        }
        else
            this.value = FillValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }



    evalStyle(options = {})
    {
        if (!this.options.enabled)
            return;

            
        const style = new FigmaColorStyle(this.nodeId, this.id, this.name);

        style.existing = this.existing;


        style.paints = 
        [
            [ 'SOLID', 
                      Math.round(options.rgba[0] * 0xff)
              + ' ' + Math.round(options.rgba[1] * 0xff)
              + ' ' + Math.round(options.rgba[2] * 0xff)
              + ' ' + Math.round(options.rgba[3] * 100 )]
        ];


        this.style = style;
    }
}