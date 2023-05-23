class   OpTextJoin
extends ResizableOperatorWithValue
{
    constructor()
    {
        super(TEXT_JOIN, 'join', 'join', iconTextJoin);

        this.variableInputs   = true;
        this.alwaysLoadParams = true;

        this.addNewInput();
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);


        this.paramValue.controls[0].textbox.style.textAlign = 'center';
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onVariableConnectInput(e.detail.input); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onVariableDisconnectInput(e.detail.input));

        this.addInput(newInput);

        return newInput;
    }



    setSize(w, h, updateTransform = true)
    {
        super.setSize(w, h, updateTransform);
        this.updateValueParam();
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(x, y, w, h, updateTransform);
        this.updateValueParam();
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



    updateParams()
    {
        this.paramValue.enableControlText(false);
        this.updateValueParam();

        this.updateParamControls();
    }



    updateValueParam()
    {
        this.paramValue.controls[0].setSize(
            this.div.offsetWidth,
            this.div.offsetHeight - Math.max(defHeaderHeight, this.header.offsetHeight));
    }
}
