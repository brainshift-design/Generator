class   OpBoolean
extends OperatorWithValue
{
    paramOperation;



    constructor()
    {
        super(NUMBER_BOOLEAN, 'bool', 'boolean');

        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramValue);
        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true, true, BOOLEAN_OPS.map(s => s[1]), 3));


        this.paramOperation.reverseMenu = true;
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input(NUMBER_TYPES);
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

        this.paramValue.controls[0].text.style.fontStyle = 
               settings.showBoolValues 
            && this.paramValue.value.isValid()
            ? 'normal' 
            : 'italic';


        const v = Math.round(this.paramValue.value.value);

             if (this.isUnknown())        this.paramValue.controls[0].valueText = UNKNOWN_DISPLAY;
        else if (settings.showBoolValues
              && !isNaN(v))               this.paramValue.controls[0].valueText = v != 0 ? getTrueDisplay() : getFalseDisplay();
        else                              this.paramValue.controls[0].valueText = '';

        this.paramValue.controls[0].text.style.letterSpacing = settings.showBoolValues ? '0.1em' : 0;

        this.paramValue.controls[0].showBar = !this.isUnknown();


        this.updateParamControls();
    }
}