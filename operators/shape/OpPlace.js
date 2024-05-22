class   OpPlace
extends OperatorBase
{
    paramPosition;
    paramTransform;


    menuTransform;



    constructor()
    {
        super(PLACE, 'place', 'place', iconPlace, defNodeWidth);

        this.canDisable   = true;
        this.iconOffsetY  = -2;

        
        this.addInput (new Input (SHAPE_VALUES));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramPosition   = new  PointParam('position',   'position',    true,  true, true));
        this.addParam(this.paramTransform  = new NumberParam('transform',  'transform',   true,  true, true, 1, 0, 1));

        this.paramPosition.showValue = false;

        this.paramTransform .divider = 0.67;

        this.menuTransform  = createBoolMenu(this.paramTransform );


        this.inputs[0].addEventListener('connect',    e => this.outputs[0].types = [...this.inputs[0].connectedOutput.types]);
        this.inputs[0].addEventListener('disconnect', e => this.outputs[0].types = [SHAPE_VALUE]);
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

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateParams()
    {
        this.paramPosition  .enableControlText(true);
        this.paramTransform .enableControlText(true);

        updateParamConditionText(this.paramTransform,  this.paramTransform.isUnknown(),  true,  1);

        this.updateParamControls();
    }
}
