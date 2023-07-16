class   OpVectorNetwork
extends OpShapeBase
{
    paramPoints;
    paramEdges;
    paramRegions;


    
    constructor()
    {
        super(VECTOR_NETWORK, 'vector', 'vector', iconVectorNetwork);

        //this.canDisable  = true;
        //this.iconOffsetY = -1;


        this.addInput(this.createInputForObjects([VECTOR_NETWORK_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([VECTOR_NETWORK_VALUE], this.output_genRequest));


        this.addParam(this.paramPoints  = new ListParam('points',  'points',  false, true, true));
        this.addParam(this.paramEdges   = new ListParam('edges',   'edges',   false, true, true));
        this.addParam(this.paramRegions = new ListParam('regions', 'regions', false, true, true));

        
        // this.paramPoints.input.types.push(SHAPE_LIST_VALUE);
        // this.paramPoints.listTypes = [POINT_VALUE];

        this.paramPoints .itemName = 'point';
        this.paramPoints .showZero =  false;

        this.paramEdges  .itemName = 'edge';
        this.paramEdges  .showZero =  false;

        this.paramRegions.itemName = 'region';
        this.paramRegions.showZero =  false;


        this.addBaseParams();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramPoints .setValue(value.points,  false, true, false);
        this.paramEdges  .setValue(value.edges,   false, true, false);
        this.paramRegions.setValue(value.regions, false, true, false);
    }



    updateParams()
    {
        this.paramPoints .enableControlText(true);
        this.paramEdges  .enableControlText(true);
        this.paramRegions.enableControlText(true);

        this.updateParamControls();
    }
}