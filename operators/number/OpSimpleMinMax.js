class   OpSimpleMinMax
extends OperatorBase
{
    paramOperand;
    paramOperation;



    constructor()
    {
        super(NUMBER_SIMPLE_MINMAX, 'minmax', 'min/max', iconMinMax);

        this.iconOffsetY      = -1;
        this.alwaysLoadParams = true;
        

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramOperand   = new NumberParam('operand',   'operand', false, true, true, 0));
        this.addParam(this.paramOperation = new SelectParam('operation', '',        false, true, true, ['min', 'max'], 0));


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

        
        request.push(...this.node.paramOperand  .genRequest(gen));
        request.push(...this.node.paramOperation.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.outputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramOperand  .enableControlText(true);
        this.paramOperation.enableControlText(true);

        this.updateParamControls();
    }
}