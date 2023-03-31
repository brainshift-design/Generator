class   OpStar
extends OpShapeBase
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;
    paramRound;
    paramPoints;
    paramConvex;


    
    constructor()
    {
        super(STAR, 'star');

        this.addInput (this.createInputForObjects([STAR, STAR_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([STAR], this.output_genRequest));

        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        this.addParam(this.paramRound  = new NumberParam('round',  'round',  true, true, true,   0,    0));
        this.addParam(this.paramPoints = new NumberParam('points', 'points', true, true, true,   5,    3));
        this.addParam(this.paramConvex = new NumberParam('convex', 'convex', true, true, true,   38.2, 0, 100));
        

        this.paramAngle.controls[0].setSuffix('°', true);
        this.paramAngle.controls[0].wrapValue   = true;
        this.paramAngle.controls[0].dragReverse = true;

        this.paramConvex.controls[0].setSuffix('%', true);


        this.addBaseParams();
    }



    updateRound()
    {
        const control = this.paramRound.controls[0];
        const min     = Math.min(this.paramWidth.value, this.paramHeight.value);

        control.setMin(0);
        control.setMax(min/2);

        this.paramRound.controls[0].update();
    }
}