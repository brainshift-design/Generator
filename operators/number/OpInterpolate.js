class   OpInterpolate
extends OperatorBase
{
    paramAmount;
    paramDegree;
    


    constructor()
    {
        super(NUMBER_INTERPOLATE, 'inter', 'interpolate', iconInterpolate);

        this.variableInputs = true;
        this.iconOffsetY    = -2;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramAmount = new NumberParam('amount', 'amount', false, true, true, 50, 0, 100, 0));
        this.addParam(this.paramDegree = new SelectParam('degree', 'degree', false, true, true, ['linear', 'quadratic', 'cubic', 'cosine'], 0));

        
        this.paramAmount.controls[0].min = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.controls[0].max = Number.MAX_SAFE_INTEGER; // extrapolation
        
        this.paramAmount.controls[0].setSuffix('%', true);
    }



    addNewInput()
    {
        const newInput = new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]);
        
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


        request.push(...this.node.paramAmount.genRequest(gen));
        request.push(...this.node.paramDegree.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramAmount.enableControlText(true, this.paramAmount.isUnknown());
        this.paramDegree.enableControlText(true, this.paramDegree.isUnknown());

        this.updateParamControls();
    }
}