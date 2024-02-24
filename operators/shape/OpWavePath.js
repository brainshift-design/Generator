class   OpWavePath
extends OpShape
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;

    paramShape;
    paramBase;
    paramAmplitude;
    paramFrequency;
    paramOffset;
    paramBias;


    
    constructor()
    {
        super(WAVE_PATH, 'wave', 'wave', iconWavePath);

        this.canDisable  = true;
        //this.iconOffsetY = -1;
        

        this.addInput (this.createInputForObjects([WAVE_PATH_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([WAVE_PATH_VALUE], this.output_genRequest));


        this.addParam(this.paramX         = new NumberParam('x',         'X',         true,  true, true,   0));
        this.addParam(this.paramY         = new NumberParam('y',         'Y',         true,  true, true,   0));
        this.addParam(this.paramWidth     = new NumberParam('width',     'width',     true,  true, true, 100));
        this.addParam(this.paramHeight    = new NumberParam('height',    'height',    true,  true, true, 100));
        
        this.addParam(this.paramShape     = new SelectParam('shape',     'shape',     false, true, true, ['square', 'saw', 'back saw', 'triangle', 'sine'], 4));
        this.addParam(this.paramBase      = new NumberParam('base',      'base',      true,  true, true, 0));
        this.addParam(this.paramAmplitude = new NumberParam('amplitude', 'amplitude', true,  true, true, 100));
        this.addParam(this.paramFrequency = new NumberParam('frequency', 'frequency', true,  true, true, 1, 0));
        this.addParam(this.paramOffset    = new NumberParam('offset',    'offset',    true,  true, true, 0));
        this.addParam(this.paramBias      = new NumberParam('bias',      'bias',      true,  true, true, 0, -100, 100));


        this.setAllParamDividers(0.55);

        this.paramOffset.controls[0].setDecimals(2);

        
        this.addBaseParams();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const x         = values[paramIds.findIndex(id => id == 'x'       )];
        const y         = values[paramIds.findIndex(id => id == 'y'       )];
        const width     = values[paramIds.findIndex(id => id == 'width'   )];
        const height    = values[paramIds.findIndex(id => id == 'height'  )];

        const shape     = values[paramIds.findIndex(id => id == 'shape'    )];
        const base      = values[paramIds.findIndex(id => id == 'base'     )];
        const amplitude = values[paramIds.findIndex(id => id == 'amplitude')];
        const frequency = values[paramIds.findIndex(id => id == 'frequency')];
        const offset    = values[paramIds.findIndex(id => id == 'offset'   )];
        const bias      = values[paramIds.findIndex(id => id == 'bias'     )];

        this.paramX        .setValue(x,         false, true, false);
        this.paramY        .setValue(y,         false, true, false);
        this.paramWidth    .setValue(width,     false, true, false);
        this.paramHeight   .setValue(height,    false, true, false);

        this.paramShape    .setValue(shape,     false, true, false);
        this.paramBase     .setValue(base,      false, true, false);
        this.paramAmplitude.setValue(amplitude, false, true, false);
        this.paramFrequency.setValue(frequency, false, true, false);
        this.paramOffset   .setValue(offset,    false, true, false);
        this.paramBias     .setValue(bias,      false, true, false);
    }
}