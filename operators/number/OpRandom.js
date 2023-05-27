class   OpRandom
extends OperatorBase
{
    paramSeed;
    paramMin;
    paramMax;



    constructor()
    {
        super(NUMBER_RANDOM, 'random', 'random', iconRandom);

        this.cached      = false;
        this.iconOffsetY = 1;

        
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramSeed = new NumberParam('seed', 'seed', true, true, true, Math.floor(Math.random() * 10000), 0, 0x7fffffff));
        this.addParam(this.paramMin  = new NumberParam('min',  'min',  true, true, true,   0));
        this.addParam(this.paramMax  = new NumberParam('max',  'max',  true, true, true, 255));

        this.paramSeed.controls[0].allowEditDecimals = false;
        this.paramSeed.isDefault = () => false;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramSeed.genRequest(gen));
        request.push(...this.node.paramMin .genRequest(gen));
        request.push(...this.node.paramMax .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}