class   OpVectorRegion
extends OpShape
{
    paramWinding;



    constructor()
    {
        super(VECTOR_REGION, 'region', 'region', iconVectorRegion);

        //this.canDisable = true;
        this.subscription = true;
        this.beta         = true;
        this.iconOffsetY  = 2;


        this.addNewInput();
        this.addOutput(new Output([VECTOR_REGION_VALUE], this.output_genRequest, getNodeOutputValuesForUndo));//, this.output_backInit));

        this.addParam(this.paramWinding = new OptionParam('winding', 'winding', false, true, true, ['even-odd', 'non-zero']));

        this.addBaseParamsAfter();


        this.setAllParamDividers(0.45);
    }



    addNewInput()
    {
        const newInput = new Input([VECTOR_EDGE_VALUE, LIST_VALUE]);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onVariableConnectInput(e.detail.input); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onVariableDisconnectInput(e.detail.input));

        this.addInput(newInput);

        return newInput;
    }



    // input_getBackInitValue()
    // {
    //     // 'this' is the input

    //     return new PointValue(
    //         this.nodeId,
    //         this.node.paramX.value,
    //         this.node.paramY.value);
    // }



    // output_backInit(value)
    // {
    //     // 'this' is the output

    //     consoleAssert(value.type == POINT_VALUE, 'expected POINT_VALUE in backInit()');
        
    //     this.node.paramX.setValue(value.x, false, true, false);
    //     this.node.paramY.setValue(value.y, false, true, false);
    // }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id,
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;
            

        const connectedInputs = this.node.inputs.filter(i => !i.param && i.connected);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        connectedInputs.forEach(input => 
            request.push(...pushInputOrParam(input, gen)));

        
        request.push(...this.node.paramWinding.genRequest(gen));
        request.push(...this.node.paramProps  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        
        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        //const value   = values[paramIds.findIndex(id => id == 'value'  )];
        const winding = values[paramIds.findIndex(id => id == 'winding')];
        //const props   = values[paramIds.findIndex(id => id == 'props'  )];

        this.paramWinding.setValue(winding, false, true, false);
        //this.paramProps  .setValue(props,   false, true, false);
    }



    updateParams()
    {
        this.paramWinding.enableControlText(true);
        this.paramProps  .enableControlText(false);
    
        this.updateParamControls();
    }
}