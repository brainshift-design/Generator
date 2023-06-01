class   OpNumberToText
extends OperatorBase
{
    paramNumber;
    paramFormat;



    constructor()
    {
        super(NUMBER_TO_TEXT, 'numToText', 'to text', '');


        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramNumber = new NumberParam('number', 'number', false, true,  true));
        this.addParam(this.paramFormat = new SelectParam('format', 'format', false, true,  true, ['decimal', 'hexadecimal']));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramNumber.genRequest(gen));
        request.push(...this.node.paramFormat.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramNumber.enableControlText(true);
        this.paramFormat.enableControlText(true);

        this.paramNumber.controls[0].showHex = this.paramFormat.value.value > 0;

        this.updateParamControls();
    }
}