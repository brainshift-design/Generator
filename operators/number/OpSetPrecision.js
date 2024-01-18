class   OpSetPrecision
extends OperatorBase
{
    paramDecimals;



    constructor()
    {
        super(NUMBER_PRECISION, 'precision', 'precision', iconNumberPrecision);

        this.canDisable  = true;
        //this.iconOffsetY = -2;
        

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramDecimals = new NumberParam('decimals', 'decimals', false, true,  true, 0, 0, 10));
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

        
        request.push(...this.node.paramDecimals.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramDecimals.enableControlText(true, this.paramDecimals.isUnknown());

        this.updateParamControls();
    }
}