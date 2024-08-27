class   OpIterate
extends OperatorBase
{
    paramValues;



    constructor()
    {
        super(ITERATE, 'iterate', 'iterate', iconIterate);

        this.valueType = ANY_VALUE;


        this.cached         = false;
        this.iconOffsetY    = 0;
        this.variableInputs = true;

        
        this.addNewInput();
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));
    }



    addNewInput()
    {
        const newInput = new Input([ANY_VALUE]);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onVariableConnectInput(e.detail.input); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onVariableDisconnectInput(e.detail.input));

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

        const type = values[paramIds.findIndex(id => id == 'type')];

        this.headerOutputs[0].types = [type.value];
    }
}
