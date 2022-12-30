class   OpPass
extends OperatorBase
{
    paramCondition;



    constructor()
    {
        super(PASS, 'pass', 90);


        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([], this.output_genRequest));


        this.addParam(this.paramCondition = new NumberParam('condition', 'condition', true, true, false, 1, 0, 1));


        this.inputs[0].addEventListener('connect',    () => OpPass_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpPass_onDisconnectInput(this));
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
        
        request.push(...this.node.paramCondition.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramCondition.enableControlText(true);

        super.updateParams();
    }
}



function OpPass_onConnectInput(node)
{
    const inOutput = node.inputs[0].connectedOutput;

    node.outputs[0].types = [...inOutput.types];
}



function OpPass_onDisconnectInput(node)
{
    node.outputs[0].types = [];
}