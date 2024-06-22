class   OpPointAlongPath
extends OpShapeBase
{
    paramPosition;
    paramDistance;
    paramOffset;
    paramTransform;


    menuTransform;



    constructor()
    {
        super(POINT_ALONG_PATH, 'pointAlongPath', 'point along path', iconPointAlongPath);


        this.addInput (new Input ([VECTOR_PATH_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addOutput(new Output([POINT_VALUE], this.output_genRequest));


        this.addParam(this.paramPosition   = new SelectParam('position',   'position',    true, true, true, ['relative', 'absolute'], 0));
        this.addParam(this.paramDistance   = new NumberParam('distance',   'distance',    true, true, true, 0, 0));
        this.addParam(this.paramOffset     = new NumberParam('offset',     'offset',      true, true, true, 0));
        this.addParam(this.paramTransform  = new NumberParam('transform',  'transform',   true, true, true, 1, 0, 1));


        this.paramPosition  .divider = 0.47;
        this.paramDistance  .divider = 0.53;
        this.paramOffset    .divider = 0.53;
        this.paramTransform .divider = 0.64;

        this.menuTransform  = createBoolMenu(this.paramTransform );
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
        request.push(...this.node.paramOffset    .genRequest(gen));
        request.push(...this.node.paramTransform .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramPosition  .enableControlText(true, this.paramPosition  .isUnknown());
        this.paramDistance  .enableControlText(true, this.paramDistance  .isUnknown());
        this.paramOffset    .enableControlText(true, this.paramOffset    .isUnknown());
        this.paramTransform .enableControlText(true, this.paramTransform .isUnknown());


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


        this.updateParamControls();
    }
}