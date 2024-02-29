class   OpVector
extends OpShapeBase
{
    paramTransform;
    paramShowCenter;


    menuTransform;
    menuShowCenter;



    constructor()
    {
        super(VECTOR, 'vector', 'vector', iconVector);

        this.iconOffsetY = -1;


        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));

        this.addOutput(new Output([POINT_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));

        this.addParam(this.paramTransform  = new NumberParam('transform',  'transform',   true,  true, true, 1, 0, 1));
        this.addParam(this.paramShowCenter = new NumberParam('showCenter', 'show center', true,  true, true, 0, 0, 1));

        
        this.setAllParamDividers(0.66);
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

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        request.push(...this.node.paramTransform .genRequest(gen));
        request.push(...this.node.paramShowCenter.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramTransform .enableControlText(true);
        this.paramShowCenter.enableControlText(true);

        updateParamConditionText(this.paramTransform,  this.paramTransform.isUnknown(),  true,  1);
        updateParamConditionText(this.paramShowCenter, this.paramShowCenter.isUnknown(), false, 1);

        this.updateParamControls();
    }
}