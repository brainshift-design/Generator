class   OpInterpolate
extends OperatorWithValue
{
    paramAmount;
    


    constructor()
    {
        super(NUMBER_INTERPOLATE, 'inter', 'interpolate');

        this.addInput(new Input(NUMBER_TYPES));
        this.addInput(new Input(NUMBER_TYPES));

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramAmount = new NumberParam('amount', '', true, true, true, 50, 0, 100, 0));

        
        this.paramAmount.controls[0].min = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.controls[0].max = Number.MAX_SAFE_INTEGER; // extrapolation
        
        this.paramAmount.controls[0].setSuffix('%', true);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

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


        request.push(...this.node.paramAmount.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue .enableControlText(false);
        this.paramAmount.enableControlText(true);

        this.updateParamControls();
    }
}