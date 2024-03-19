class GColorBlend
extends GOperator2
{
    mode    = null;
    opacity = null;
    

    constructor(nodeId, options)
    {
        super(COLOR_BLEND, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.mode    = null;
        this.opacity = null;
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


        const input0  = await evalColorValue (this.input0,  parse);
        const input1  = await evalColorValue (this.input1,  parse);
        let   mode    = await evalNumberValue(this.mode,    parse);
        const opacity = await evalNumberValue(this.opacity, parse);
        
        if (mode) mode = mode.toInteger();


        if (   input0 
            && input1)
        {
            consoleAssert(
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

        else if (input0) 
            this.value = input0;

        else if (this.input1) 
            this.value = input1;
            
        else 
            this.value = ColorValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['value',   this.value],
            ['mode',    mode      ],
            ['opacity', opacity   ]
        ]);


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



    isValid()
    {
        return super.isValid()
            && this.mode    && this.mode   .isValid()
            && this.opacity && this.opacity.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.mode   ) this.mode   .pushValueUpdates(parse);
        if (this.opacity) this.opacity.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.mode   ) this.mode   .invalidateInputs(parse, from, force);
        if (this.opacity) this.opacity.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.mode   ) this.mode   .iterateLoop(parse);
        if (this.opacity) this.opacity.iterateLoop(parse);
    }
}
