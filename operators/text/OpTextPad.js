class   OpTextPad
extends OperatorWithValue
{
    paramStartPad;
    paramStartCount;
    paramEndPad;
    paramEndCount;



    constructor()
    {
        super(TEXT_PAD, 'pad', 'pad', iconTextPad);

        this.canDisable = true;
        

        this.addInput (new Input ([TEXT_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramStartPad   = new   TextParam('startPad',   'start', false, true, true));
        this.addParam(this.paramStartCount = new NumberParam('startCount', 'start', true,  true, true, 0, 0));
        this.addParam(this.paramEndPad     = new   TextParam('endPad',     'end',   false, true, true));
        this.addParam(this.paramEndCount   = new NumberParam('endCount',   'end',   true,  true, true, 0, 0));


        this.paramValue.controls[0].textbox.defPlaceholder = '';

        setControlFont(this.paramValue.controls[0].textbox, 'Roboto Mono', 10, 'center');

        this.paramStartCount.controls[0].allowEditDecimals = false;
        this.paramEndCount  .controls[0].allowEditDecimals = false;
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

        request.push(...this.node.paramStartPad  .genRequest(gen));
        request.push(...this.node.paramStartCount.genRequest(gen));
        request.push(...this.node.paramEndPad    .genRequest(gen));
        request.push(...this.node.paramEndCount  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);
        this.paramValue.controls[0].valueText = this.isUnknown() ? UNKNOWN_DISPLAY : '';

        this.paramStartPad  .enableControlText(true);
        this.paramStartCount.enableControlText(true);
        this.paramEndPad    .enableControlText(true);
        this.paramEndCount  .enableControlText(true);

        this.updateParamControls();
    }
}