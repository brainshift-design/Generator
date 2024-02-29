class   OpMeasureVector
extends OpShapeBase
{
    paramLength;
    paramAngle;



    constructor()
    {
        super(MEASURE_VECTOR, 'measure', 'measure', iconMeasureVector);

        this.iconOffsetY = -2;


        this.addInput(new Input([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));

        this.addParam(this.paramLength = new NumberParam('length', 'length', true, false, true, 0));
        this.addParam(this.paramAngle  = new NumberParam('angle',   'angle', true, false, true, 0, -180, 180));


        this.paramAngle.controls[0].setSuffix('°', true);
        this.paramAngle.controls[0].suffixOffsetY = -4;

        this.paramLength.controls[0].setDecimals(10, 0);
        this.paramAngle .controls[0].setDecimals(10, 0);

        this.params.forEach(p => p.isNodeValue = true);

        this.setAllParamDividers(0.48);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const input = this.inputs[0];

        
        if (input.connected) request.push(1, ...pushInputOrParam(input, gen));
        else                 request.push(0);

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const length = values[paramIds.findIndex(id => id == 'length')];
        const angle  = values[paramIds.findIndex(id => id == 'angle' )];

        this.paramLength.setValue(length, false, true, false);
        this.paramAngle .setValue(angle,    false, true, false);
    }



    updateParams()
    {
        this.paramLength.enableControlText(false, this.isUnknown());
        this.paramAngle .enableControlText(false, this.isUnknown());

        this.updateParamControls();
    }
}