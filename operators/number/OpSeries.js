class   OpSeries
extends OperatorBase
{
    paramStart;
    paramStep;



    constructor()
    {
        super(NUMBER_SERIES, 'sequence', 'sequence');

        this.cached = false;
        
        this.addInput (new Input ([ANY_TYPE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramStart = new NumberParam('start', 'start', true, true, false, 0));
        this.addParam(this.paramStep  = new NumberParam('step',  'step',  true, true, false, 1));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramStart.genRequest(gen));
        request.push(...this.node.paramStep .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}