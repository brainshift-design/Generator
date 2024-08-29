class   OpHold
extends OperatorBase
{
    paramFirst;



    constructor()
    {
        super(HOLD, 'hold', 'hold', iconHold);

        this.outputValueType = ANY_VALUE;


        this.cached      = false;
        this.iconOffsetY = 1;
        

        this.addInput (new Input ([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.addParam(this.paramFirst = new NumberParam('first', 'first', true, true, true, Number.NaN));


        this.paramFirst.showValue = false;

        this.paramFirst.input .types = [ANY_VALUE];
        this.paramFirst.output.types = [ANY_VALUE];
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

        request.push(...this.node.paramFirst.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramFirst.enableControlText(false, this.paramFirst.isUnknown());

        this.updateParamControls();
    }
}