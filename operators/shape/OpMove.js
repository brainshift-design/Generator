class   OpMove
extends OperatorBase
{
    paramX;
    paramY;



    constructor()
    {
        super(MOVE, 'move', 'move');

        this.canDisable = true;

        
        this.addInput (new Input (SHAPE_VALUES));
        this.addOutput(new Output(SHAPE_VALUES, this.output_genRequest));


        this.addParam(this.paramX = new NumberParam('x', 'x', true, true, true));
        this.addParam(this.paramY = new NumberParam('y', 'y', true, true, true));
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

        request.push(...this.node.paramX.genRequest(gen));
        request.push(...this.node.paramY.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }
}