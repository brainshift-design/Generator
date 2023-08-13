class   OpMeasurePoints
extends OpShapeBase
{
    paramDistance;
    paramAngle;



    constructor()
    {
        super(MEASURE_POINTS, 'measure', 'measure', iconMeasurePoints);

        this.iconOffsetY = 1;


        this.addInput (new Input ([POINT_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addInput (new Input ([POINT_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));

        this.addParam(this.paramDistance = new NumberParam('distance', 'distance', true, false, true, 0));
        this.addParam(this.paramAngle    = new NumberParam('angle',    'angle',    true, false, true, 0, -180, 180));


        this.paramAngle.controls[0].setSuffix('°', true);
        this.paramAngle.controls[0].suffixOffsetY = -4;

        this.paramDistance.controls[0].setDecimals(10, 0);
        this.paramAngle   .controls[0].setDecimals(10, 0);

        this.setAllParamDividers(0.5);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const input0 = this.inputs[0];
        const input1 = this.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const distance = values[paramIds.findIndex(id => id == 'distance')];
        const angle    = values[paramIds.findIndex(id => id == 'angle'   )];

        this.paramDistance.setValue(distance, false, true, false);
        this.paramAngle   .setValue(angle,    false, true, false);
    }
}