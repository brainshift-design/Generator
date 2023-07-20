class   OpCenter
extends OperatorBase
{
    paramCenterX;
    paramCenterY;
    paramShowCenter;


    menuBoolShowCenter;



    constructor()
    {
        super(CENTER, 'center', 'center', iconCenter);

        this.canDisable  = true;
        // this.iconOffsetY = -2;

        
        this.addInput (new Input (SHAPE_VALUES));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramCenterX    = new NumberParam('centerX',    'center X',    true, true, true,  50, 0, 100));
        this.addParam(this.paramCenterY    = new NumberParam('centerY',    'center Y',    true, true, true,  50, 0, 100));
        this.addParam(this.paramShowCenter = new NumberParam('showCenter', 'show center', true, true, true, 1, 0, 1));


        this.paramCenterX.controls[0].suffix = '%';
        this.paramCenterY.controls[0].suffix = '%';

        this.paramCenterX.controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramCenterX.controls[0].max = Number.MAX_SAFE_INTEGER;

        this.paramCenterY.controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramCenterY.controls[0].max = Number.MAX_SAFE_INTEGER;


        this.paramShowCenter.controls[0].allowEditDecimals = false;
        this.paramShowCenter.divider = 0.7;

        this.menuBoolShowCenter  = createBoolMenu(this.paramShowCenter );


        this.inputs[0].addEventListener('connect',    () => OpCenter_onConnectInput   (this));
        this.inputs[0].addEventListener('disconnect', () => OpCenter_onDisconnectInput(this));    
    }
    
    

    setPointOffset()
    {
        this.paramCenterX.controls[0].suffix = '';
        this.paramCenterY.controls[0].suffix = '';
    }



    setOtherOffset()
    {
        this.paramCenterX.controls[0].suffix = '%';
        this.paramCenterY.controls[0].suffix = '%';
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

        request.push(...this.node.paramCenterX   .genRequest(gen));
        request.push(...this.node.paramCenterY   .genRequest(gen));
        request.push(...this.node.paramShowCenter.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateParams()
    {
        super.updateParams();

        updateParamConditionText(this.paramShowCenter,  this.paramShowCenter.isUnknown(), false, 1);

        this.updateParamControls();
    }
}



function setCenterOffset(node, 
                         x, 
                         y, 
                         minX = Number.MIN_SAFE_INTEGER, 
                         minY = Number.MIN_SAFE_INTEGER, 
                         maxX = Number.MAX_SAFE_INTEGER, 
                         maxY = Number.MAX_SAFE_INTEGER) 
{
    node.paramCenterX.controls[0].setMin(minX);
    node.paramCenterX.controls[0].setMax(maxX);

    node.paramCenterY.controls[0].setMin(minY);
    node.paramCenterY.controls[0].setMax(maxY);
}



function OpCenter_onConnectInput(node)
{
    node.outputs[0].types = [...node.inputs[0].connectedOutput.types];    


    if (   node.inputs[0].connectedOutput.types.length == 1
        && node.inputs[0].connectedOutput.types[0] == POINT_VALUE)
    {
        node.setPointOffset();
        setCenterOffset(node, 0, 0);
    }
    else
    {
        node.setOtherOffset();
        setCenterOffset(node, 50, 50, 0, 0, 100, 100);
    }
}



function OpCenter_onDisconnectInput(node)
{
    node.outputs[0].types = [SHAPE_VALUE];

    node.setOtherOffset();
    setCenterOffset(node, 50, 50, 0, 0, 100, 100);
}
