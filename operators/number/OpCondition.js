class   OpCondition
extends OperatorBase
{
    paramOperation;
    paramValue;



    constructor()
    {
        super(NUMBER_CONDITION, 'cond', 70);

        this.addInput(new Input(NUMBER_TYPES));
        this.addInput(new Input(NUMBER_TYPES));

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true,  false, CONDITION_OPS.map(s => s[1]), 1));
        this.addParam(this.paramValue     = new NumberParam('value',     '', false, false, false, 50, 0, 100, 0));
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

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        request.push(...this.node.paramOperation.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        super.updateParams();

        this.paramOperation.enableControlText(true);
        this.paramValue    .enableControlText(false);
    }
}