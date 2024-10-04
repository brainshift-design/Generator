class   OpTextCompare
extends OperatorBase
{
    paramOperation;
    paramOperand;



    constructor()
    {
        super(TEXT_COMPARE, 'compare', 'compare', iconTextCompare);

        this.outputValueType = TEXT_VALUE;


        this.canDisable  = true;
        this.iconOffsetY = 0;
        

        this.addInput (new Input([TEXT_VALUE, TEXT_LIST_VALUE, NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramOperation = new SelectParam('operation', '',        false, true,  true, CONDITION_OPS.map(s => s[1]), 3));
        this.addParam(this.paramOperand   = new   TextParam('operand',   'operand', false, true, true));

        this.paramOperation.reverseMenu = true;
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


        request.push(...this.node.paramOperation.genRequest(gen));
        request.push(...this.node.paramOperand  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type) 
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramOperation.enableControlText(true, this.paramOperation.isUnknown());
        this.paramOperand  .enableControlText(true, this.paramOperand  .isUnknown());


        if (this.hasConditionOutputs())
        {
            this.headerInputs[0].types = [ANY_VALUE];
            this.headerInputs[1].types = [ANY_VALUE];
        }

        
        this.updateParamControls();
    }
}