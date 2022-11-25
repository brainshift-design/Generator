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


        this.l = this.l.eval(parse).copy();
        this.m = this.m.eval(parse).copy();
        this.s = this.s.eval(parse).copy();

        const l = this.l.toValue();        
        const m = this.m.toValue();
        const s = this.s.toValue();


        if (this.input)
        {
            this.input = this.input.eval(parse).copy();
            const input = this.input.toValue();

            const rgb = input.toRgb();

            //const validRgb = invalid2validRgb(rgb);

            const rgbCb = rgb2colorblind(
                rgb,
                l.value / 2,
                m.value / 2,
                s.value / 2);

            if (   rgbIsOk(rgb)
                && rgbIsOk(rgbCb))
            {
                const validRgbCb = rgbCb;//invalid2validRgb(cb);
            
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
