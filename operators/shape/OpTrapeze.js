class   OpTrapeze
extends OpShape
{
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
        this.addParam(this.paramBias   = new NumberParam('bias',   'bias',   true, true, true, 0, -100, 100));


        this.paramWidth .addEventListener('change', () => this.updateRound());
        this.paramHeight.addEventListener('change', () => this.updateRound());

        this.paramBias.controls[0].suffix = '%';


        this.addBaseParams();
        this.setAllParamDividers(0.5);
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramX     .setValue(value.x,      false, true, false);
        this.paramY     .setValue(value.y,      false, true, false);
        this.paramWidth .setValue(value.width,  false, true, false);
        this.paramHeight.setValue(value.height, false, true, false);
        this.paramRound .setValue(value.round,  false, true, false);
        this.paramBias  .setValue(value.bias,   false, true, false);
    }



    updateRound()
    {
        const min = Math.min(this.paramWidth.value.value, this.paramHeight.value.value);

        this.paramRound.controls[0].displayMin = 0;
        this.paramRound.controls[0].displayMax = min/2;

        this.paramRound.controls[0].update();
    }
}