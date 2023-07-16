class   OpVectorEdge
extends OpShapeBase
{
    paramStart;
    paramStartTangent;
    paramEnd;
    paramEndTangent;



    constructor()
    {
        super(VECTOR_EDGE, 'edge', 'edge', iconVectorEdge);

        //this.canDisable  = true;
        //this.iconOffsetY = -1;


        this.addInput (new Input ([VECTOR_EDGE_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addOutput(new Output([VECTOR_EDGE_VALUE], this.output_genRequest, getNodeOutputValuesForUndo));//, this.output_backInit));

        this.addParam(this.paramStart        = new NumberParam('start',        'start',         true, true, true, 0));
        this.addParam(this.paramStartTangent = new  PointParam('startTangent', 'start tangent', true, true, true, PointValue.create(this, 0, 0)));
        this.addParam(this.paramEnd          = new NumberParam('end',          'end',           true, true, true, 0));
        this.addParam(this.paramEndTangent   = new  PointParam('endTangent',   'end tangent',   true, true, true, PointValue.create(this, 0, 0)));


        this.setAllParamDividers(0.45);
    }



    // input_getBackInitValue()
    // {
    //     // 'this' is the input

    //     return new PointValue(
    //         this.nodeId,
    //         this.node.paramX.value,
    //         this.node.paramY.value);
    // }



    // output_backInit(value)
    // {
    //     // 'this' is the output

    //     consoleAssert(value.type == POINT_VALUE, 'expected POINT_VALUE in backInit()');
        
    //     this.node.paramX.setValue(value.x, false, true, false);
    //     this.node.paramY.setValue(value.y, false, true, false);
    // }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramStart       .setValue(value.paramStart,        false, true, false);
        this.paramStartTangent.setValue(value.paramStartTangent, false, true, false);
        this.paramEnd         .setValue(value.paramEnd,          false, true, false);
        this.paramEndTangent  .setValue(value.paramEndTangent,   false, true, false);
    }
}