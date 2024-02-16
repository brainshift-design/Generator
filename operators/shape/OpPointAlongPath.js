class   OpPointAlongPath
extends OpShapeBase
{
    paramPosition;
    paramDistance;
    paramTransform;
    paramShowCenter;


    menuTransform;
    menuShowCenter;



    constructor()
    {
        super(POINT_ALONG_PATH, 'pointAlongPath', 'point along path', iconPointAlongPath);


        this.subscription = true;
        
        
        this.addInput (new Input ([VECTOR_PATH_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addOutput(new Output([POINT_VALUE], this.output_genRequest));


        this.addParam(this.paramPosition   = new SelectParam('position',   'position',    true, true, true, ['relative', 'absolute'], 0));
        this.addParam(this.paramDistance   = new NumberParam('distance',   'distance',    true, true, true, 0, 0));
        this.addParam(this.paramTransform  = new NumberParam('transform',  'transform',   true, true, true, 1, 0, 1));
        this.addParam(this.paramShowCenter = new NumberParam('showCenter', 'show center', true, true, true, 0, 0, 1));


        this.paramPosition  .divider = 0.47;
        this.paramDistance  .divider = 0.53;
        this.paramTransform .divider = 0.675;
        this.paramShowCenter.divider = 0.675;

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


        const input = this.node.inputs[0];

        if (input.connected) request.push(1, ...pushInputOrParam(input, gen));
        else                 request.push(0);

            
        request.push(...this.node.paramPosition  .genRequest(gen));
        request.push(...this.node.paramDistance  .genRequest(gen));
        request.push(...this.node.paramTransform .genRequest(gen));
        request.push(...this.node.paramShowCenter.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramPosition  .enableControlText(true, this.paramPosition  .isUnknown());
        this.paramDistance  .enableControlText(true, this.paramDistance  .isUnknown());
        this.paramTransform .enableControlText(true, this.paramTransform .isUnknown());
        this.paramShowCenter.enableControlText(true, this.paramShowCenter.isUnknown());


        if (this.paramPosition.value.value == 0)
        {
            this.paramDistance.controls[0].setSuffix('%', true);
            this.paramDistance.controls[0].setMin(  0);
            this.paramDistance.controls[0].setMax(100);
        }
        else
        {
            this.paramDistance.controls[0].setSuffix('', true);
            this.paramDistance.controls[0].setMin(0);
            this.paramDistance.controls[0].setMax(Number.MAX_SAFE_INTEGER);
        }

        
        updateParamConditionText(this.paramTransform,  this.paramTransform.isUnknown(),  true,  1);
        updateParamConditionText(this.paramShowCenter, this.paramShowCenter.isUnknown(), false, 1);


        this.updateParamControls();
    }
}