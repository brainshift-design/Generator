class   OpTrapeze
extends OpShape
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramRound;
    paramTop;
    paramBottom;


    
    constructor()
    {
        super(TRAPEZE, 'trapeze', 'trapeze', iconTrapeze);

        this.iconOffsetY = -1;
        this.canDisable  = true;
        

        this.addOutput(new Output([VECTOR_PATH_VALUE], this.output_genRequest));


        this.addParam(this.paramX      = new NumberParam('x',      'X',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'Y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 100));
        this.addParam(this.paramRound  = new NumberParam('round',  'round',  true, true, true,   1));
        this.addParam(this.paramTop    = new NumberParam('top',    'top',    true, true, true, 100));
        this.addParam(this.paramBottom = new NumberParam('bottom', 'bottom', true, true, true, 100));


        this.paramWidth .addEventListener('change', () => this.updateRound());
        this.paramHeight.addEventListener('change', () => this.updateRound());

        this.paramTop   .controls[0].suffix = '%';
        this.paramBottom.controls[0].suffix = '%';

        
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
        this.paramTop   .setValue(value.top,    false, true, false);
        this.paramBottom.setValue(value.bottom, false, true, false);
    }



    updateRound()
    {
        const min = Math.min(this.paramWidth.value.value, this.paramHeight.value.value);

        this.paramRound.controls[0].displayMin = 0;
        this.paramRound.controls[0].displayMax = min/2;

        this.paramRound.controls[0].update();
    }
}