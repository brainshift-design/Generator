class   OpBoolean
extends OperatorWithValue
{
    paramOperation;



    constructor()
    {
        super(NUMBER_BOOLEAN, 'bool');

        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramValue);
        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true, true, BOOLEAN_OPS.map(s => s[1]), 1));
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

        this.paramValue.control.text.style.fontStyle = 
               settings.showBoolValues 
            && this.paramValue.value.isValid()
            ? 'normal' 
            : 'italic';

            
        const v = Math.round(this.paramValue.value.value);

             if (this.isUnknown())        this.paramValue.control.valueText = UNKNOWN_DISPLAY;
        else if (settings.showBoolValues
              && !isNaN(v))               this.paramValue.control.valueText = v != 0 ? TRUE_DISPLAY : FALSE_DISPLAY;
        else                              this.paramValue.control.valueText = '';

        this.paramValue.control.text.style.letterSpacing = settings.showBoolValues ? '0.1em' : 0;

        this.paramValue.control.showBar = !this.isUnknown();


        this.updateParamControls();
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