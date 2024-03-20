class   OpReorientPaths
extends OperatorBase
{
    constructor()
    {
        super(REORIENT_PATHS, 'reorientPaths', 'reorient paths', iconReorientPaths);

        
        this.canDisable     = true;
        this.variableInputs = true;
        this.iconOffsetY    = -2;


        this.addNewInput();
        this.addOutput(new Output([SHAPE_LIST_VALUE], this.output_genRequest));
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


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}