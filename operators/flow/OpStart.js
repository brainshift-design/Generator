class   OpStart
extends OperatorBase
{
    paramRepeatId;



    constructor()
    {
        super(START, 'start', 'start');

        this.addInput (new Input ([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));


        this.addParam(this.paramRepeatId = new TextParam('repeatId', '↱', false, true));


        // this.inputs[0].addEventListener('connect',    e => { OpStart_onConnectInput(this); });
        // this.inputs[0].addEventListener('disconnect', e => OpStart_onDisconnectInput(this));
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


        request.push(...this.node.paramRepeatId.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}



// function OpStart_onConnectInput(node)
// {
//     node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
// }



// function OpStart_onDisconnectInput(node)
// {
//     node.outputs[0].types = [ANY_VALUE];
// }