class GColorBlind
extends GOperator
{
    input = null;

    l;
    m;
    s;


    constructor(nodeId, active)
    {
        super(COLORBLIND, nodeId, active);
    }


    
    copy()
    {
        const cb = new GColorBlind(this.nodeId, this.active);

        if (this.input) cb.input = this.input.copy();

        cb.l = this.l.copy();
        cb.m = this.m.copy();
        cb.s = this.s.copy();

        return cb;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            const l = this.l.eval(parse).copy();
            const m = this.m.eval(parse).copy();
            const s = this.s.eval(parse).copy();


            if (this.input)
            {
                const input = this.input.eval(parse).copy();

                const rgb = input.toRgb();

                //const validRgb = invalid2validRgb(rgb);

                const rgbCb = rgb2colorblind(
                    rgb,
                    this.l.value / 2,
                    this.m.value / 2,
                    this.s.value / 2);

                if (   isValidRgb(rgb)
                    && isValidRgb(rgbCb))
                {
                    const validRgbCb = rgbCb;//invalid2validRgb(cb);
                
                    const validCol = convertDataColorToSpace(
                        rgb2dataColor(validRgbCb), 
                        colorSpace(input.space.value));
    
                    const factor = getColorSpaceFactor(validCol[0]);
    
                    this.result = ColorValue.create(
                        input.space.value,
                        validCol[1] * factor[0],
                        validCol[2] * factor[1],
                        validCol[3] * factor[2]);
                }
                else
                    this.result = ColorValue.NaN;
            }
            else
                this.result = ColorValue.NaN;


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'value', this.result);

            genPushUpdateValue(parse, this.nodeId, 'l', l);
            genPushUpdateValue(parse, this.nodeId, 'm', m);
            genPushUpdateValue(parse, this.nodeId, 's', s);
        }


        return this.result;
    }
}
