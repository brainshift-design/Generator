class   OpPlace
extends OperatorBase
{
    paramPosition;
    paramTransform;
    paramShowCenter;


    menuTransform;
    menuShowCenter;



    constructor()
    {
        super(PLACE, 'place', 'place', iconPlace, defNodeWidth);

        this.canDisable   = true;
        this.iconOffsetY  = -2;

        
        this.addInput (new Input (SHAPE_VALUES));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramPosition   = new  PointParam('position',   'position',    false, true, true));
        this.addParam(this.paramTransform  = new NumberParam('transform',  'transform',   true,  true, true, 1, 0, 1));
        this.addParam(this.paramShowCenter = new NumberParam('showCenter', 'show center', true,  true, true, 0, 0, 1));

        this.paramTransform .divider = 0.68;
        this.paramShowCenter.divider = 0.68;

        this.menuTransform  = createBoolMenu(this.paramTransform );
        this.menuShowCenter = createBoolMenu(this.paramShowCenter);
    }
    
    

    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramPosition  .genRequest(gen));
        request.push(...this.node.paramTransform .genRequest(gen));
        request.push(...this.node.paramShowCenter.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    // updateValues(requestId, actionId, updateParamId, paramIds, values)
    // {
    //     const position = values[paramIds.findIndex(id => id == 'position')];

    //     if (position) this.paramPosition.setValue(position, false, true, false);
    // }



    updateParams()
    {
        this.paramPosition  .enableControlText(true);
        this.paramTransform .enableControlText(true);
        this.paramShowCenter.enableControlText(true);

        updateParamConditionText(this.paramTransform,  this.paramTransform.isUnknown(),  true,  1);
        updateParamConditionText(this.paramShowCenter, this.paramShowCenter.isUnknown(), false, 1);

        this.updateParamControls();
    }
}
