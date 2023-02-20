class   OpForEach
extends OperatorBase
{
    constructor()
    {
        super(FOREACH, 'forEach');

        this.inert = true;
        
        this.addInput (new Input(LIST_TYPES, getInputValuesForUndo));
        this.addOutput(new Output([], this.output_genRequest));
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        return this.node.genRequest(gen);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const input = this.inputs[0];


        // request.push(input.connected ? 1 : 0);

        // if (input.connected) 
        //     request.push(...pushInputOrParam(input, gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }
}