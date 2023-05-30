class   OpTextSubstring
extends OperatorWithValue
{
    paramStart;
    paramEnd;



    constructor()
    {
        super(TEXT_SUBSTRING, 'substring', 'substring', iconTextSubstring);

        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.addInput (new Input (TEXT_TYPES));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramStart = new NumberParam('start', 'start', true, true, true, 0, 0));
        this.addParam(this.paramEnd   = new NumberParam('end',   'end',   true, true, true, 0, 0));


        this.paramValue.controls[0].textbox.defPlaceholder = '';

        setControlFont(this.paramValue.controls[0].textbox, 'Roboto Mono', 10, 'center');

        this.paramStart.controls[0].allowEditDecimals = false;
        this.paramEnd  .controls[0].allowEditDecimals = false;
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



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const length = values[paramIds.findIndex(id => id == 'length')];

        if (length.value > 0)
        {
            this.paramStart.controls[0].setMax(length.value-1);
            this.paramEnd  .controls[0].setMax(length.value-1);
        }
        else
        {
            this.paramStart.controls[0].setMax();
            this.paramEnd  .controls[0].setMax();
        }
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