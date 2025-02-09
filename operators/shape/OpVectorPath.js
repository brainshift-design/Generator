class   OpVectorPath
extends OpShape
{
    static { Operator.types[VECTOR_PATH] = this; }



    paramPoints;
    paramClosed;
    paramDegree;
    paramWinding;
    paramRound;

    menuClosed;


    
    constructor()
    {
        super(VECTOR_PATH, 'path', 'path', iconVectorPath);

        
        this.canDisable  = true;
        this.iconOffsetY = -1;


        this.addInput(this.createInputForObjects([VECTOR_PATH_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([VECTOR_PATH_VALUE], this.output_genRequest));


        this.addParam(this.paramPoints  = new ListParam  ('points',  'points',  false, true, true));
        this.addParam(this.paramDegree  = new OptionParam('degree',  'degree',  false, true, true, PathDegrees, 3));
        this.addParam(this.paramClosed  = new NumberParam('closed',  'closed',  true,  true, true, 0, 0, 1));
        this.addParam(this.paramWinding = new OptionParam('winding', 'wind',    true,  true, true, PathWindings));
        this.addParam(this.paramRound   = new NumberParam('round',   'round',   true,  true, true, 0, 0));

        
        this.paramPoints.input.types.push(SHAPE_LIST_VALUE);
        this.paramPoints.listTypes = [POINT_VALUE, POINT_LIST_VALUE, SHAPE_LIST_VALUE];

        this.paramPoints.itemName  = ['point'];
        this.paramPoints.showZero  =  false;


        this.paramClosed.divider = 0.57;
        this.paramClosed.controls[0].allowEditDecimals = false;

        this.menuClosed = createBoolMenu(this.paramClosed);

        
        this.paramWinding.divider = 0.38;
        this.paramRound  .divider = 0.565;


        this.addBaseParamsAfter();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
      //const points  = values[paramIds.findIndex(id => id == 'points' )];
        const closed  = values[paramIds.findIndex(id => id == 'closed' )];
        const degree  = values[paramIds.findIndex(id => id == 'degree' )];
        const winding = values[paramIds.findIndex(id => id == 'winding')];
        const round   = values[paramIds.findIndex(id => id == 'round'  )];

      //this.paramPoints .setValue(points,  false, true, false);
        this.paramClosed .setValue(closed,  false, true, false);
        this.paramDegree .setValue(degree,  false, true, false);
        this.paramWinding.setValue(winding, false, true, false);
        this.paramRound  .setValue(round,   false, true, false);
    }



    updateParams()
    {
        this.paramPoints   .enableControlText(true, this.paramPoints .isUnknown());
        this.paramDegree   .enableControlText(true, this.paramDegree .isUnknown());
        this.paramWinding  .enableControlText(true, this.paramWinding.isUnknown());
        this.paramRound    .enableControlText(true, this.paramRound  .isUnknown());

        this.paramClosed.enableControlText(true);

        updateParamConditionText(this.paramClosed, this.paramClosed.isUnknown(), false, 1);

        this.updateParamControls();
    }
}