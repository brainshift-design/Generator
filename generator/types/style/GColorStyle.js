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
            const rgb = this.value.toRgb();
            this.evalStyle({rgb: rgb});
        }
        else
            this.value = ColorValue.NaN;


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
                      0xff * options.rgb[0]
              + ' ' + 0xff * options.rgb[1]
              + ' ' + 0xff * options.rgb[2]
              + ' ' + 0xff ]
        ];


        this.style = style;
    }
}