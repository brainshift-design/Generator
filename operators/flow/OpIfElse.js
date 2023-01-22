class   OpIfElse
extends OperatorBase
{
    paramCondition;



    constructor()
    {
        super(IF_ELSE, 'if/else', 90);


        this.addInput (new Input(ALL_TYPES));
        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([], this.output_genRequest));


        this.addParam(this.paramCondition = new NumberParam('condition', 'condition', true, true, false, 1, 0, 1));


        this.inputs[0].addEventListener('connect',    () => OpIfElse_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpIfElse_onDisconnectInput(this));
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


        const input0 = this.node.inputs[0];
        const input1 = this.node.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, 0, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, 1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);

        
        request.push(...this.node.paramCondition.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramCondition.enableControlText(true);

        this.updateParamControls();
    }
}



function OpIfElse_onConnectInput(node)
{
    const inOutput = node.inputs[0].connectedOutput;

    node.outputs[0].types = [...inOutput.types];
}



function OpIfElse_onDisconnectInput(node)
{
    node.outputs[0].types = [];
}