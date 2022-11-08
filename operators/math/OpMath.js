class   OpMath
extends OperatorBase
{
    paramOperation;
    paramValue;



    constructor()
    {
        super(NUMBER_MATH, 'math', 70);

        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramValue     = new NumberParam('value',     '',   false, false, false));
        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true, true, MATH_OPS.map(s => s[1]), 1));
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input(NUMBER_TYPES);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { OpMath_onConnectInput(this); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => OpMath_onDisconnectInput(this, e.detail.input));

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


        const connectedInputs = this.node.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

        
        request.push(...this.node.paramOperation.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    // updateValues(updateParamId, paramIds, values)
    // {
    //     super.updateValues(updateParamId, paramIds, values);

    //     const value     = values[paramIds.findIndex(id => id == 'value'    )];
    //     const operation = values[paramIds.findIndex(id => id == 'operation')];

    //     this.paramValue    .setValue(value,     false, true, false);
    //     this.paramOperation.setValue(operation, false, true, false);
    // }



    updateParams()
    {
        this.paramValue    .enableControlText(false);
        this.paramOperation.enableControlText(true );

        super.updateParams();
    }



    paramsToJson(nTab = 0)
    {
        return super.paramsToJson();
    }
}



function OpMath_onConnectInput(node)
{
    node.addNewInput();
}



function OpMath_onDisconnectInput(node, input)
{
    removeFromArray(node.inputs, input);
    node.inputControls.removeChild(input.div);
}