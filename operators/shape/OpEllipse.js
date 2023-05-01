class   OpEllipse
extends OpShape
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;


    
    constructor()
    {
        super(ELLIPSE, 'ellipse', 'ellipse');

        this.canDisable = true;
        

        this.addInput (this.createInputForObjects([ELLIPSE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([ELLIPSE_VALUE], this.output_genRequest));


        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        

        this.paramAngle.controls[0].setSuffix('°', true);
        this.paramAngle.controls[0].wrapValue   = true;
        this.paramAngle.controls[0].dragReverse = true;


        this.addBaseParams();
    }
}