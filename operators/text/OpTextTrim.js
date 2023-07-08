class   OpTextTrim
extends OperatorWithValue
{
    paramStart;
    paramEnd;



    constructor()
    {
        super(TEXT_TRIM, 'trim', 'trim', iconTextTrim);

        this.canDisable = true;
        

        this.addInput (new Input ([TEXT_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramStart = new TextParam('start', 'start', false, true, true, ''));
        this.addParam(this.paramEnd   = new TextParam('end',   'end',   false, true, true, ''));


        setControlFont(this.paramValue.controls[0].textbox, 'Roboto Mono', 10, 'center');
        setControlFont(this.paramStart.controls[0].textbox, 'Roboto Mono', 10, 'center');
        setControlFont(this.paramEnd  .controls[0].textbox, 'Roboto Mono', 10, 'center');

        this.paramStart.controls[0].textbox.defPlaceholder = 'start';
        this.paramEnd  .controls[0].textbox.defPlaceholder = 'end';
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
        this.paramValue.enableControlText(false);
        this.paramValue.controls[0].valueText = this.isUnknown() ? UNKNOWN_DISPLAY : '';

        this.paramStart.enableControlText(true);
        this.paramEnd  .enableControlText(true);

        this.updateParamControls();
    }
}