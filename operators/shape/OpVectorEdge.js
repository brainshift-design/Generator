class   OpVectorEdge
extends OpShapeBase
{
    paramStartTangent;
    paramEndTangent;



    constructor()
    {
        super(VECTOR_EDGE, 'edge', 'edge', iconVectorEdge);

        //this.canDisable  = true;
        this.iconOffsetY = -1;


        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addOutput(new Output([VECTOR_EDGE_VALUE], this.output_genRequest, getNodeOutputValuesForUndo));//, this.output_backInit));

        this.addParam(this.paramStartTangent = new PointParam('startTangent', 'start', true, true, true, PointValue.NaN));
        this.addParam(this.paramEndTangent   = new PointParam('endTangent',   'end',   true, true, true, PointValue.NaN));

        this.paramStartTangent.divider = 0.45;
        this.paramEndTangent  .divider = 0.45;

        this.paramStartTangent.input.types.push(VECTOR_VERTEX_VALUE);
        this.paramEndTangent  .input.types.push(VECTOR_VERTEX_VALUE);
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



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input0 = this.node.inputs[0];
        const input1 = this.node.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        if (this.node.paramStartTangent.input.connected) request.push(...this.node.paramStartTangent.genRequest(gen));
        else                                             request.push(POINT_VALUE, PointValue.NaN.toString());

        if (this.node.paramEndTangent  .input.connected) request.push(...this.node.paramEndTangent  .genRequest(gen));
        else                                             request.push(POINT_VALUE, PointValue.NaN.toString());


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramStartTangent.setValue(value.startTangent, false, true, false);
        this.paramEndTangent  .setValue(value.endTangent,   false, true, false);

        
        if (   this.paramStartTangent.value.isValid()
            || this.paramEndTangent  .value.isValid())
        {
            this.paramStartTangent.divider = 0.45;
            this.paramEndTangent  .divider = 0.45;
        }
        else
        {
            this.paramStartTangent.divider = 0.53;
            this.paramEndTangent  .divider = 0.53;
        }
    }
}