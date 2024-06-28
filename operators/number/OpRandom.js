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



    toPrompt()
    {
        return createNodePrompt
        (
            this,
            `Generates a series of random number values.`,
            [
                [this.paramSeed,      `The starting seed for the random number generator.`],
                [this.paramIteration, `Forces a given iteration of the random number generator.`],
                [this.paramMin,       `The smallest possible generated value.`],
                [this.paramMax,       `The largest possible generated value.`],
                [this.paramBias,      `Negative values bias the generated random values closer to "${this.paramMin.name}", positive values bias the generated random values closer to ${this.paramMax.name}".`],
                [this.paramSpread,    `Negative values pinch the generated random values closer to the average of "${this.paramMin.name}" and "${this.paramMax.name}", positive values spread the generated random values away from the average of ${this.paramMin.name}" and ${this.paramMax.name}" and closer to the extremes.`],
                [this.paramUnique,    `When the spread between ${this.paramMin.name}" and ${this.paramMax.name} is smaller than around 5, generated random numbers will sometimes repeat, which doesn't look random. "${this.paramUnique.name}" prevents this by forcing an alternation of generated values. Increasing it to 100% alternates every other value, increasing it to 200% will cycle three repeating values.`]
            ]
        );
    }
}