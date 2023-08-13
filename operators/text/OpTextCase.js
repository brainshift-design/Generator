class   OpTextCase
extends OperatorWithValue
{
    paramCase;



    constructor()
    {
        super(TEXT_CASE, 'case', 'case', '');

        this.canDisable = true;
        

        this.addInput (new Input ([TEXT_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramCase = new SelectParam('case', 'case', false, true, true, ['lower', 'First capital', 'All Capitals', 'UPPER'], 1));

        setControlFont(this.paramValue.controls[0].textbox, 'Roboto Mono', 10, 'center');
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

        request.push(...this.node.paramCase.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(true, this.isUnknown());
        // this.paramValue.controls[0].valueText = this.isUnknown() ? UNKNOWN_DISPLAY : '';

        this.paramCase.enableControlText(true);

        this.updateParamControls();
    }
}