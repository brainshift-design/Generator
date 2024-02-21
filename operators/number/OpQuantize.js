class   OpQuantize
extends OperatorBase
{
    paramType;
    paramBase;
    paramStep;



    constructor()
    {
        super(NUMBER_QUANTIZE, 'quantize', 'qunantize', iconQuantize);

        this.canDisable = true;
        

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramType = new SelectParam('type', 'type', false, true, true, ['floor', 'round', 'ceiling'], 1));
        this.addParam(this.paramBase = new NumberParam('base', 'base', true,  true, true, 0));
        this.addParam(this.paramStep = new NumberParam('step', 'step', true,  true, true, 1, 0));


        this.paramType.reverseMenu = true;

        this.paramBase.divider = 0.5;
        this.paramStep.divider = 0.5;
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

        
        request.push(...this.node.paramType.genRequest(gen));
        request.push(...this.node.paramBase.genRequest(gen));
        request.push(...this.node.paramStep.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramType.enableControlText(true, this.paramType.isUnknown());
        this.paramBase.enableControlText(true, this.paramBase.isUnknown());
        this.paramStep.enableControlText(true, this.paramStep.isUnknown());

        this.updateParamControls();
    }
}