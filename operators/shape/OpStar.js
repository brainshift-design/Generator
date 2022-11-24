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
        super(STAR, 'star', 90);

        this.addInput (this.createInputForObjects([STAR, STAR_VALUE], this.input_getValuesForUndo));
        this.addOutput(new Output([STAR], this.output_genRequest));

        this.addParam(this.paramX      = new NumberParam('x',      'x',      true, true, false,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true, true, false,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, false, 100,    0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, false, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true, true, false,   0, -180,   180));
        this.addParam(this.paramRound  = new NumberParam('round',  'round',  true, true, false,   0,    0));
        this.addParam(this.paramPoints = new NumberParam('points', 'points', true, true, false,   5,    3));
        this.addParam(this.paramConvex = new NumberParam('convex', 'convex', true, true, false,   38.2, 0, 100));
        

        this.paramAngle.control.setSuffix('°', true);
        this.paramAngle.control.wrapValue   = true;
        this.paramAngle.control.dragReverse = true;

        this.paramConvex.control.setSuffix('%', true);


        this.addBaseParams();
    }



    updateRound()
    {
        const control = this.paramRound.control;
        const min     = Math.min(this.paramWidth.value, this.paramHeight.value);

        control.setMin(0);
        control.setMax(min/2);

        this.paramRound.control.update();
    }
}