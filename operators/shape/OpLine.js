class   OpLine
extends OpShapeBase
{
    paramX;
    paramY;
    paramWidth;
    paramAngle;


    
    constructor()
    {
        super(LINE, 'line', 'line');

        this.canDisable = true;

        
        this.addInput (this.createInputForObjects([LINE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([LINE_VALUE], this.output_genRequest));

        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        

        this.paramAngle.controls[0].setSuffix('°', true);
        this.paramAngle.controls[0].wrapValue   = true;
        this.paramAngle.controls[0].dragReverse = true;


        this.addBaseParams();
    }
}