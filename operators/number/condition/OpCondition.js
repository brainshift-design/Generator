class   OpCondition
extends OperatorBase
{
    paramOperation;
    paramOperand;



    constructor()
    {
        super(NUMBER_CONDITION, 'compare', 'compare', '');
        
        this.iconOffsetY = -1;


        this.addInput(new Input([NUMBER_VALUE]));

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramOperation = new SelectParam('operation', '', false, true, true, CONDITION_OPS.map(s => s[1]), 3));
        this.addParam(this.paramOperand   = new NumberParam('operand',   'operand', false, true, true, 0));

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
        this.paramOperation.enableControlText(true, this.paramOperation.isUnknown());
        this.paramOperand  .enableControlText(true, this.paramOperand  .isUnknown());


        switch (this.paramOperation.value.value)
        {
            case 0: this.icon = iconLess;           this.iconOffsetY = 1; break;
            case 1: this.icon = iconLessOrEqual;    this.iconOffsetY = 0; break;
            case 2: this.icon = iconNotEqual;       this.iconOffsetY = 2; break;
            case 3: this.icon = iconEqual;          this.iconOffsetY = 0; break;
            case 4: this.icon = iconGreaterOrEqual; this.iconOffsetY = 0; break;
            case 5: this.icon = iconGreater;        this.iconOffsetY = 1; break;
        }

        this.updateIcon();


        this.updateParamControls();
    }
}



function updateParamConditionText(param, unknown, color = true, offsetY = 0)
{
    const v = Math.round(param.value.value);

         if (unknown)        param.controls[0].valueText = UNKNOWN_DISPLAY;
    else if (settings.showBoolValues
          && !isNaN(v))      param.controls[0].valueText = '<span style="position: relative; top: ' + offsetY + 'px">' + (v != 0 ? getTrueDisplay(color) : getFalseDisplay(color)) + '</span>';
    else                     param.controls[0].valueText = '';

    param.controls[0].showBar = !settings.showBoolValues;//unknown;
}