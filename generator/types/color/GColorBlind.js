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
        const cb = new GColorBlind(this.nodeId, this.options);

        cb.copyBase(this);

        if (this.input) cb.input = this.input.copy();

        cb.l = this.l.copy();
        cb.m = this.m.copy();
        cb.s = this.s.copy();

        return cb;
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

            const rgbCb = rgb2colorblind(
                rgb,
                l.value / 2,
                m.value / 2,
                s.value / 2);

            if (   rgbIsOk(rgb)
                && rgbIsOk(rgbCb))
            {
                const validRgbCb = rgbCb;
            
                const validCol = convertDataColorToSpace(
                    rgb2dataColor(validRgbCb), 
                    colorSpace(input.space.value));

                const factor = colorSpaceFactor(validCol[0]);

                this.value = ColorValue.create(
                    input.space.value,
                    validCol[1] * factor[0],
                    validCol[2] * factor[1],
                    validCol[3] * factor[2]);
            }
            else
                this.value = ColorValue.NaN;
        }
        else
            this.value = ColorValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'l', l);
        genPushUpdateValue(parse, this.nodeId, 'm', m);
        genPushUpdateValue(parse, this.nodeId, 's', s);


        this.validate();

        return this;
    }
}
