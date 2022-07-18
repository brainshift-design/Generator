class   OpMinMax
extends OperatorBase
{
    paramValue;

    paramMin;
    paramMax;



    constructor()
    {
        super(NUMBER_MINMAX, 'minmax', 70);

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

        const req = this.node.getRequestStart();

        
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

        if (paramIds.includes('value'))
            this.outputs[0].cache = [NUMBER_VALUE, values[0].toString()];

        this.paramMax.control.setMin(values[paramIds.indexOf('min')].toString(), false);
        this.paramMin.control.setMax(values[paramIds.indexOf('max')].toString(), false);
    }
}