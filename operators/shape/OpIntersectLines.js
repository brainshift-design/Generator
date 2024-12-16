class   OpIntersectLines
extends OpShapeBase
{
    static { operatorTypes[INTERSECT_LINES] = this; }



    paramSegment;



    constructor()
    {
        super(INTERSECT_LINES, 'intersectLines', 'intersect', iconIntersectLines);

        this.iconOffsetY = -1;


        this.addInput (new Input ([POINT_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addInput (new Input ([POINT_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addInput (new Input ([POINT_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addInput (new Input ([POINT_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));

        this.addOutput(new Output([POINT_VALUE], this.output_genRequest));

        this.addParam(this.paramSegment = new NumberParam('segment', 'segment', true, true, true, 1, 0, 1));

        this.paramSegment.divider = 0.62;

        this.menuBool = createBoolMenu(this.paramSegment);
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
        const input3 = this.node.inputs[3];

        
        let nConnected = 0;

        if (input0.connected) nConnected++;
        if (input1.connected) nConnected++;
        if (input2.connected) nConnected++;
        if (input3.connected) nConnected++;

        request.push(nConnected);

        if (input0.connected)  request.push(...pushInputOrParam(input0, gen));
        if (input1.connected)  request.push(...pushInputOrParam(input1, gen));
        if (input2.connected)  request.push(...pushInputOrParam(input2, gen));
        if (input3.connected)  request.push(...pushInputOrParam(input3, gen));


        request.push(...this.node.paramSegment.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramSegment.enableControlText(true);

        updateParamConditionText(this.paramSegment, this.paramSegment.isUnknown(), false, 1);

        this.updateParamControls();
    }
}