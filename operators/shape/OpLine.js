class   OpLine
extends OpShapeBase
{
    paramX;
    paramY;
    paramWidth;
    paramAngle;


    
    constructor()
    {
        super(LINE, 'line');

        this.addInput (this.createInputForObjects([LINE, LINE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([LINE], this.output_genRequest));

        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, false,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, false,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, false, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, false,   0, -180,   180));
        

        this.paramAngle.control.setSuffix('°', true);
        this.paramAngle.control.wrapValue   = true;
        this.paramAngle.control.dragReverse = true;


        this.addBaseParams();
    }
}