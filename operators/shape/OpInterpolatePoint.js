class   OpInterpolatePoint
extends OpShapeBase
{
    paramAmount;
    paramTransform;
    paramShowCenter;


    menuTransform;
    menuShowCenter;



    constructor()
    {
        super(INTERPOLATE_POINT, 'interpolate', 'interpolate', iconInterpolatePoint);

        this.iconOffsetY = -2;


        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addInput (new Input ([POINT_VALUE, VECTOR_VERTEX_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addOutput(new Output([POINT_VALUE], this.output_genRequest));

        this.addParam(this.paramAmount     = new NumberParam('amount',     'amount',      true, true, true, 50, 0, 100));
        this.addParam(this.paramTransform  = new NumberParam('transform',  'transform',   true, true, true, 1, 0, 1));
        this.addParam(this.paramShowCenter = new NumberParam('showCenter', 'show center', true, true, true, 0, 0, 1));

        this.paramAmount.controls[0].min = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.controls[0].max = Number.MAX_SAFE_INTEGER; // extrapolation
        
        this.paramAmount.controls[0].setSuffix('%', true);

        this.paramTransform .divider = 0.68;
        this.paramShowCenter.divider = 0.68;

        this.menuTransform  = createBoolMenu(this.paramTransform );
        this.menuShowCenter = createBoolMenu(this.paramShowCenter);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.id, 
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

            
        request.push(...this.node.paramAmount    .genRequest(gen));
        request.push(...this.node.paramTransform .genRequest(gen));
        request.push(...this.node.paramShowCenter.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramAmount    .enableControlText(true);
        this.paramTransform .enableControlText(true);
        this.paramShowCenter.enableControlText(true);

        updateParamConditionText(this.paramTransform,  this.paramTransform.isUnknown(),  true,  1);
        updateParamConditionText(this.paramShowCenter, this.paramShowCenter.isUnknown(), false, 1);

        this.updateParamControls();
    }
}