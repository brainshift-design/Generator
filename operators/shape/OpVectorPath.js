class   OpVectorPath
extends OpShape
{
    paramClosed;
    paramPoints;
    paramDegree;
    paramWinding;
    paramRound;


    
    constructor()
    {
        super(VECTOR_PATH, 'path', 'path');

        this.canDisable = true;


        this.addInput(this.createInputForObjects([VECTOR_PATH_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([VECTOR_PATH_VALUE], this.output_genRequest));


        this.addParam(this.paramPoints  = new ListParam  ('points',  'points',  true,  true, true));
        this.addParam(this.paramClosed  = new SelectParam('closed',  'closed',  false, true, true, ['open', 'closed'], 0));
        this.addParam(this.paramDegree  = new SelectParam('degree',  'degree',  false, true, true, ['linear', 'quadratic', 'cubic', 'smooth', 'sine X', 'sine Y'], 3));
        this.addParam(this.paramWinding = new SelectParam('winding', 'winding', false, true, true, ['even-odd', 'non-zero']));
        this.addParam(this.paramRound   = new NumberParam('round',   'round',   true,  true, true, 0, 0));

        
        this.paramPoints.input.types.push(SHAPE_LIST_VALUE);
        this.paramPoints.listTypes = [POINT_VALUE];

        this.paramPoints.itemName    = 'point';
        this.paramPoints.showZero    =  false;

        this.paramDegree.reverseMenu =  true;


        this.addBaseParams();
    }
}