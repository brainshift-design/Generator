class   OpTrig
extends OperatorWithValue
{
    paramFunction;



    constructor(type, id, name, symbol)
    {
        super(type, id, name, symbol);

        this.canDisable       = true;
        this.alwaysLoadParams = true;

        
        this.addInput(new Input([NUMBER_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramOperation = new SelectParam('function', '', false, true, true, TRIG_OPS.map(s => s[1]), 2));
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


        request.push(...this.node.paramFunction.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue   .enableControlText(false);
        this.paramFunction.enableControlText(true);

        this.updateParamControls();
    }
}