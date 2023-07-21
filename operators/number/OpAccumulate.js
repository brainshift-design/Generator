class   OpAccumulate
extends OperatorBase
{
    constructor()
    {
        super(NUMBER_ACCUMULATE, 'accum', 'accumulate', iconAccumulate);

        this.cached      = false;
        this.iconOffsetY = 1;
        this.canDisable  = true;
        

        this.addInput (new Input ([NUMBER_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
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