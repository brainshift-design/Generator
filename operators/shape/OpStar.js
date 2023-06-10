class   OpStar
extends OpShape
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramRound;
    paramPoints;
    paramConvex;


    
    constructor()
    {
        super(STAR, 'star', 'star', iconStar);

        this.canDisable  = true;
        this.iconOffsetY = -3;

        
        this.addInput (this.createInputForObjects([STAR_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([STAR_VALUE], this.output_genRequest));

        this.addParam(this.paramX      = new NumberParam('x',      'X',      true, true, true, 0));
        this.addParam(this.paramY      = new NumberParam('y',      'Y',      true, true, true, 0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100, 0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 100, 0.01));
        this.addParam(this.paramRound  = new NumberParam('round',  'round',  true, true, true, 0, 0));
        this.addParam(this.paramPoints = new NumberParam('points', 'points', true, true, true, 5, 3));
        this.addParam(this.paramConvex = new NumberParam('convex', 'convex', true, true, true, 38.2, 0, 100));
        

        this.paramConvex.controls[0].setSuffix('%', true);


        this.addBaseParams();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramX     .setValue(value.x,      false, true, false);
        this.paramY     .setValue(value.y,      false, true, false);
        this.paramWidth .setValue(value.width,  false, true, false);
        this.paramHeight.setValue(value.height, false, true, false);
        this.paramRound .setValue(value.round,  false, true, false);
        this.paramPoints.setValue(value.points, false, true, false);
        this.paramConvex.setValue(value.convex, false, true, false);
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