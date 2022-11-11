class   OpLine
extends OpShapeBase
{
    paramX;
    paramY;
    paramWidth;
    paramAngle;


    
    constructor()
    {
        super(LINE, 'line', 100);

        this.addInput (this.createInputForObjects([LINE, LINE_VALUE], this.input_getValuesForUndo));
        this.addOutput(new Output([LINE], this.output_genRequest));

        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        

        this.paramAngle.control.setSuffix('°', true);
        this.paramAngle.control.wrapValue   = true;
        this.paramAngle.control.dragReverse = true;


        this.addBaseParams();
    }
}