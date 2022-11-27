class   OpCache
extends OperatorBase
{
    constructor()
    {
        super(CACHE, 'cache', 90);

        this.cached = true;
        
        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([], this.output_genRequest));

        this.inputs[0].addEventListener('connect',    () => OpCache_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpCache_onDisconnectInput(this));

        this.div   .style.borderRadius = '4px';        
        this.inner .style.borderRadius = '4px';        
        this.header.style.borderRadius = '4px';        
    }
    
    

    isCached()
    {
        return true;
    }



    canAutoConnectFrom(output)
    {
        return true;
    }

    

    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}



function OpCache_onConnectInput(node)
{
    node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
}



function OpCache_onDisconnectInput(node)
{
    node.outputs[0].types = [];
}