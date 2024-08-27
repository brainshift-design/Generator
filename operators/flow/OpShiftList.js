class   OpShiftList
extends OperatorBase
{
    paramOffset;

    length;



    constructor()
    {
        super(SHIFT_LIST, 'shift', 'shift', iconShiftList);

        this.canDisable        = true;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramOffset = new NumberParam('offset', 'offset', true, true, true, 0));


        this.paramOffset.controls[0].allowEditDecimals = false;
        this.paramOffset.divider = 0.53;
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

        request.push(...this.node.paramOffset.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const length = values[paramIds.findIndex(id => id == 'length')];

        this.length = length.value;

        
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramOffset.enableControlText(true, this.paramOffset.isUnknown());

        this.updateParamControls();
    }
}