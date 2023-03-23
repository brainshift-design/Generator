class GColorBlind
extends GColorType
{
    input = null;

    l;
    m;
    s;


    constructor(nodeId, options)
    {
        super(COLORBLIND, nodeId, options);
    }


    
    copy()
    {
        const copy = new GColorBlind(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        copy.l = this.l.copy();
        copy.m = this.m.copy();
        copy.s = this.s.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        const l = this.l.eval(parse).toValue();        
        const m = this.m.eval(parse).toValue();
        const s = this.s.eval(parse).toValue();


        if (this.input)
        {
            const input = this.input.eval(parse).toValue();
            const rgb   = input.toRgb();

            if (this.options.enabled)
            {
                const rgbCb = rgb2colorblind(
                    rgb,
                    l.value / 2,
                    m.value / 2,
                    s.value / 2);

                if (   !rgbIsNaN(rgb)
                    && !rgbIsNaN(rgbCb))
                {
                    const validRgbCb = rgbCb;
                
                    const validCol = convertDataColorToSpace(
                        rgb2dataColor(validRgbCb), 
                        colorSpace(input.space.value));

                    this.value = ColorValue.fromDataColor(validCol);
                }
                else
                    this.value = ColorValue.NaN;
            }
            else
                this.value = input.copy();
        }
        else
            this.value = ColorValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'l',     l);
        genPushUpdateValue(parse, this.nodeId, 'm',     m);
        genPushUpdateValue(parse, this.nodeId, 's',     s);
        genPushUpdateValue(parse, this.nodeId, 'value', this.value);


        this.validate();

        return this;
    }
}
