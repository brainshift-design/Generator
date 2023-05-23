class OpRender
extends OpShapeBase
{
    constructor()
    {
        super(RENDER, 'render', 'render');

        this.variableInputs = true;
        this.canDisable     = true;


        this.addNewInput();


        this.addBaseParams();
    }



    addNewInput()
    {
        const newInput = new Input([SHAPE_LIST_VALUE, ...SHAPE_VALUES]);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onSimpleVariableConnectInput(e.detail.input); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onSimpleVariableDisconnectInput(e.detail.input));

        this.addInput(newInput);

        return newInput;
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }
}