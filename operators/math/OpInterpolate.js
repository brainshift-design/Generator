class   OpInterpolate
extends OperatorBase
{
    paramValue;
    paramAmount;



    constructor()
    {
        super(NUMBER_INTERPOLATE, 'inter', 70);

        this.addInput(new Input([NUMBER]));
        this.addInput(new Input([NUMBER]));

        this.addOutput(new Output(NUMBER, this.output_genRequest));

        this.addParam(this.paramValue  = new NumberParam('value', '', false, false, false, 0));
        this.addParam(this.paramAmount = new NumberParam('amount', '', true,  true,  true, 50, 0, 100, 0));

        enableSliderText(this.paramValue.control, false);
        
        this.paramAmount.control.min = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.control.max = Number.MAX_SAFE_INTEGER; // extrapolation
        
        this.paramAmount.control.setSuffix('%', true);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


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


        request.push(...this.node.paramAmount.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        super.updateValues(updateParamId, paramIds, values);

        if (paramIds.includes('value'))
            this.outputs[0].cache = [NUMBER_VALUE, values[0].toString()];
    }
}