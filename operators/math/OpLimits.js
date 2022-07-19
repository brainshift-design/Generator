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

        const [req, ignore] = this.node.getRequestStart(gen);
        if (ignore) return req;

        
        const input = this.node.inputs[0];


        req.push(input.connected ? 1 : 0);
        
        if (input.connected)
            req.push(...input.connectedOutput.genRequest(gen));

        req.push(...this.node.paramMin.genRequest(gen));
        req.push(...this.node.paramMax.genRequest(gen));

        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return req;
    }



    updateValues(updateParamId, paramIds, values)
    {
        super.updateValues(updateParamId, paramIds, values);

        // if (paramIds.includes('value'))
        //     this.outputs[0].cache = [NUMBER_VALUE, values[0].toString()];

        this.paramMax.control.setMin(values[paramIds.indexOf('min')].value, false);
        this.paramMin.control.setMax(values[paramIds.indexOf('max')].value, false);
    }
}