class   OpClosestPointOnPath
extends OpShapeBase
{
    paramConstrain;
    paramTransform;


    menuTransform;



    constructor()
    {
        super(CLOSEST_POINT_ON_PATH, 'closestOnPath', 'closest on path', iconClosestPointOnPath);


        this.addInput (new Input ([VECTOR_PATH_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addInput (new Input ([POINT_VALUE],       getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addOutput(new Output([POINT_VALUE], this.output_genRequest));


        this.addParam(this.paramConstrain = new OptionParam('constrain', 'constrain',   false, true, true, ['X & Y', 'only X', 'only Y'], 0));
        this.addParam(this.paramTransform = new NumberParam('transform', 'transform',   true, true, true, 1, 0, 1));


        this.paramTransform .divider = 0.675;

        this.menuTransform = createBoolMenu(this.paramTransform );
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

            
        request.push(...this.node.paramConstrain .genRequest(gen));
        request.push(...this.node.paramTransform .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramConstrain .enableControlText(true, this.paramConstrain .isUnknown());
        this.paramTransform .enableControlText(true, this.paramTransform .isUnknown());

        
        updateParamConditionText(this.paramTransform,  this.paramTransform.isUnknown(),  true,  1);


        this.updateParamControls();
    }
}