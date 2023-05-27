class   OpSkew
extends OperatorBase
{
    paramSkewX;
    paramSkewY;
    paramCenterX;
    paramCenterY;
    paramShowCenter;



    constructor()
    {
        super(SKEW, 'skew', 'skew', iconSkew);

        this.canDisable  = true;
        this.iconOffsetY = -2;

        
        this.addInput (new Input ([...SHAPE_VALUES, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramSkewX      = new NumberParam('skewX',      'skew x',      true, true, true));
        this.addParam(this.paramSkewY      = new NumberParam('skewX',      'skew y',      true, true, true));
        this.addParam(this.paramCenterX    = new NumberParam('centerX',    'center x',    true, true, true, 50, 0, 100));
        this.addParam(this.paramCenterY    = new NumberParam('centerY',    'center y',    true, true, true, 50, 0, 100));
        this.addParam(this.paramShowCenter = new NumberParam('showCenter', 'show center', true, true, true, 0, 0, 1));


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

        request.push(...this.node.paramSkewX     .genRequest(gen));
        request.push(...this.node.paramSkewY     .genRequest(gen));
        request.push(...this.node.paramCenterX   .genRequest(gen));
        request.push(...this.node.paramCenterY   .genRequest(gen));
        request.push(...this.node.paramShowCenter.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }
}
