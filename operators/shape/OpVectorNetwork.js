class   OpVectorNetwork
extends OpShape
{
    constructor()
    {
        super(VECTOR_NETWORK, 'network', 'network', iconVectorNetwork);

        //this.canDisable   = true;
        this.subscription   = true;
        this.iconOffsetY    = -3;
        this.variableInputs = true;


        this.addNewInput();
        this.addOutput(new Output([VECTOR_NETWORK_VALUE], this.output_genRequest));


        this.addBaseParams();
    }



    addNewInput()
    {
        const newInput = new Input([VECTOR_REGION_VALUE]);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onVariableConnectInput(e.detail.input); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onVariableDisconnectInput(e.detail.input));

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
            

        const connectedInputs = this.node.inputs.filter(i => i.connected);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        connectedInputs.forEach(input => 
            request.push(...pushInputOrParam(input, gen)));


        request.push(...this.node.paramProps.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        
        return request;
    }
}