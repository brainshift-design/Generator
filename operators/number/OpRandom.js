class   OpRandom
extends OperatorBase
{
    paramSeed;
    paramMin;
    paramMax;



    constructor()
    {
        super(NUMBER_RANDOM, 'random', 90);

        this.cached = false;
        
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramSeed = new NumberParam('seed', 'seed', true, true, false, Math.floor(Math.random() * 10000), 0, 0x7fffffff));
        this.addParam(this.paramMin  = new NumberParam('min',  'min',  true, true, false,    0));
        this.addParam(this.paramMax  = new NumberParam('max',  'max',  true, true, false, 1000));

        this.paramSeed.control.allowEditDecimals = false;
        this.paramSeed.isDefault = () => false;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

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