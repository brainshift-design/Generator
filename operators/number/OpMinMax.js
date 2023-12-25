class   OpMinMax
extends OperatorBase
{
    paramOperation;



    constructor()
    {
        super(NUMBER_MINMAX, 'minmax', 'min/max', iconMinMax);

        //this.iconOffsetY      = -1;

        this.variableInputs   = true;
        this.alwaysLoadParams = true;
        this.canDisable       = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true, true, ['min', 'max'], 0));

        this.paramOperation.reverseMenu = true;
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]);
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



    updateParams()
    {
        this.paramOperation.enableControlText(true);

        this.updateParamControls();
    }
}
