class   OpBoolean
extends OperatorBase
{
    paramOperation;
    paramValue;



    constructor()
    {
        super(NUMBER_BOOLEAN, 'bool', 70);

        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        //this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true, false, BOOLEAN_OPS.map(s => s[1]), 1));
        this.addParam(this.paramValue     = new NumberParam('value', '', false, false, true));
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input(NUMBER_TYPES);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { OpList_onConnectInput(this); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => OpList_onDisconnectInput(this, e.detail.input));

        this.addInput(newInput);

        return newInput;
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: '' });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

        
        request.push(...this.paramOperation.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        super.updateParams();
        
        this.paramOperation.enableControlText(true);
        this.paramValue    .enableControlText(false);
    }
}



function OpList_onConnectInput(node)
{
    node.addNewInput();
}



function OpList_onDisconnectInput(node, input)
{
    removeFromArray(node.inputs, input);
    node.inputControls.removeChild(input.div);
}