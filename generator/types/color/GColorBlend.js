class GColorBlend
extends GColorType2
{
    mode;
    opacity;
    

    constructor(nodeId, options)
    {
        super(COLOR_BLEND, nodeId, options);
    }


    
    copy()
    {
        const copy = new GColorBlend(this.nodeId, this.options);

        copy.copyBase(this);

        copy.mode    = this.mode   .copy();
        copy.opacity = this.opacity.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const mode    = (await this.mode   .eval(parse)).toValue().toInteger();
        const opacity = (await this.opacity.eval(parse)).toValue();


        if (   this.input0 
            && this.input1)
        {
            const input0 = (await this.input0.eval(parse)).toValue();
            const input1 = (await this.input1.eval(parse)).toValue();

            console.assert(
                opacity.type == NUMBER_VALUE, 
                'this.result.type must be NUMBER_VALUE');

            const _opacity = opacity.value / 100;

            const modeIndex = Math.min(Math.max(0, mode.value), BlendModes.length-1);


            const col = this.blend(
                modeIndex,
                input0.toRgb(),
                input1.toRgb(),
                _opacity);

            this.value = ColorValue.fromRgb(scaleRgb(col));
        }

        else if (this.input0) 
            this.value = (await this.input0.eval(parse)).toValue();

        else if (this.input1) 
            this.value = (await this.input1.eval(parse)).toValue();
            
        else 
            this.value = ColorValue.NaN;


        this.updateValues = 
        [
            ['value',   this.value],
            ['mode',    mode      ],
            ['opacity', opacity   ]
        ];


        this.validate();
        
        return this;
    }



    blend(mode, col0, col1, opacity)
    {
        switch (mode)
        {
            case  0: return blendNormal    (col0, col1, opacity);

            case  1: return blendDarken    (col0, col1, opacity);
            case  2: return blendMultiply  (col0, col1, opacity);
            case  3: return blendColorBurn (col0, col1, opacity);

            case  4: return blendLighten   (col0, col1, opacity);
            case  5: return blendScreen    (col0, col1, opacity);
            case  6: return blendColorDodge(col0, col1, opacity);

            case  7: return blendOverlay   (col0, col1, opacity);
            case  8: return blendSoftLight (col0, col1, opacity);
            case  9: return blendHardLight (col0, col1, opacity);

            case 10: return blendDifference(col0, col1, opacity);
            case 11: return blendExclusion (col0, col1, opacity);

            case 12: return blendHue       (col0, col1, opacity);
            case 13: return blendSaturation(col0, col1, opacity);
            case 14: return blendColor     (col0, col1, opacity);
            case 15: return blendLuminosity(col0, col1, opacity);
        }
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.mode   ) this.mode   .pushValueUpdates(parse);
        if (this.opacity) this.opacity.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.mode   ) this.mode   .invalidateInputs(from);
        if (this.opacity) this.opacity.invalidateInputs(from);
    }
}
