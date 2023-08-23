class   OpTextReplace
extends OperatorWithValue
{
    paramWhat;
    paramWith;



    constructor()
    {
        super(TEXT_REPLACE, 'replace', 'replace', iconTextReplace);

        this.canDisable       = true;
        this.iconOffsetY      = -2;
        
        this.alwaysLoadParams = true;
        this.alwaysSaveParams = true;
        

        this.addInput (new Input (TEXT_TYPES));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramWhat = new TextParam('what', 'what', false, true, true));
        this.addParam(this.paramWith = new TextParam('with', 'with', false, true, true));

        this.paramWhat.controls[0].textbox.defPlaceholder = 'what';
        this.paramWith.controls[0].textbox.defPlaceholder = 'with';

        setControlFont(this.paramValue.controls[0].textbox, 'Roboto Mono', 10, 'center');
        setControlFont(this.paramWhat .controls[0].textbox, 'Roboto Mono', 10, 'center');
        setControlFont(this.paramWith .controls[0].textbox, 'Roboto Mono', 10, 'center');
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

        request.push(...this.node.paramWhat.genRequest(gen));
        request.push(...this.node.paramWith.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(true, this.isUnknown());
        // this.paramValue.controls[0].valueText = this.isUnknown() ? UNKNOWN_DISPLAY : null;

        this.paramWhat.enableControlText(true);
        this.paramWith.enableControlText(true);

        this.updateParamControls();
    }
}