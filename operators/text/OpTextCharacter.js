class   OpTextCharacter
extends OperatorWithValue
{
    paramCode;



    constructor()
    {
        super(TEXT_CHAR, 'charFromCode', 'char from code');


        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramCode = new NumberParam('code', 'unicode', true,  true,  true, 65, 0, 0xFFFF));


        this.paramCode.controls[0].showHex           = true;
        this.paramCode.controls[0].allowEditDecimals = false;
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

        request.push(...this.node.paramCode.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);
        this.paramValue.controls[0].valueText = this.isUnknown() ? UNKNOWN_DISPLAY : '';

        this.paramCode .enableControlText(true);

        this.updateParamControls();
    }
}