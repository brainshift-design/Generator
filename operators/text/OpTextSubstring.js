class   OpTextSubstring
extends OperatorBase
{
    paramStart;
    paramEnd;



    constructor()
    {
        super(TEXT_SUBSTRING, 'substring');

        this.canDisable = true;
        

        this.addInput (new Input (TEXT_TYPES));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramStart = new NumberParam('start', 'start', true,  true,  true));
        this.addParam(this.paramEnd   = new NumberParam('end',   'end',   true,  true,  true));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramStart.genRequest(gen));
        request.push(...this.node.paramEnd  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramStart.enableControlText(true);
        this.paramEnd  .enableControlText(true);

        this.updateParamControls();
    }
}