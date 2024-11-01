class   OpQuantize
extends OperatorBase
{
    paramType;
    paramBase;
    paramStep;
    paramAmount;



    constructor()
    {
        super(NUMBER_QUANTIZE, 'quantize', 'quantize', iconQuantize);

        this.canDisable = true;
        

        this.addInput (new Input ([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramType   = new OptionParam('type',   'type',   false, true, true, ['floor', 'round', 'ceiling'], 1));
        this.addParam(this.paramBase   = new NumberParam('base',   'base',   true,  true, true, 0));
        this.addParam(this.paramStep   = new NumberParam('step',   'step',   true,  true, true, 1, 0));
        this.addParam(this.paramAmount = new NumberParam('amount', 'amount', true,  true, true, 100, 0, 100, 0));


        this.paramType.reverseMenu = true;

        this.paramBase.divider = 0.5;
        this.paramStep.divider = 0.5;

        this.paramAmount.controls[0].setSuffix('%', true);
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

        
        request.push(...this.node.paramType  .genRequest(gen));
        request.push(...this.node.paramBase  .genRequest(gen));
        request.push(...this.node.paramStep  .genRequest(gen));
        request.push(...this.node.paramAmount.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == '_type')];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramType  .enableControlText(true, this.paramType.isUnknown());
        this.paramBase  .enableControlText(true, this.paramBase.isUnknown());
        this.paramStep  .enableControlText(true, this.paramStep.isUnknown());
        this.paramAmount.enableControlText(true, this.paramStep.isUnknown());

        this.updateParamControls();
    }
}