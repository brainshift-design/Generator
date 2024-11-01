class   OpBoolean
extends OperatorBase
{
    paramOperation;



    constructor()
    {
        super(NUMBER_BOOLEAN, 'logic', 'logic', '');

        this.iconOffsetY      = -1;

        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramOperation = new OptionParam('operation', '', false, true, true, BOOLEAN_OPS.map(s => s[1]), 3));


        this.paramOperation.reverseMenu = true;
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]);
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

        
        request.push(...this.node.paramOperation.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramOperation.enableControlText(true, this.paramOperation.isUnknown());


        switch (this.paramOperation.value.value)
        {
            case 0: this.icon = iconNot; this.iconOffsetY = -1; break;
            case 1: this.icon = iconXor; this.iconOffsetY =  2; break;
            case 2: this.icon = iconOr;  this.iconOffsetY =  1; break;
            case 3: this.icon = iconAnd; this.iconOffsetY =  1; break;
        }

        this.updateIcon();


        this.updateParamControls();
    }
}