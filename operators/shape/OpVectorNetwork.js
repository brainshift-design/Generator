class   OpVectorNetwork
extends OpShape
{
    paramPoints;
    paramEdges;
    paramRegions;
    paramRound;


    
    constructor()
    {
        super(VECTOR_NETWORK, 'vector', 'vector', iconVectorNetwork);

        this.canDisable  = true;
        //this.iconOffsetY = -1;


        this.addInput(this.createInputForObjects([VECTOR_NETWORK_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([VECTOR_NETWORK_VALUE], this.output_genRequest));


        this.addParam(this.paramPoints  = new ListParam  ('points',  'points',  false, true, true));
        this.addParam(this.paramEdges   = new ListParam  ('points',  'points',  false, true, true));
        this.addParam(this.paramRegions = new ListParam  ('points',  'points',  false, true, true));
        this.addParam(this.paramClosed  = new SelectParam('closed',  'closed',  false, true, true, ['open', 'closed'], 0));
        this.addParam(this.paramDegree  = new SelectParam('degree',  'degree',  false, true, true, ['linear', 'quadratic', 'cubic', 'smooth', 'sine X', 'sine Y'], 3));
        this.addParam(this.paramWinding = new SelectParam('winding', 'winding', false, true, true, ['even-odd', 'non-zero']));
        this.addParam(this.paramRound   = new NumberParam('round',   'round',   true,  true, true, 0, 0));

        
        this.paramPoints.input.types.push(SHAPE_LIST_VALUE);
        this.paramPoints.listTypes = [POINT_VALUE];

        this.paramPoints.itemName    = 'point';
        this.paramPoints.showZero    =  false;

        this.paramDegree.reverseMenu =  true;

        this.paramRound.divider = 0.565;


        this.addBaseParams();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramPoints .setValue(value.points,  false, true, false);
        this.paramClosed .setValue(value.closed,  false, true, false);
        this.paramDegree .setValue(value.degree,  false, true, false);
        this.paramWinding.setValue(value.winding, false, true, false);
        this.paramRound  .setValue(value.round,   false, true, false);
    }



    updateParams()
    {
        this.paramPoints .enableControlText(true);
        this.paramClosed .enableControlText(true);
        this.paramDegree .enableControlText(true);
        this.paramWinding.enableControlText(true);
        this.paramRound  .enableControlText(true);

        this.updateParamControls();
    }
}