class   OpStar
extends OpShape
{
    static { operatorTypes[STAR] = this; }



    paramPosition;
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

        this.addParam(this.paramPosition = new OptionParam('position', 'position', false, true, true, EllipsePositions, 0));
        this.addParam(this.paramX        = new NumberParam('x',        'X',        true,  true, true, 0));
        this.addParam(this.paramY        = new NumberParam('y',        'Y',        true,  true, true, 0));
        this.addParam(this.paramWidth    = new NumberParam('width',    'width',    true,  true, true, 100, 0.01));
        this.addParam(this.paramHeight   = new NumberParam('height',   'height',   true,  true, true, 100, 0.01));
        this.addParam(this.paramRound    = new NumberParam('round',    'round',    true,  true, true, 0, 0));
        this.addParam(this.paramPoints   = new NumberParam('points',   'points',   true,  true, true, 5, 3));
        this.addParam(this.paramConvex   = new NumberParam('convex',   'convex',   true,  true, true, 38.2, 0, 100));
        

        this.paramPosition.divider = 0.4;

        this.paramConvex.controls[0].setSuffix('%', true);


        this.addBaseParamsAfter();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const pos    = values[paramIds.findIndex(id => id == 'position')];
        const x      = values[paramIds.findIndex(id => id == 'x'       )];
        const y      = values[paramIds.findIndex(id => id == 'y'       )];
        const width  = values[paramIds.findIndex(id => id == 'width'   )];
        const height = values[paramIds.findIndex(id => id == 'height'  )];
        const round  = values[paramIds.findIndex(id => id == 'round'   )];
        const points = values[paramIds.findIndex(id => id == 'points'  )];
        const convex = values[paramIds.findIndex(id => id == 'convex'  )];

        this.paramPosition.setValue(pos,    false, true, false);
        this.paramX       .setValue(x,      false, true, false);
        this.paramY       .setValue(y,      false, true, false);
        this.paramWidth   .setValue(width,  false, true, false);
        this.paramHeight  .setValue(height, false, true, false);
        this.paramRound   .setValue(round,  false, true, false);
        this.paramPoints  .setValue(points, false, true, false);
        this.paramConvex  .setValue(convex, false, true, false);
    }



    updateParams()
    {
        super.updateParams();

        
        this.paramPosition.enableControlText(true, this.paramPosition.isUnknown());


        const center = this.paramPosition.value.value == 1;
       
        this.paramWidth.setName(center ? 'radius W' : 'width');
        this.paramWidth.divider = center ? 0.55 : 0.45;

        this.paramHeight.setName(center ? 'radius H' : 'height');
        this.paramHeight.divider = center ? 0.55 : 0.45;


        this.updateParamControls();
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