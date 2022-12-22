class   OpRound
extends OperatorBase
{
    paramType;
    paramDec;



    constructor()
    {
        super(NUMBER_ROUND, 'round', 100);

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramType = new SelectParam('type',     'type',     false, true, false, ['floor', 'round', 'ceiling'], 1));
        this.addParam(this.paramDec  = new NumberParam('decimals', 'decimals', true,  true, false, 0, 0, 10));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramType.genRequest(gen));
        request.push(...this.node.paramDec .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        super.updateParams();

        this.paramType.enableControlText(true);
        this.paramDec .enableControlText(true);
    }
}