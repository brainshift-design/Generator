class   OpProbability
extends OperatorBase
{
    paramSeed;
    paramIteration;
    paramChance;



    constructor()
    {
        super(NUMBER_PROBABILITY, 'prob', 'probability', iconProbability);

        this.cached      = false;
        this.iconOffsetY = -2;
        this.canDisable  = true;

        
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramSeed      = new NumberParam('seed',   'seed',   true,  true, true, Math.floor(Math.random() * 10000), 0, 0x7fffffff));
        this.addParam(this.paramIteration = new NumberParam('iteration', 'iteration', true, true, true, Number.NaN, 0));
        this.addParam(this.paramChance    = new NumberParam('chance', 'chance', true,  true, true, 50, 0, 100));

        this.paramSeed.controls[0].allowEditDecimals = false;
        this.paramSeed.isDefault = () => false;

        this.paramChance.controls[0].suffix = '%';
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
        request.push(...this.node.paramChance   .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}