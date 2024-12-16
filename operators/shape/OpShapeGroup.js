class OpShapeGroup
extends OpShapeBase
{
    static { operatorTypes[SHAPE_GROUP] = this; }



    constructor()
    {
        super(SHAPE_GROUP, 'group', 'group', iconShapeGroup);

        this.variableInputs = true;
        this.canDisable     = true;
        this.iconOffsetY    = 1;


        this.addNewInput();
        this.addOutput(new Output([SHAPE_GROUP_VALUE], this.output_genRequest));


        this.addBaseParamsAfter();
    }



    addNewInput()
    {
        const newInput = new Input([...SHAPE_VALUES, SHAPE_LIST_VALUE]);
        newInput.isNew = true;


        newInput.addEventListener('connect',    e => 
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