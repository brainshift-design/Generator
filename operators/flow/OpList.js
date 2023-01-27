class   OpList
extends OperatorBase
{
    constructor()
    {
        super(LIST, 'list', 100);

        this.variableInputs = true;


        this.addNewInput();
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));


        this.div   .style.borderRadius = '4px';        
        this.inner .style.borderRadius = '4px';        
        this.header.style.borderRadius = '4px';        
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input(ALL_TYPES);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { OpList_onConnectInput(this); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => OpList_onDisconnectInput(this, e.detail.input));

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



function OpList_onConnectInput(node)
{
    node.addNewInput();
}



function OpList_onDisconnectInput(node, input)
{
    removeFromArray(node.inputs, input);
    node.inputControls.removeChild(input.div);
}