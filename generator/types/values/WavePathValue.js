class WavePathValue
extends ShapeValue
{
    static { GNode.types[WAVE_PATH_VALUE] = this; }



    shape;
    x;
    y;
    width;
    amplitude;
    frequency;
    offset;
    alignX;  
    alignY;  

    degree;



    constructor(nodeId,
                shape     = new NumberValue(0),
                x         = new NumberValue(0), 
                y         = new NumberValue(0), 
                width     = new NumberValue(0), 
                amplitude = new NumberValue(0),
                frequency = new NumberValue(0),
                offset    = new NumberValue(0),
                alignX    = new NumberValue(0),
                alignY    = new NumberValue(0))
    {
        super(WAVE_PATH_VALUE, nodeId, 'wavePath');

        this.shape     = shape;
        this.x         = x;
        this.y         = y;
        this.width     = width;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.offset    = offset;
        this.alignX    = alignX;
        this.alignY    = alignY;

        this.degree   = new NumberValue(2);
    }



    copy()
    {
        const copy = new WavePathValue(
            this.nodeId,
            this.shape    .copy(),
            this.x        .copy(), 
            this.y        .copy(), 
            this.width    .copy(), 
            this.amplitude.copy(),
            this.frequency.copy(),
            this.offset   .copy(),
            this.alignX   .copy(),
            this.alignY   .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(wave)
    {
        return wave
            && this.shape    .equals(wave.shape    )
            && this.x        .equals(wave.x        )
            && this.y        .equals(wave.y        )
            && this.width    .equals(wave.width    )
            && this.amplitude.equals(wave.amplitude)
            && this.frequency.equals(wave.frequency)
            && this.offset   .equals(wave.offset   )
            && this.alignX   .equals(wave.alignX   )
            && this.alignY   .equals(wave.alignY   );
    }



    async eval(parse)
    {
        return this.copy();
    }
    
    
    
    hasInitValue()
    {
        return super.hasInitValue()
            && this.shape    .hasInitValue()
            && this.x        .hasInitValue()
            && this.y        .hasInitValue()
            && this.width    .hasInitValue()
            && this.amplitude.hasInitValue()
            && this.frequency.hasInitValue()
            && this.offset   .hasInitValue()
            && this.alignX   .hasInitValue()
            && this.alignY   .hasInitValue();
    }



    isValid()
    {
        return super.isValid()
            && this.shape    .isValid()
            && this.x        .isValid()
            && this.y        .isValid()
            && this.width    .isValid()
            && this.amplitude.isValid()
            && this.frequency.isValid()
            && this.offset   .isValid()
            && this.alignX   .isValid()
            && this.alignY   .isValid();
    }



    toNewValue()
    {
        return this.copy();
    }



    toString()
    {
        return      this.shape    .toString()
            + ' ' + this.x        .toString()
            + ' ' + this.y        .toString()
            + ' ' + this.width    .toString()
            + ' ' + this.amplitude.toString()
            + ' ' + this.frequency.toString()
            + ' ' + this.offset   .toString()
            + ' ' + this.alignX   .toString()
            + ' ' + this.alignY   .toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return 'wave';
            // + ' ' + this.shape    .toPreviewString() + '°'
            // + ' ' + this.x        .toPreviewString()
            // + ' ' + this.y        .toPreviewString()
            // + ' ' + this.width    .toPreviewString()
            // + ' ' + this.amplitude.toPreviewString() + '°'
            // + ' ' + this.frequency.toPreviewString() + '°'
            // + ' ' + this.offset   .toPreviewString() + '°'
            // + ' ' + this.alignX   .toPreviewString()
            // + ' ' + this.alignY   .toPreviewString();
    }



    toDisplayString()
    {
        return      this.shape    .toDisplayString()
            + ' ' + this.x        .toDisplayString()
            + ' ' + this.y        .toDisplayString()
            + ' ' + this.width    .toDisplayString()
            + ' ' + this.amplitude.toDisplayString()
            + ' ' + this.frequency.toDisplayString()
            + ' ' + this.offset   .toDisplayString()
            + ' ' + this.alignX   .toDisplayString()
            + ' ' + this.alignY   .toDisplayString();
    }



    static NaN()
    {
        return new WavePathValue(
            '',
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }
    
    
    
    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [WavePathValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const shape     = NumberValue.parse(str[i]); i += shape    [1];
        const x         = NumberValue.parse(str[i]); i += x        [1];
        const y         = NumberValue.parse(str[i]); i += y        [1];
        const width     = NumberValue.parse(str[i]); i += width    [1];
        const amplitude = NumberValue.parse(str[i]); i += amplitude[1];
        const frequency = NumberValue.parse(str[i]); i += frequency[1];
        const offset    = NumberValue.parse(str[i]); i += offset   [1];
        const alignX    = NumberValue.parse(str[i]); i += alignX   [1];
        const alignY    = NumberValue.parse(str[i]); i += alignY   [1];
    
    
        const wave = new WavePathValue(
            '', // set node ID elsewhere,
            shape    [0],
            x        [0],
            y        [0],
            width    [0],
            amplitude[0],
            frequency[0],
            offset   [0],
            alignX   [0],
            alignY   [0]);
    
    
        i = ShapeValue.parse(str, i, wave);
    
        
        return [wave, i - iStart];
    }
}
