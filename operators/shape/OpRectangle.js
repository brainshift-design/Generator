class   OpRectangle
extends OpShapeBase
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;
    paramRound;


    
    constructor()
    {
        super(RECTANGLE, 'rect');


        this.addInput (this.createInputForObjects([RECTANGLE, RECTANGLE_VALUE], getInputValuesForUndo));
        this.addOutput(new Output([RECTANGLE], this.output_genRequest));


        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, false,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, false,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, false, 100,    0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, false, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, false,   0, -180,   180));
        this.addParam(this.paramRound  = new NumberParam('round',  'round',  true, true, false,   0,    0));


        this.paramWidth .addEventListener('change', () => this.updateRound());
        this.paramHeight.addEventListener('change', () => this.updateRound());

        this.paramAngle.control.setSuffix('°', true);
        this.paramAngle.control.wrapValue   = true;
        this.paramAngle.control.dragReverse = true;


        this.addBaseParams();
    }



    updateRound()
    {
        const min = Math.min(this.paramWidth.value.value, this.paramHeight.value.value);

        this.paramRound.control.displayMin = 0;
        this.paramRound.control.displayMax = min/2;

        this.paramRound.control.update();
    }
}