class   OpReorderList
extends OperatorBase
{
    paramIndices;



    constructor()
    {
        super(REORDER_LIST, 'reorder', 'reorder', iconReorderList);

        this.outputValueType   = LIST_VALUE;
        this.canDisable        = true;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramIndices = new ListParam('indices', 'indices', false, true, true));

        this.paramIndices.listTypes   = [NUMBER_LIST_VALUE, TEXT_VALUE];
        this.paramIndices.outputTypes = [NUMBER_LIST_VALUE];
        this.paramIndices.itemName    = ['index', 'indices'];
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

        request.push(...this.node.paramIndices.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type = values[paramIds.findIndex(id => id == 'type')];
        if (type) this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramIndices.enableControlText(false);
        
        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        colors.text = 
            isDark(colors.back) 
            ? [1, 1, 1, 1] 
            : [0, 0, 0, 1]; 

        return colors;
    }
}