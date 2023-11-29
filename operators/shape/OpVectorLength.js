class   OpVectorLength
extends OpShapeBase
{
    paramLength;



    constructor()
    {
        super(VECTOR_LENGTH, 'vectorLength', 'vector', iconVectorLength);

        this.iconOffsetY = -2;


        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));

        this.addParam(this.paramLength = new NumberParam('length', 'length', true, false, true, 0));


        this.setAllParamDividers(0.45);
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


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const length = values[paramIds.findIndex(id => id == 'length')];
        this.paramLength.setValue(length, false, true, false);
    }



    updateParams()
    {
        this.paramLength.enableControlText(false, this.isUnknown());

        this.updateParamControls();
    }
}