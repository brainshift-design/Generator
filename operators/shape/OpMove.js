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
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramX = new NumberParam('x', 'x', true, true, true));
        this.addParam(this.paramY = new NumberParam('y', 'y', true, true, true));


        // this.inputs[0].addEventListener('connect',    e => OpMove_onConnectInput(this));
        // this.inputs[0].addEventListener('disconnect', e => OpMove_onDisconnectInput(this));
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



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        this.outputs[0].types = 
            this.inputs[0].connected
            ? [...this.inputs[0].connectedOutput.types]
            : [ANY_VALUE];
    }
}



// function OpMove_onConnectInput(node)
// {
//     node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
// }



// function OpMove_onDisconnectInput(node)
// {
//     node.outputs[0].types = [SHAPE_VALUE];
// }