class   OpReverseList
extends OperatorBase
{
    preview = null;
    tableLength;



    constructor()
    {
        super(REVERSE_LIST, 'reverse', 'reverse', iconReverseList);

        this.canDisable  = true;
        // this.iconOffsetY = 1;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));


        createListTooltip(this);
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

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        this.preview = values[paramIds.findIndex(id => id == 'preview')];
        const length = values[paramIds.findIndex(id => id == 'length' )];

        this.tableLength = length.value;
    }
}