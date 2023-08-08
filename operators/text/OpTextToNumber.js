class   OpTextToNumber
extends OperatorBase
{
    paramValue;
    paramFormat;



    constructor()
    {
        super(TEXT_TO_NUMBER, 'textToNum', 'to number', iconTextToNumber);


        this.addInput(new Input([TEXT_VALUE]));

        this.addParam(this.paramValue  = new NumberParam('value',  'value',  false, false, true));
        this.addParam(this.paramFormat = new SelectParam('format', 'format', false, true,  true, ['decimal', 'hexadecimal']));

        this.paramValue.isNodeValue = true;
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
        this.paramValue .enableControlText(false, this.isUnknown());
        this.paramFormat.enableControlText(true);

        this.paramValue.controls[0].showHex = this.paramFormat.value.value > 0;

        this.updateParamControls();
    }
}