class   OpMath
extends OperatorWithValue
{
    paramOperation;



    constructor()
    {
        super(NUMBER_MATH, 'math', 'math');

        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramValue);
        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true, true, MATH_OPS.map(s => s[1]), 1));

        this.paramOperation.reverseMenu = true;
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([NUMBER_VALUE, LIST_VALUE]);
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

        
        request.push(...this.node.paramOperation.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue    .enableControlText(false);
        this.paramOperation.enableControlText(true);

        this.updateParamControls();
    }
}
