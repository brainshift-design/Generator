class   OpItemCount
extends OperatorBase
{
    static { Operator.types[ITEM_COUNT] = this; }



    paramStart;


    
    constructor()
    {
        super(ITEM_COUNT, 'itemCount', 'item count', iconCount);


        this.outputValueType = ANY_VALUE;
        this.iconOffsetY     = 1;


        this.addInput (new Input(LIST_VALUES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramStart = new NumberParam('start', 'start', true,  true,  true, 1, 0, 1));


        this.paramStart.divider = 0.54;
        this.paramStart.controls[0].allowEditDecimals = false;
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

        request.push(...this.node.paramStart.genRequest(gen));


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



    // updateParams()
    // {
    //     this.paramStart.enableControlText(true,  this.paramStart.isUnknown());

    //     this.updateParamControls();
    // }
}