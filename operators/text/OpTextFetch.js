class   OpTextFetch
extends OperatorWithValue
{
    paramRequest;



    constructor()
    {
        super(TEXT_FETCH, 'fetch');

        this.canDisable = true;
        

        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramRequest = new TextParam('request', 'request', true,  true));
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

        request.push(...this.node.paramRequest.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue  .enableControlText(false);
        this.paramRequest.enableControlText(true);

        this.updateParamControls();
    }
}