class   OpNumberToText
extends OperatorBase
{
    paramValue;
    paramFormat;



    constructor()
    {
        super(NUMBER_TO_TEXT, 'numToText', 'to text', iconNumberToText);


        this.addInput(new Input([NUMBER_VALUE]));

        this.addParam(this.paramValue   = new TextParam ('value',  'value',  false, false, true));
        this.addParam(this.paramFormat = new SelectParam('format', 'format', false, true,  true, ['decimal', 'hexadecimal']));

        this.paramValue.isNodeValue = true;

        setControlFont(this.paramValue.controls[0].textbox, 'Roboto Mono', 10, 'center');
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.paramFormat.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false, this.isUnknown());
        //this.paramValue.controls[0].valueText = this.isUnknown() ? UNKNOWN_DISPLAY : '';

        this.paramFormat.enableControlText(true, this.paramFormat.isUnknown());

        this.updateParamControls();
    }
}