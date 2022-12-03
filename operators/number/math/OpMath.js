class   OpMath
extends OperatorBase
{
    paramOperation;
    paramOperand;



    constructor()
    {
        super(NUMBER_MATH, 'math', 70);

        this.alwaysLoadParams = true;


        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true, false, MATH_OPS.map(s => s[1]), 1));
        this.addParam(this.paramOperand   = new NumberParam('operand',   '', false, true, false, 0));
    }



    canAutoConnectFrom(output)
    {
        return this.inputs[0].canConnectFrom(output);
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
        
        request.push(...this.node.paramOperation.genRequest(gen));
        request.push(...this.node.paramOperand  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramOperation.enableControlText(true);
        this.paramOperand  .enableControlText(true);

        super.updateParams();
    }
}