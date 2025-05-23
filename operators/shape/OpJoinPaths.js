class   OpJoinPaths
extends OpShape
{
    static { Operator.types[JOIN_PATHS] = this; }



    paramClosed;
    paramDegree;
    paramWinding;
    paramRound;

    menuClosed;


    
    constructor()
    {
        super(JOIN_PATHS, 'joinPath', 'join paths', iconJoinPaths);

        
        this.canDisable     = true;
        this.variableInputs = true;
        this.iconOffsetY    = -1;


        this.addNewInput();
        this.addOutput(new Output([VECTOR_PATH_VALUE], this.output_genRequest));


        this.addParam(this.paramDegree  = new OptionParam('degree',  'degree',  false, true, true, PathJoinDegrees, 0));
        this.addParam(this.paramClosed  = new NumberParam('closed',  'closed',  true,  true, true, 0, 0, 1));
        this.addParam(this.paramWinding = new OptionParam('winding', 'wind',    true,  true, true, PathWindings));
        this.addParam(this.paramRound   = new NumberParam('round',   'round',   true,  true, true, 0, 0));


        this.paramClosed.divider = 0.57;
        this.paramClosed.controls[0].allowEditDecimals = false;

        this.menuClosed = createBoolMenu(this.paramClosed);
        

        this.paramWinding.divider = 0.38;
        this.paramRound  .divider = 0.565;


        this.addBaseParamsAfter();
    }



    addNewInput()
    {
        const newInput = new Input([...PATH_VALUES, SHAPE_LIST_VALUE]);//this.createInputForObjects([VECTOR_PATH_VALUE], getNodeInputValuesForUndo);//new Input([VECTOR_PATH_VALUE]);
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


        request.push(this.node.params.length);

        for (const param of this.node.params)
            request.push(param.id, ...param.genRequest(gen));

                
        this.node.genRequestInherited(gen, request);


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
    
    
    
    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const closed  = values[paramIds.findIndex(id => id == 'closed' )];
        const degree  = values[paramIds.findIndex(id => id == 'degree' )];
        const winding = values[paramIds.findIndex(id => id == 'winding')];
        const round   = values[paramIds.findIndex(id => id == 'round'  )];

        this.paramClosed .setValue(closed,  false, true, false);
        this.paramDegree .setValue(degree,  false, true, false);
        this.paramWinding.setValue(winding, false, true, false);
        this.paramRound  .setValue(round,   false, true, false);
    }



    updateParams()
    {
        this.paramDegree .enableControlText(true, this.paramDegree .isUnknown());
        this.paramWinding.enableControlText(true, this.paramWinding.isUnknown());
        this.paramRound  .enableControlText(true, this.paramRound  .isUnknown());

        this.paramClosed.enableControlText(true);

        updateParamConditionText(this.paramClosed, this.paramClosed.isUnknown(), false, 1);

        this.updateParamControls();
    }
}