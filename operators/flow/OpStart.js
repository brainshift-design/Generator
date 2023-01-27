class   OpStart
extends OperatorBase
{
    constructor()
    {
        super(START, 'start', 70);

        this.addInput (new Input (ALL_TYPES));
        this.addOutput(new Output([], this.output_genRequest));

        this.inputs[0].addEventListener('connect',    e => { OpStart_onConnectInput(this); });
        this.inputs[0].addEventListener('disconnect', e => OpStart_onDisconnectInput(this));

        this.div   .style.borderRadius = '4px';        
        this.inner .style.borderRadius = '4px';        
        this.header.style.borderRadius = '4px';        
    }



    isCached()
    {
        return false;
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

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}



function OpStart_onConnectInput(node)
{
    node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
}



function OpStart_onDisconnectInput(node)
{
    node.outputs[0].types = [];
}