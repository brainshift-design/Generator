class   OpSeries
extends OperatorBase
{
    paramStart;
    paramStep;



    constructor()
    {
        super(NUMBER_SERIES, 'sequence', 'sequence');

        this.cached = false;
        
        //this.addInput (new Input ([ANY_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramStart = new NumberParam('start', 'start', true, true, true, 0));
        this.addParam(this.paramStep  = new NumberParam('step',  'step',  true, true, true, 1));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        // const input = this.node.inputs[0];


        // request.push(input.connected ? 1 : 0);
        
        // if (input.connected)
        //     request.push(...pushInputOrParam(input, gen));


        request.push(...this.node.paramStart.genRequest(gen));
        request.push(...this.node.paramStep .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}