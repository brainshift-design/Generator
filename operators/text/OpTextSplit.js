class   OpTextSplit
extends OperatorBase
{
    paramSeparator;

    length;



    constructor()
    {
        super(TEXT_SPLIT, 'split', 'split', iconTextSplit);


        this.addInput(new Input([TEXT_VALUE]));
        this.addOutput(new Output([TEXT_LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramSeparator = new TextParam('separator', 'separator', false, true,  true, ''));


        setControlFont(this.paramSeparator.controls[0].textbox, 'Roboto Mono', 10, 'center');
        setControlFont(this.paramSeparator.controls[0].textbox, 'Roboto Mono', 10, 'center');

        this.paramSeparator.controls[0].textbox.defPlaceholder = 'with';
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

        request.push(...this.node.paramSeparator.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const length = values[paramIds.findIndex(id => id == 'length')];

        this.length = length.value;
    }



    updateParams()
    {
        this.paramSeparator.enableControlText(true);

        this.updateParamControls();
    }
}