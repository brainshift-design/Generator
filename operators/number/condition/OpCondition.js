class   OpCondition
extends OperatorWithValue
{
    paramOperation;



    constructor()
    {
        super(NUMBER_CONDITION, 'cond');

        this.addInput(new Input(NUMBER_TYPES));
        this.addInput(new Input(NUMBER_TYPES));

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true, true, CONDITION_OPS.map(s => s[1]), 2));

        this.paramOperation.reverseMenu = true;
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


        request.push(...this.node.paramOperation.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue    .enableControlText(false);
        this.paramOperation.enableControlText(true);


        updateParamConditionText(this.paramValue, this.isUnknown());


        this.updateParamControls();
    }
}



function updateParamConditionText(param, unknown, offsetY = 0)
{
    const v = Math.round(param.value.value);

         if (unknown)        param.controls[0].valueText = UNKNOWN_DISPLAY;
    else if (settings.showBoolValues
          && !isNaN(v))      param.controls[0].valueText = '<span style="position: relative; top: ' + offsetY + 'px">' + (v != 0 ? getTrueDisplay() : getFalseDisplay()) + '</span>';
    else                     param.controls[0].valueText = '';

    param.controls[0].showBar = !settings.showBoolValues;//unknown;
}