class   OpNull
extends OpFlowBase
{
    static { Operator.types[NULL_NODE] = this; }
    
    
    
    constructor()
    {
        super(NULL_NODE, 'null', 'null', iconNull);

        
        this.outputValueType = ANY_VALUE;


        this.addInput (new Input ([ANY_VALUE]));
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
