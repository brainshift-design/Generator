class   OpDistribute
extends OperatorBase
{
    paramFrom;
    paramStart;
    paramEnd;
    paramSpread;
    paramBias;



    constructor()
    {
        super(NUMBER_DISTRIBUTE, 'range', 'range', iconDistribute);

        this.cached     = false;
        this.canDisable = true;
        

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));


        this.addParam(this.paramFrom   = new SelectParam('from',   'from',   true, true, true, ['start', 'middle', 'end'], 1));
        this.addParam(this.paramStart  = new NumberParam('start',  'start',  true, true, true, 0));
        this.addParam(this.paramEnd    = new NumberParam('end',    'end',    true, true, true, 0));
        this.addParam(this.paramSpread = new SelectParam('spread', 'spread', true, true, true, ['even', 'curve', 'spread']));
        this.addParam(this.paramBias   = new NumberParam('bias',   'bias',   true, true, true, 0, -100, 100));


        this.paramBias.controls[0].suffix = '%';
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramFrom  .genRequest(gen));
        request.push(...this.node.paramStart .genRequest(gen));
        request.push(...this.node.paramEnd   .genRequest(gen));
        request.push(...this.node.paramSpread.genRequest(gen));
        request.push(...this.node.paramBias  .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}