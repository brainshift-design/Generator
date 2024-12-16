class   OpTrapeze
extends OpShape
{
    static { operatorTypes[TRAPEZE] = this; }



    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramRound;
    paramBias;


    
    constructor()
    {
        super(TRAPEZE, 'trapeze', 'trapeze', iconTrapeze);

        this.iconOffsetY = 1;
        this.canDisable  = true;
        

        this.addInput (this.createInputForObjects([TRAPEZE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([TRAPEZE_VALUE], this.output_genRequest));


        this.addParam(this.paramX      = new NumberParam('x',      'X',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'Y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 100));
        this.addParam(this.paramRound  = new NumberParam('round',  'round',  true, true, true,   0, 0));
        this.addParam(this.paramBias   = new NumberParam('bias',   'bias',   true, true, true, -50, -100, 100));

        this.paramWidth .addEventListener('change', () => this.updateRound());
        this.paramHeight.addEventListener('change', () => this.updateRound());

        this.paramBias.controls[0].suffix = '%';


        this.addBaseParamsAfter();
        this.setAllParamDividers(0.5);
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const x      = values[paramIds.findIndex(id => id == 'x'     )];
        const y      = values[paramIds.findIndex(id => id == 'y'     )];
        const width  = values[paramIds.findIndex(id => id == 'width' )];
        const height = values[paramIds.findIndex(id => id == 'height')];
        const round  = values[paramIds.findIndex(id => id == 'round' )];
        const bias   = values[paramIds.findIndex(id => id == 'bias'  )];

        this.paramX     .setValue(x,      false, true, false);
        this.paramY     .setValue(y,      false, true, false);
        this.paramWidth .setValue(width,  false, true, false);
        this.paramHeight.setValue(height, false, true, false);
        this.paramRound .setValue(round,  false, true, false);
        this.paramBias  .setValue(bias,   false, true, false);
    }



    updateRound()
    {
        const min = Math.min(this.paramWidth.value.value, this.paramHeight.value.value);

        this.paramRound.controls[0].minDisplay = 0;
        this.paramRound.controls[0].maxDisplay = Math.abs(min/2);

        this.paramRound.controls[0].update();
    }
}