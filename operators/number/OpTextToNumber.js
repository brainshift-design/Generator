class   OpTextToNumber
extends OperatorBase
{
    paramText;
    paramFormat;



    constructor()
    {
        super(TEXT_TO_NUMBER, 'textToNum', 'to number', '');


        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramText   = new TextParam  ('text',   '',       false, true,  true));
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

        
        request.push(...this.node.paramText  .genRequest(gen));
        request.push(...this.node.paramFormat.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramText  .enableControlText(true);
        this.paramFormat.enableControlText(true);

        this.updateParamControls();
    }
}