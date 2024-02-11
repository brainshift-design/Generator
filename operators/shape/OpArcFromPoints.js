class   OpArcFromPoints
extends OpShapeBase
{
    paramTangent;


    menuBool;



    constructor()
    {
        super(ARC_FROM_POINTS, 'arcFromPoints', 'arc', iconArcFromPoints);

        // this.iconOffsetY = -1;


        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));

        this.addOutput(new Output([POINT_VALUE], this.output_genRequest));


        this.addParam(this.paramTangent = new NumberParam('tangent', 'tangent', true, true, true, 0, 0, 1));


        this.paramTangent.divider = 0.588;

        this.menuBool = createBoolMenu(this.paramTangent);
    }



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
        const input2 = this.node.inputs[2];


        let nConnected = 0;

        if (input0.connected) nConnected++;
        if (input1.connected) nConnected++;
        if (input2.connected) nConnected++;

        request.push(nConnected);

        if (input0.connected)  request.push(...pushInputOrParam(input0, gen));
        if (input1.connected)  request.push(...pushInputOrParam(input1, gen));
        if (input2.connected)  request.push(...pushInputOrParam(input2, gen));


        request.push(...this.node.paramTangent.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramTangent.enableControlText(true);

        updateParamConditionText(this.paramTangent, this.paramTangent.isUnknown(), false, 1);

        this.updateParamControls();
    }
}