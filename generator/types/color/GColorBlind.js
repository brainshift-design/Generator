class GColorBlind
extends GOperator1
{
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
                    this.value = ColorValue.NaN.copy();
            }
            else
                this.value = input;
        }
        else
            this.value = ColorValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['l',     l         ],
            ['m',     m         ],
            ['s',     s         ],
            ['value', this.value]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.l && this.l.isValid()
            && this.m && this.m.isValid()
            && this.s && this.s.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.l) this.l.pushValueUpdates(parse);
        if (this.m) this.m.pushValueUpdates(parse);
        if (this.s) this.s.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.l) this.l.invalidateInputs(parse, from, force);
        if (this.m) this.m.invalidateInputs(parse, from, force);
        if (this.s) this.s.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.l) this.l.iterateLoop(parse);
        if (this.m) this.m.iterateLoop(parse);
        if (this.s) this.s.iterateLoop(parse);
    }
}
