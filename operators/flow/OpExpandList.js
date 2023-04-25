class   OpExpandList
extends OperatorBase
{
    constructor()
    {
        super(LIST_EXPAND, 'expand', 'expand');

        this.addInput (new Input([LIST_VALUE]));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));
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
        pushUnique(gen.passedNodes, this);

        return request;
    }
}