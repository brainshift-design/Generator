class   OpVectorPath
extends OpShape
{
    paramPoints;
    paramClosed;
    paramDegree;
    paramWinding;
    paramRound;


    
    constructor()
    {
        super(VECTOR_PATH, 'path', 'path', iconVectorPath);

        
        this.canDisable  = true;
        this.iconOffsetY = -1;


        this.addInput(this.createInputForObjects([VECTOR_PATH_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([VECTOR_PATH_VALUE], this.output_genRequest));


        this.addParam(this.paramPoints  = new ListParam  ('points',  'points',  false, true, true));
        this.addParam(this.paramDegree  = new SelectParam('degree',  'degree',  false, true, true, ['linear', 'quadratic', 'cubic', 'smooth', 'sine X', 'sine Y'], 3));
        this.addParam(this.paramClosed  = new SelectParam('closed',  'closed',  false, true, true, ['open', 'closed'], 0));
        this.addParam(this.paramWinding = new SelectParam('winding', 'wind',    true,  true, true, ['even-odd', 'non-zero']));
        this.addParam(this.paramRound   = new NumberParam('round',   'round',   true,  true, true, 0, 0));

        
        this.paramPoints.input.types.push(SHAPE_LIST_VALUE);
        this.paramPoints.listTypes = [POINT_VALUE, SHAPE_LIST_VALUE];

        this.paramPoints.itemName  = ['point'];
        this.paramPoints.showZero  =  false;

        
        this.paramWinding.divider = 0.38;
        this.paramRound  .divider = 0.565;


        this.addBaseParams();
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
}