class   OpNoise
extends OperatorBase
{
    paramSeed;
    paramIteration;
    paramMin;
    paramMax;
    paramScale;
    paramOffset;
    paramEvolve;
    paramInterpolate;
    paramDetail;



    constructor()
    {
        super(NUMBER_NOISE, 'noise', 'noise', iconNoise);

        this.cached      = false;
        //this.iconOffsetY = 1;
        this.canDisable  = true;

        
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramSeed        = new NumberParam('seed',        'seed',      true,  true, true, Math.floor(Math.random() * 10000), 0, 0x7fffffff));
        this.addParam(this.paramIteration   = new NumberParam('iteration',   'iteration', true,  true, true, Number.NaN, 0));
        this.addParam(this.paramMin         = new NumberParam('min',         'min',       true,  true, true,   0));
        this.addParam(this.paramMax         = new NumberParam('max',         'max',       true,  true, true, 100));
        this.addParam(this.paramScale       = new NumberParam('scale',       'scale',     true,  true, true, 1, 1));
        this.addParam(this.paramOffset      = new NumberParam('offset',      'offset',    true,  true, true, 0, 0));
        this.addParam(this.paramEvolve      = new NumberParam('evolve',      'evolve',    true,  true, true, 0, 0));
        this.addParam(this.paramInterpolate = new SelectParam('interpolate', 'blend',     true,  true, true, ['step', 'linear', 'cosine'], 2));
        this.addParam(this.paramDetail      = new NumberParam('detail',      'detail',    true,  true, true, 1, 0));


        this.paramIteration.controls[0].allowEditDecimals = false;

        this.paramSeed.controls[0].allowEditDecimals = false;
        this.paramSeed.isDefault = () => false;

        this.paramScale .controls[0].setDecimals(1);
        this.paramOffset.controls[0].setDecimals(1);
        this.paramEvolve.controls[0].setDecimals(1);

        this.setAllParamDividers(0.47);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramSeed       .genRequest(gen));
        request.push(...this.node.paramIteration  .genRequest(gen));
        request.push(...this.node.paramMin        .genRequest(gen));
        request.push(...this.node.paramMax        .genRequest(gen));
        request.push(...this.node.paramScale      .genRequest(gen));
        request.push(...this.node.paramOffset     .genRequest(gen));
        request.push(...this.node.paramEvolve     .genRequest(gen));
        request.push(...this.node.paramInterpolate.genRequest(gen));
        request.push(...this.node.paramDetail     .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}