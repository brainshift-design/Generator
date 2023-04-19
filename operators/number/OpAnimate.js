class   OpAnimate
extends OperatorBase
{
    paramFrom;
    paramTo
    paramCurve;
    paramType;
    paramDuration;
    paramPosition;



    constructor()
    {
        super(NUMBER_ANIMATE, 'anim', 'animate');

        this.cached = false;
        
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramPosition = new NumberParam('position', 'position', true,  true, true, 0, 0, 100));
        this.addParam(this.paramDuration = new NumberParam('duration', 'duration', false, true, true, 1, 0, Number.MAX_SAFE_INTEGER, 1));
        this.addParam(this.paramType     = new SelectParam('type',     'type',     false, true, true, ['once', 'repeat', 'ping-pong']));
        this.addParam(this.paramCurve    = new SelectParam('curve',    'curve',    false, true, true, ['step', 'linear', 'ease in', 'ease out', 'smooth'], 1));
        this.addParam(this.paramFrom     = new NumberParam('from',     'from',     true,  true, true, 0));
        this.addParam(this.paramTo       = new NumberParam('to',       'to',       true,  true, true, 1));

        this.paramDuration.controls[0].suffix = ' sec';
        this.paramPosition.controls[0].suffix = '%';
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramFrom    .genRequest(gen));
        request.push(...this.node.paramTo      .genRequest(gen));
        request.push(...this.node.paramCurve   .genRequest(gen));
        request.push(...this.node.paramType    .genRequest(gen));
        request.push(...this.node.paramDuration.genRequest(gen));
        request.push(...this.node.paramPosition.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}