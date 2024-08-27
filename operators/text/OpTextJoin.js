class   OpTextJoin
extends ResizableBase
{
    paramWith;



    constructor()
    {
        super(TEXT_JOIN, 'join', 'join', iconAddText);

        this.variableInputs   = true;
        this.alwaysLoadParams = true;

        this.addNewInput();
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramWith = new TextParam('with', 'with', false, true, true));

        this.paramWith.controls[0].textbox.defPlaceholder = 'with';


        setControlFont(this.paramWith .controls[0].textbox, 'Roboto Mono', 10, 'center');
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([TEXT_VALUE, TEXT_LIST_VALUE, NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]);
        newInput.isNew = true;


        newInput.addEventListener('connect', e => 
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



    setRect(x, y, w, h, updateTransform = true)
    {
        const height = this.headerHeight + defParamHeight;
        
        ResizableBase.prototype.setRect.call(this, 
            x, 
            y, 
            w, 
            height, 
            updateTransform);
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

            
        request.push(...this.node.paramWith.genRequest(gen));

        
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
        this.paramWith.enableControlText(true, this.paramWith.isUnknown());

        this.paramWith.div.style.width  = this.div.offsetWidth;
        this.paramWith.div.style.height = defParamHeight;    

        this.updateParamControls();
    }
}
