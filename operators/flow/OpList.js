class   OpList
extends OperatorBase
{
    constructor()
    {
        super(LIST, 'list', 'list');

        this.canDisable     = true;
        this.variableInputs = true;


        this.addNewInput();
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([ANY_TYPE]);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onVariableConnectInput(this); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onVariableDisconnectInput(this, e.detail.input));

        this.addInput(newInput);

        return newInput;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.node.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const value = values[paramIds.findIndex(id => id == 'value')];
        console.assert(LIST_VALUES.includes(value.type));

        specifyListOutput(value, this.outputs[0]);
    }
}
