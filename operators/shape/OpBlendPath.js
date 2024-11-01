class   OpBlendPath
extends OperatorBase
{
    paramAmount;
    paramDegree;



    constructor()
    {
        super(BLEND_PATH, 'blendPath', 'blend path', iconBlendPath);


        // this.canDisable = true;
        this.iconOffsetY = -1;
        

        this.addNewInput();
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));

        this.addParam(this.paramAmount = new NumberParam('amount', 'amount', false, true, true, 50, 0, 100, 0));
        this.addParam(this.paramDegree = new OptionParam('degree', 'degree', false, true, true, ['linear', 'smooth'], 0));


        this.paramAmount.controls[0].min = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.controls[0].max = Number.MAX_SAFE_INTEGER; // extrapolation
        
        this.paramAmount.controls[0].setSuffix('%', true);
    }
    
    

    addNewInput()
    {
        const newInput = new Input(PATH_VALUES);
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


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));


        request.push(...this.node.paramAmount.genRequest(gen));
        request.push(...this.node.paramDegree.genRequest(gen));
      

        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type  = values[paramIds.findIndex(id => id == 'type')];
        if (type) this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramAmount.enableControlText(true, this.paramAmount.isUnknown());
        this.paramDegree.enableControlText(true, this.paramDegree.isUnknown());

        this.updateParamControls();
    }
}
