class   OpMinMax
extends OperatorBase
{
    static { operatorTypes[NUMBER_MINMAX] = this; }



    paramOperation;



    constructor()
    {
        super(NUMBER_MINMAX, 'minmax', 'min/max', iconMinMax);

        this.iconOffsetY      = 1;

        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramOperation = new OptionParam('operation', '', false, true, true, ['min', 'max'], 0));

        this.paramOperation.reverseMenu = true;
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]);
        newInput.isNew = true;


        newInput.addEventListener('connect',    e => 
        { 
            onVariableConnectInput(e.detail.input); 
            e.detail.input.isNew = false; 
        });
        
        
        newInput.addEventListener('disconnect', e => 
        {
            onVariableDisconnectInput(e.detail.input);
        });


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

        
        request.push(...this.node.paramOperation.genRequest(gen));

        
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
        this.paramOperation.enableControlText(true);

        this.updateParamControls();
    }
}
