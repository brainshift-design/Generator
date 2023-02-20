class   OpPolygon
extends OpShapeBase
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;
    paramRound;
    paramCorners;


    
    constructor()
    {
        super(POLYGON, 'poly');

        this.addInput (this.createInputForObjects([POLYGON, POLYGON_VALUE], getInputValuesForUndo));
        this.addOutput(new Output([POLYGON], this.output_genRequest));

        this.addParam(this.paramX       = new NumberParam('x',       'x',       true, true, false,   0));
        this.addParam(this.paramY       = new NumberParam('y',       'y',       true, true, false,   0));
        this.addParam(this.paramWidth   = new NumberParam('width',   'width',   true, true, false, 100,    0.01));
        this.addParam(this.paramHeight  = new NumberParam('height',  'height',  true, true, false, 100,    0.01));
        this.addParam(this.paramAngle   = new NumberParam('angle',   'angle',   true, true, false,   0, -180,   180));
        this.addParam(this.paramRound   = new NumberParam('round',   'round',   true, true, false,   0,    0));
        this.addParam(this.paramCorners = new NumberParam('corners', 'corners', true, true, false,   3,    3));
        

        this.paramAngle.control.setSuffix('°', true);
        this.paramAngle.control.wrapValue   = true;
        this.paramAngle.control.dragReverse = true;


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