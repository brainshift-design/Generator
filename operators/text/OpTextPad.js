class   OpTextPad
extends OperatorBase
{
    static { Operator.types[TEXT_PAD] = this; }



    paramStartPad;
    paramStartCount;
    paramEndPad;
    paramEndCount;



    constructor()
    {
        super(TEXT_PAD, 'pad', 'pad', iconTextPad);

        this.canDisable = true;
        

        this.addInput (new Input ([TEXT_VALUE, TEXT_LIST_VALUE, NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramStartPad   = new   TextParam('startPad',   'start', false, true, true));
        this.addParam(this.paramStartCount = new NumberParam('startCount', 'start', true,  true, true, 0, 0));
        this.addParam(this.paramEndCount   = new NumberParam('endCount',   'end',   true,  true, true, 0, 0));
        this.addParam(this.paramEndPad     = new   TextParam('endPad',     'end',   false, true, true));


        setControlFont(this.paramStartPad.controls[0].textbox, 'Roboto Mono', 10, 'center');
        setControlFont(this.paramEndPad  .controls[0].textbox, 'Roboto Mono', 10, 'center');
        
        this.paramStartPad.controls[0].textbox.defPlaceholder = 'start';
        this.paramEndPad  .controls[0].textbox.defPlaceholder = 'end';

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



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type' )];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramStartPad  .enableControlText(true);
        this.paramStartCount.enableControlText(true);
        this.paramEndPad    .enableControlText(true);
        this.paramEndCount  .enableControlText(true);

        this.updateParamControls();
    }
}