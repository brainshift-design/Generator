class   OpCache
extends OpFlowBase
{
    static { operatorTypes[CACHE] = this; }



    constructor()
    {
        super(CACHE, 'cache', 'cache', iconCache);

        this.outputValueType = ANY_VALUE;
        this.canDisable      = true;
        this.iconOffsetY     = 2;


        this.addInput (new Input([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.headerOutputs[0].forceOutputColor = true;
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