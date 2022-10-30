class   OpLimits
extends OperatorBase
{
    paramValue;

    paramMin;
    paramMax;



    constructor()
    {
        super(NUMBER_LIMITS, 'lim', 90);

        this.addInput (new Input (NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));


        this.addParam(this.paramValue = new NumberParam('value', '', false, false, false));
        //this.paramValue.enableControlText(false);
       
        this.addParam(this.paramMin = new NumberParam('min', 'min', true, true, true,    0));
        this.addParam(this.paramMax = new NumberParam('max', 'max', true, true, true, 1000));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        // if (!isEmpty(this.cache))
        //     return this.cache;


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