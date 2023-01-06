class   OpArithmetic
extends OperatorWithSymbol
{
    paramValue;
    
    constructor(type, shortName, symbol)
    {
        super(type, shortName, symbol);

        
        this.variableInputs   = true;
        this.alwaysLoadParams = true;

        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramValue = new NumberParam('value', '', false, false, false));
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
            paramId: '' });


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
        super.updateParams();

        this.paramValue.enableControlText(false);
        
        this.paramValue.control.valueText = this.isUnknown() ? UNKNOWN_DISPLAY : '';
        this.paramValue.control.showBar   = !this.isUnknown();
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