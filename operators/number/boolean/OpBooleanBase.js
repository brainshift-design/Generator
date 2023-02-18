class   OpBooleanBase
extends OperatorWithValue
{
    constructor(type, shortName)
    {
        super(type, shortName, 100);

        
        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramValue);
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input(NUMBER_TYPES);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { OpArithmetic_onConnectInput(this); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => OpArithmetic_onDisconnectInput(this, e.detail.input));

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

             if (this.isUnknown())        this.paramValue.control.valueText = UNKNOWN_DISPLAY;
        else if (settings.showBoolValues
              && !isNaN(v))               this.paramValue.control.valueText = v != 0 ? TRUE_DISPLAY : FALSE_DISPLAY;
        else                              this.paramValue.control.valueText = '';


        this.paramValue.control.text.style.fontStyle = 
               settings.showBoolValues 
            && this.paramValue.control.valueText != UNKNOWN_DISPLAY
            ? 'normal' 
            : 'italic';


        //this.paramValue.control.text.style.letterSpacing = settings.showBoolValues ? '0.1em' : 0; // this is if "true" and "false" are used
        
        this.paramValue.control.showBar = !this.isUnknown();


        this.updateParamControls();
    }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}



function OpArithmetic_onConnectInput(node)
{
    node.addNewInput();
}



function OpArithmetic_onDisconnectInput(node, input)
{
    removeFromArray(node.inputs, input);
    node.inputControls.removeChild(input.div);
}