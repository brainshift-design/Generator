class   OpEllipse
extends OpShapeBase
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;


    
    constructor()
    {
        super(ELLIPSE, 'ellipse', 100);

        this.addInput (this.createInputForObjects([ELLIPSE, ELLIPSE_VALUE], this.input_getValuesForUndo));
        this.addOutput(new Output([ELLIPSE], this.output_genRequest));


        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, false,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, false,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, false, 100,    0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, false, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, false,   0, -180,   180));
        

        this.paramAngle.control.setSuffix('°', true);
        this.paramAngle.control.wrapValue   = true;
        this.paramAngle.control.dragReverse = true;


        this.addBaseParams();
    }
}