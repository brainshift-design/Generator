class   OpRandom
extends OperatorBase
{
    paramSeed;
    paramIteration;
    paramMin;
    paramMax;
    paramBias;   // random has its own bias and spread because
    paramSpread; // this has to happen before the uniqueness test
    paramUnique;



    constructor()
    {
        super(NUMBER_RANDOM, 'random', 'random', iconRandom);

        this.cached      = false;
        this.iconOffsetY = 1;
        // this.canDisable  = true;

        
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramSeed      = new NumberParam('seed',      'seed',      true, true, true, Math.floor(Math.random() * 10000), 0, 0x7fffffff));
        this.addParam(this.paramIteration = new NumberParam('iteration', 'iteration', true, true, true, Number.NaN, 0));
        this.addParam(this.paramMin       = new NumberParam('min',       'min',       true, true, true,   0));
        this.addParam(this.paramMax       = new NumberParam('max',       'max',       true, true, true, 100));
        this.addParam(this.paramBias      = new NumberParam('bias',      'bias',      true, true, true, 0, -100, 100));
        this.addParam(this.paramSpread    = new NumberParam('spread',    'spread',    true, true, true, 0, -100, 100));
        this.addParam(this.paramUnique    = new NumberParam('unique',    'unique',    true, true, true, 0, 0, 100));


        this.paramSeed.controls[0].allowEditDecimals = false;
        this.paramSeed.isDefault = () => false;

        this.paramBias  .controls[0].suffix = '%';
        this.paramSpread.controls[0].suffix = '%';

        this.paramUnique.controls[0].suffix = '%';
        this.paramUnique.controls[0].max    = 200;


        this.getDescription = () => `generates random number values`;

        this.paramSeed     .getDescription = () => `RNG seed`;
        this.paramIteration.getDescription = () => `forces RNG iteration`;
        this.paramMin      .getDescription = () => `smallest possible value`;
        this.paramMax      .getDescription = () => `biggest possible value`;
        this.paramBias     .getDescription = () => `bias values towards min or max`;
        this.paramSpread   .getDescription = () => `pinch or spread values around middle`;
        this.paramUnique   .getDescription = () => `prevents repetition when min is close to max`;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramSeed     .genRequest(gen));
        request.push(...this.node.paramIteration.genRequest(gen));
        request.push(...this.node.paramMin      .genRequest(gen));
        request.push(...this.node.paramMax      .genRequest(gen));
        request.push(...this.node.paramBias     .genRequest(gen));
        request.push(...this.node.paramSpread   .genRequest(gen));
        request.push(...this.node.paramUnique   .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}