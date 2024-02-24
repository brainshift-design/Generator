class WavePathValue
extends ShapeValue
{
    x;
    y;
    width;
    height;

    shape;
    base;   
    amplitude;
    frequency;
    offset;
    bias;  



    constructor(nodeId,
                x         = new NumberValue(0), 
                y         = new NumberValue(0), 
                width     = new NumberValue(0), 
                height    = new NumberValue(0), 
                shape     = new NumberValue(0),
                base      = new NumberValue(0),
                amplitude = new NumberValue(0),
                frequency = new NumberValue(0),
                offset    = new NumberValue(0),
                bias      = new NumberValue(0))
    {
        super(WAVE_PATH_VALUE, nodeId);

        this.x         = x;
        this.y         = y;
        this.width     = width;
        this.height    = height;

        this.shape     = shape;
        this.base      = base;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.offset    = offset;
        this.bias      = bias;
    }



    copy()
    {
        const copy = new WavePathValue(
            this.nodeId,
            this.x        .copy(), 
            this.y        .copy(), 
            this.width    .copy(), 
            this.height   .copy(), 
            this.shape    .copy(),
            this.base     .copy(),
            this.amplitude.copy(),
            this.frequency.copy(),
            this.offset   .copy(),
            this.bias     .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(wave)
    {
        return wave
            && this.x        .equals(wave.x        )
            && this.y        .equals(wave.y        )
            && this.width    .equals(wave.width    )
            && this.height   .equals(wave.height   )
            && this.shape    .equals(wave.shape    )
            && this.base     .equals(wave.base     )
            && this.amplitude.equals(wave.amplitude)
            && this.frequency.equals(wave.frequency)
            && this.offset   .equals(wave.offset   )
            && this.bias     .equals(wave.bias     );
    }



    async eval(parse)
    {
        return this.copy();
    }
    
    
    
    hasInitValue()
    {
        return super.hasInitValue()
            && this.x        .hasInitValue()
            && this.y        .hasInitValue()
            && this.width    .hasInitValue()
            && this.height   .hasInitValue()
            && this.shape    .hasInitValue()
            && this.base     .hasInitValue()
            && this.amplitude.hasInitValue()
            && this.frequency.hasInitValue()
            && this.offset   .hasInitValue()
            && this.bias     .hasInitValue();
    }



    isValid()
    {
        return super.isValid()
            && this.x        .isValid()
            && this.y        .isValid()
            && this.width    .isValid()
            && this.height   .isValid()
            && this.shape    .isValid()
            && this.base     .isValid()
            && this.amplitude.isValid()
            && this.frequency.isValid()
            && this.offset   .isValid()
            && this.bias     .isValid();
    }



    toValue()
    {
        return this.copy();
    }



    toString()
    {
        return      this.x        .toString()
            + ' ' + this.y        .toString()
            + ' ' + this.width    .toString()
            + ' ' + this.height   .toString()
            + ' ' + this.shape    .toString()
            + ' ' + this.base     .toString()
            + ' ' + this.amplitude.toString()
            + ' ' + this.frequency.toString()
            + ' ' + this.offset   .toString()
            + ' ' + this.bias     .toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return 'wave';
            // + ' ' + this.x        .toPreviewString()
            // + ' ' + this.y        .toPreviewString()
            // + ' ' + this.width    .toPreviewString()
            // + ' ' + this.height   .toPreviewString()
            // + ' ' + this.shape    .toPreviewString() + '°'
            // + ' ' + this.base     .toPreviewString() + '°'
            // + ' ' + this.amplitude.toPreviewString() + '°'
            // + ' ' + this.frequency.toPreviewString() + '°'
            // + ' ' + this.offset   .toPreviewString() + '°'
            // + ' ' + this.bias     .toPreviewString() + '°';
    }



    toDisplayString()
    {
        return      this.x        .toDisplayString()
            + ' ' + this.y        .toDisplayString()
            + ' ' + this.width    .toDisplayString()
            + ' ' + this.height   .toDisplayString()
            + ' ' + this.shape    .toDisplayString()
            + ' ' + this.base     .toDisplayString()
            + ' ' + this.amplitude.toDisplayString()
            + ' ' + this.frequency.toDisplayString()
            + ' ' + this.offset   .toDisplayString()
            + ' ' + this.bias     .toDisplayString();
    }



    static NaN = new WavePathValue(
        '',
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseWavePathValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [PathPathValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x         = parseNumberValue(str[i]); i += x        [1];
    const y         = parseNumberValue(str[i]); i += y        [1];
    const width     = parseNumberValue(str[i]); i += width    [1];
    const height    = parseNumberValue(str[i]); i += height   [1];
    const shape     = parseNumberValue(str[i]); i += shape    [1];
    const base      = parseNumberValue(str[i]); i += base     [1];
    const amplitude = parseNumberValue(str[i]); i += amplitude[1];
    const frequency = parseNumberValue(str[i]); i += frequency[1];
    const offset    = parseNumberValue(str[i]); i += offset   [1];
    const bias      = parseNumberValue(str[i]); i += bias     [1];


    const wave = new WavePathValue(
        '', // set node ID elsewhere,
        x        [0],
        y        [0],
        width    [0],
        height   [0],
        shape    [0],
        base     [0],
        amplitude[0],
        frequency[0],
        offset   [0],
        bias     [0]);


    i = parseShapeBaseValue(str, i, wave);

    
    return [wave, i - iStart];
}
