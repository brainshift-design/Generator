class   OpTextFetch
extends OperatorWithValue
{
    paramRequest;



    constructor()
    {
        super(TEXT_FETCH, 'fetch', 'fetch', defNodeWidth, true);

        this.canDisable       = true;

        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;


        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramRequest = new TextParam('request', 'request', true,  true));


        this.paramValue  .controls[0].textbox.style.textAlign = 'center';
        this.paramRequest.controls[0].textbox.style.textAlign = 'center';
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



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        this.endNodeProgress();
    }



    updateParams()
    {
        this.paramValue  .enableControlText(false);
        this.paramRequest.enableControlText(true);

        this.updateParamControls();
    }
}