class GColorBlend
extends GOperator2
{
    mode   = null;
    amount = null;
    

    constructor(nodeId, options)
    {
        super(COLOR_BLEND, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.mode   = null;
        this.amount = null;
    }



    copy()
    {
        const copy = new GColorBlend(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.mode  ) copy.mode   = this.mode  .copy();
        if (this.amount) copy.amount = this.amount.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = await evalColorValue (this.input0, parse);
        const input1 = await evalColorValue (this.input1, parse);
        let   mode   = await evalNumberValue(this.mode,   parse);
        const amount = await evalNumberValue(this.amount, parse);
        
        if (mode) mode = mode.toInteger();


        if (   input0 
            && input1)
        {
            consoleAssert(
                amount.type == NUMBER_VALUE, 
                'this.result.type must be NUMBER_VALUE');

            const _amount = amount.value / 100;

            const modeIndex = Math.min(Math.max(0, mode.value), BlendModes.length-1);


            const col = this.blend(
                modeIndex,
                input0.toRgb(),
                input1.toRgb(),
                _amount);

            this.value = ColorValue.fromRgb(scaleRgb(col, 2 ));
        }

        else if (input0) 
            this.value = input0;

        else if (this.input1) 
            this.value = input1;
            
        else 
            this.value = ColorValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['value',  this.value],
            ['mode',   mode      ],
            ['amount', amount    ]
        ]);


        this.validate();
        
        return this;
    }



    blend(mode, col0, col1, amount)
    {
        switch (mode)
        {
            case  BLEND_NORMAL_INDEX:       return blendNormal     (col0, col1, amount);

            case  BLEND_DARKEN_INDEX:       return blendDarken     (col0, col1, amount);
            case  BLEND_MULTIPLY_INDEX:     return blendMultiply   (col0, col1, amount);
            case  BLEND_PLUS_DARKER_INDEX:  return blendPlusDarker (col0, col1, amount);
            case  BLEND_COLOR_BURN_INDEX:   return blendColorBurn  (col0, col1, amount);

            case  BLEND_LIGHTEN_INDEX:      return blendLighten    (col0, col1, amount);
            case  BLEND_SCREEN_INDEX:       return blendScreen     (col0, col1, amount);
            case  BLEND_PLUS_LIGHTER_INDEX: return blendPlusLighter(col0, col1, amount);
            case  BLEND_COLOR_DODGE_INDEX:  return blendColorDodge (col0, col1, amount);

            case  BLEND_OVERLAY_INDEX:      return blendOverlay    (col0, col1, amount);
            case  BLEND_SOFT_LIGHT_INDEX:   return blendSoftLight  (col0, col1, amount);
            case  BLEND_HARD_LIGHT_INDEX:   return blendHardLight  (col0, col1, amount);

            case BLEND_DIFFERENCE_INDEX:    return blendDifference (col0, col1);
            case BLEND_EXCLUSION_INDEX:     return blendExclusion  (col0, col1, amount);

            case BLEND_HUE_INDEX:           return blendHue        (col0, col1, amount);
            case BLEND_SATURATION_INDEX:    return blendSaturation (col0, col1, amount);
            case BLEND_COLOR_INDEX:         return blendColor      (col0, col1, amount);
            case BLEND_LUMINOSITY_INDEX:    return blendLuminosity (col0, col1, amount);
        }
    }



    isValid()
    {
        return super.isValid()
            && this.mode   && this.mode  .isValid()
            && this.amount && this.amount.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.mode  ) this.mode  .pushValueUpdates(parse);
        if (this.amount) this.amount.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.mode  ) this.mode  .invalidateInputs(parse, from, force);
        if (this.amount) this.amount.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.mode  ) this.mode  .iterateLoop(parse);
        if (this.amount) this.amount.iterateLoop(parse);
    }
}
