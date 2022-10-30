class   OpRandom
extends OperatorBase
{
    paramMin;
    paramMax;
    paramSeed;



    constructor()
    {
        super(NUMBER_RANDOM, 'random', 90);

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramMin  = new NumberParam('min',  'min',  true, true, true,    0));
        this.addParam(this.paramMax  = new NumberParam('max',  'max',  true, true, true, 1000));
        this.addParam(this.paramSeed = new NumberParam('seed', 'seed', true, true, true, Math.floor(Math.random() * 65536), 0, 0x7fffffff));

        this.paramSeed.allowEditDecimals = false;

        //this.paramValue.enableControlText(false);
        
        // this.paramAmount.control.min = Number.MIN_SAFE_INTEGER; // allow
        // this.paramAmount.control.max = Number.MAX_SAFE_INTEGER; // extrapolation
        
        // this.paramAmount.control.setSuffix('%', true);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramMin  .genRequest(gen));
        request.push(...this.node.paramMax  .genRequest(gen));
        request.push(...this.node.paramSeed .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}