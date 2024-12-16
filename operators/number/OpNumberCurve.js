class   OpNumberCurve
extends OperatorBase
{
    static { operatorTypes[NUMBER_CURVE] = this; }



    paramMin;
    paramMax;
    paramPower;



    constructor()
    {
        super(NUMBER_CURVE, 'curve', 'curve', iconNumberCurve);


        this.canDisable  = true;
        this.iconOffsetY = 1;


        this.addInput (new Input ([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramPower = new NumberParam('power', 'power', true, true, true, 1));
        this.addParam(this.paramMin   = new NumberParam('min',   'min',   true, true, true,   0));
        this.addParam(this.paramMax   = new NumberParam('max',   'max',   true, true, true, 100));


        this.setAllParamDividers(0.45);

        this.paramPower.controls[0].setDecimals(2);
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

        request.push(...this.node.paramMin   .genRequest(gen));
        request.push(...this.node.paramMax   .genRequest(gen));
        request.push(...this.node.paramPower .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramMin  .enableControlText(true, this.paramMin  .isUnknown());
        this.paramMax  .enableControlText(true, this.paramMax  .isUnknown());
        this.paramPower.enableControlText(true, this.paramPower.isUnknown());

        this.updateParamControls();
    }
}