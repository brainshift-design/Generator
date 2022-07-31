class   OpLimits
extends OperatorBase
{
    paramValue;

    paramMin;
    paramMax;



    constructor()
    {
        super(NUMBER_LIMITS, 'lim', 70);

        this.addInput (new Input ([NUMBER]));
        this.addOutput(new Output(NUMBER, this.output_genRequest));


        this.addParam(this.paramValue = new NumberParam('value', '', false, false, false));
        enableSliderText(this.paramValue.control, false);
       
        this.addParam(this.paramMin   = new NumberParam('min', 'min', true, true, true, 0));
        this.addParam(this.paramMax   = new NumberParam('max', 'max', true, true, true));
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

        
        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramMin.genRequest(gen));
        request.push(...this.node.paramMax.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        super.updateValues(updateParamId, paramIds, values);

        this.paramMax.control.setMin(values[paramIds.indexOf('min')].value, false);
        this.paramMin.control.setMax(values[paramIds.indexOf('max')].value, false);
    }
}