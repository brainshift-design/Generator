class   OpBooleanBase
extends OperatorWithValue
{
    constructor(type, id, name, icon)
    {
        super(type, id, name, icon);

        
        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramValue);
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]);
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
            

        const connectedInputs = this.node.inputs.filter(i => i.connected);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        connectedInputs.forEach(input => 
            request.push(...pushInputOrParam(input, gen)));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        
        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);
        

        const v = Math.round(this.paramValue.value.value);

             if (this.isUnknown())        this.paramValue.controls[0].valueText = UNKNOWN_DISPLAY;
        else if (settings.showBoolValues
              && !isNaN(v))               this.paramValue.controls[0].valueText = v != 0 ? getTrueDisplay() : getFalseDisplay();
        else                              this.paramValue.controls[0].valueText = '';


        this.paramValue.controls[0].text.style.fontStyle = 
               settings.showBoolValues 
            && this.paramValue.value.isValid()
            ? 'normal' 
            : 'italic';


        //this.paramValue.controls[0].text.style.letterSpacing = settings.showBoolValues ? '0.1em' : 0; // this is if "true" and "false" are used
        
        this.paramValue.controls[0].showBar = !this.isUnknown();


        this.updateParamControls();
    }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}
