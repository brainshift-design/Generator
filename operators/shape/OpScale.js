class   OpScale
extends OperatorBase
{
    paramScaleX;
    paramScaleY;
    paramCenterX;
    paramCenterY;
    paramShowCenter;



    constructor()
    {
        super(SCALE, 'scale', 'scale', iconScale);

        this.canDisable  = true;
        this.iconOffsetY = -1;

        
        this.addInput (new Input ([...SHAPE_VALUES, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramScaleX     = new NumberParam('scaleX',     'width',       true, true, true, 100));
        this.addParam(this.paramScaleY     = new NumberParam('scaleY',     'height',      true, true, true, 100));
        this.addParam(this.paramCenterX    = new NumberParam('centerX',    'center x',    true, true, true,  50, 0, 100));
        this.addParam(this.paramCenterY    = new NumberParam('centerY',    'center y',    true, true, true,  50, 0, 100));
        this.addParam(this.paramShowCenter = new NumberParam('showCenter', 'show center', true, true, true,   0, 0, 1));


        this.paramScaleX.controls[0].suffix = '%';
        this.paramScaleY.controls[0].suffix = '%';

        this.paramScaleX.controls[0].setMin(0);
        this.paramScaleY.controls[0].setMin(0);


        this.paramCenterX.controls[0].suffix = '%';
        this.paramCenterY.controls[0].suffix = '%';

        this.paramCenterX.controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramCenterX.controls[0].max = Number.MAX_SAFE_INTEGER;

        this.paramCenterY.controls[0].min = Number.MIN_SAFE_INTEGER;
        this.paramCenterY.controls[0].max = Number.MAX_SAFE_INTEGER;


        this.paramShowCenter.controls[0].allowEditDecimals = false;


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

        request.push(...this.node.paramScaleX    .genRequest(gen));
        request.push(...this.node.paramScaleY    .genRequest(gen));
        request.push(...this.node.paramCenterX   .genRequest(gen));
        request.push(...this.node.paramCenterY   .genRequest(gen));
        request.push(...this.node.paramShowCenter.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    // updateValues(requestId, actionId, updateParamId, paramIds, values)
    // {
    //     super.updateValues(requestId, actionId, updateParamId, paramIds, values);


    //     // const bounds = values[paramIds.findIndex(id => id == 'bounds')];

        
    //     // if (bounds.width.value > 0)
    //     // {
    //     //     this.paramCenterX.controls[0].displayMin = -bounds.width.value/2;
    //     //     this.paramCenterX.controls[0].displayMax =  bounds.width.value/2;
    //     // }
    //     // else
    //     // {
    //     //     this.paramCenterX.controls[0].displayMin = this.paramCenterX.controls[0].min;
    //     //     this.paramCenterX.controls[0].displayMax = this.paramCenterX.controls[0].max;
    //     // }


    //     // if (bounds.height.value > 0)
    //     // {
    //     //     this.paramCenterY.controls[0].displayMin = -bounds.height.value/2;
    //     //     this.paramCenterY.controls[0].displayMax =  bounds.height.value/2;
    //     // }
    //     // else
    //     // {
    //     //     this.paramCenterY.controls[0].displayMin = this.paramCenterY.controls[0].min;
    //     //     this.paramCenterY.controls[0].displayMax = this.paramCenterY.controls[0].max;
    //     // }
    // }
}
