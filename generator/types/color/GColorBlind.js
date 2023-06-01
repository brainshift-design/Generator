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



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const l = (await this.l.eval(parse)).toValue();        
        const m = (await this.m.eval(parse)).toValue();
        const s = (await this.s.eval(parse)).toValue();


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();
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
                this.value = input;
        }
        else
            this.value = ColorValue.NaN;


        this.updateValues =
        [
            ['l',     l         ],
            ['m',     m         ],
            ['s',     s         ],
            ['value', this.value]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input ) this.input.pushValueUpdates(parse);
        if (this.l     ) this.l    .pushValueUpdates(parse);
        if (this.m     ) this.m    .pushValueUpdates(parse);
        if (this.s     ) this.s    .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input ) this.input.invalidateInputs(from);
        if (this.l     ) this.l    .invalidateInputs(from);
        if (this.m     ) this.m    .invalidateInputs(from);
        if (this.s     ) this.s    .invalidateInputs(from);
    }
}
