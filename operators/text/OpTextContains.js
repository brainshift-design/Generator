class   OpTextContains
extends OperatorBase
{
    static { Operator.types[TEXT_CONTAINS] = this; }



    paramWhat;



    constructor()
    {
        super(TEXT_CONTAINS, 'textContains', 'contains', iconTextContains);

        
        this.outputValueType = TEXT_VALUE;
        this.iconOffsetY = 1;
        

        this.addInput (new Input ([TEXT_VALUE, TEXT_LIST_VALUE, NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramWhat = new TextParam('what', 'what', false, true, true));
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


        request.push(...this.node.paramWhat.genRequest(gen));


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
}