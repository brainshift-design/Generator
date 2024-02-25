class   OpWavePath
extends OpShape
{
    paramShape;
    paramX;
    paramY;
    paramWidth;
    paramAmplitude;
    paramFrequency;
    paramOffset;
    paramAlignX;
    paramAlignY;


    
    constructor()
    {
        super(WAVE_PATH, 'wave', 'wave', iconWavePath);

        this.canDisable  = true;
        //this.iconOffsetY = -1;
        

        this.addInput (this.createInputForObjects([WAVE_PATH_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([WAVE_PATH_VALUE], this.output_genRequest));


        this.addParam(this.paramShape     = new SelectParam('shape',     'shape',     false, true, true, ['square', 'saw', 'back saw', 'triangle', 'sine'], 4));
        this.addParam(this.paramX         = new NumberParam('x',         'X',         true,  true, true,   0));
        this.addParam(this.paramY         = new NumberParam('y',         'Y',         true,  true, true,   0));
        this.addParam(this.paramWidth     = new NumberParam('width',     'width',     true,  true, true, 100));
        this.addParam(this.paramAmplitude = new NumberParam('amplitude', 'amplitude', true,  true, true, 100));
        this.addParam(this.paramFrequency = new NumberParam('frequency', 'frequency', true,  true, true, 1, 0));
        this.addParam(this.paramOffset    = new NumberParam('offset',    'offset',    true,  true, true, 0));
        this.addParam(this.paramAlignX    = new SelectParam('alignX',    'align X',   true,  true, true, ['left', 'center', 'right'], 0));
        this.addParam(this.paramAlignY    = new SelectParam('alignY',    'align Y',   true,  true, true, ['bottom', 'middle', 'top'], 1));


        this.setAllParamDividers(0.55);

        this.paramOffset.controls[0].setDecimals(2);

        
        this.addBaseParams();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const shape     = values[paramIds.findIndex(id => id == 'shape'    )];
        const x         = values[paramIds.findIndex(id => id == 'x'        )];
        const y         = values[paramIds.findIndex(id => id == 'y'        )];
        const width     = values[paramIds.findIndex(id => id == 'width'    )];
        const amplitude = values[paramIds.findIndex(id => id == 'amplitude')];
        const frequency = values[paramIds.findIndex(id => id == 'frequency')];
        const offset    = values[paramIds.findIndex(id => id == 'offset'   )];
        const alignX    = values[paramIds.findIndex(id => id == 'alignX'   )];
        const alignY    = values[paramIds.findIndex(id => id == 'alignY'   )];

        this.paramShape    .setValue(shape,     false, true, false);
        this.paramX        .setValue(x,         false, true, false);
        this.paramY        .setValue(y,         false, true, false);
        this.paramWidth    .setValue(width,     false, true, false);
        this.paramAmplitude.setValue(amplitude, false, true, false);
        this.paramFrequency.setValue(frequency, false, true, false);
        this.paramOffset   .setValue(offset,    false, true, false);
        this.paramAlignX   .setValue(alignX,    false, true, false);
        this.paramAlignY   .setValue(alignY,    false, true, false);
    }
}