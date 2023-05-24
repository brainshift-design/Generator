class   OpEllipse
extends OpShape
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;
    paramFrom;
    paramTo;
    paramInner;


    
    constructor()
    {
        super(ELLIPSE, 'ellipse', 'ellipse', iconEllipse);

        this.canDisable = true;
        

        this.addInput (this.createInputForObjects([ELLIPSE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([ELLIPSE_VALUE], this.output_genRequest));


        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        this.addParam(this.paramInner  = new NumberParam('inner',  'inner',  true, true, true,   0, 0, 100));
        this.addParam(this.paramFrom   = new NumberParam('from',   'from',   true, true, true,   0));
        this.addParam(this.paramTo     = new NumberParam('to',     'to',     true, true, true, 360));
        

        this.paramAngle.controls[0].setSuffix('°', true);
        this.paramFrom .controls[0].setSuffix('°', true);
        this.paramTo   .controls[0].setSuffix('°', true);
        this.paramInner.controls[0].setSuffix('%', true);

        this.paramAngle.controls[0].wrapValue   = true;
        this.paramAngle.controls[0].dragReverse = true;

        this.paramFrom .controls[0].wrapValue   = true;
        //this.paramFrom .controls[0].dragReverse = true;

        this.paramTo   .controls[0].wrapValue   = true;
        //this.paramTo   .controls[0].dragReverse = true;


        this.addBaseParams();
    }
}