class   OpNumberToText
extends OperatorBase
{
    paramValue;
    paramFormat;
    paramDigits;



    constructor()
    {
        super(NUMBER_TO_TEXT, 'to text');


        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue  = new   TextParam('value',  '',              false, true));
        this.addParam(this.paramFormat = new SelectParam('format', 'format', false, true,  true, ['decimal', 'hex', 'float']));
        this.addParam(this.paramDigits = new NumberParam('digits', 'digits', true,  true,  true, 0, 0, 10));

        this.paramValue.controls[0].textbox.style.textAlign = 'center';
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

        request.push(...this.node.paramFormat.genRequest(gen));
        request.push(...this.node.paramDigits.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue .enableControlText(false);
        this.paramFormat.enableControlText(true);
        this.paramDigits.enableControlText(true);

        this.updateParamControls();
    }
}