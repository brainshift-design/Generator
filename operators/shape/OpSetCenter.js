class   OpSetCenter
extends OperatorBase
{
    paramCenterX;
    paramCenterY;
    paramUnits;



    constructor()
    {
        super(SET_CENTER, 'setCenter', 'set center', iconCenter);

        this.canDisable  = true;
        // this.iconOffsetY = -2;

        
        this.addInput (new Input ([...SHAPE_VALUES, SHAPE_LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramUnits      = new OptionParam('units',      'units',       false, true, true, ['object', 'relative', 'absolute'], 0));
        this.addParam(this.paramCenterX    = new NumberParam('centerX',    'center X',    true,  true, true, 50, 0, 100));
        this.addParam(this.paramCenterY    = new NumberParam('centerY',    'center Y',    true,  true, true, 50, 0, 100));


        this.paramCenterX.controls[0].suffix = '%';
        this.paramCenterY.controls[0].suffix = '%';

        this.paramCenterX.controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramCenterX.controls[0].max = Number.MAX_SAFE_INTEGER;

        this.paramCenterY.controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramCenterY.controls[0].max = Number.MAX_SAFE_INTEGER;


        this.paramCenterX.divider = 0.55;
        this.paramCenterY.divider = 0.55;


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

        request.push(...this.node.paramCenterX.genRequest(gen));
        request.push(...this.node.paramCenterY.genRequest(gen));
        request.push(...this.node.paramUnits  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        super.updateParams();


        this.paramCenterX.controls[0].resetRanges();
        this.paramCenterY.controls[0].resetRanges();


        const units = this.paramUnits.value.value;

        this.paramCenterX.controls[0].suffix     = units == 0 ? '%' : '';
        this.paramCenterY.controls[0].suffix     = units == 0 ? '%' : '';

        this.paramCenterX.controls[0].displayMin = units == 0 ?   0 : Number.MIN_SAFE_INTEGER;
        this.paramCenterX.controls[0].displayMax = units == 0 ? 100 : Number.MAX_SAFE_INTEGER;

        this.paramCenterY.controls[0].displayMin = units == 0 ?   0 : Number.MIN_SAFE_INTEGER;
        this.paramCenterY.controls[0].displayMax = units == 0 ? 100 : Number.MAX_SAFE_INTEGER;


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
