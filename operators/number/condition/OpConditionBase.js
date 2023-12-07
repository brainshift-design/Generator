class   OpConditionBase
extends OperatorWithValue
{
    constructor(type, id, name, icon)
    {
        super(type, id, name, icon);

        this.alwaysLoadParams = true;

        
        this.addInput(new Input([NUMBER_VALUE]));
        this.addInput(new Input([NUMBER_VALUE]));

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
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


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);


        const v = Math.round(this.paramValue.value.value);

             if (this.isUnknown())       this.paramValue.controls[0].valueText = UNKNOWN_DISPLAY;
        else if (settings.showBoolValues
              && !isNaN(v))              this.paramValue.controls[0].valueText = v != 0 ? getTrueDisplay() : getFalseDisplay();
        else                             this.paramValue.controls[0].valueText = '';


        this.paramValue.controls[0].text.style.fontStyle = 
               settings.showBoolValues 
            && this.paramValue.controls[0].valueText != UNKNOWN_DISPLAY
            ? 'normal' 
            : 'italic';


        this.paramValue.controls[0].showBar = !this.isUnknown();


        this.updateParamControls();
    }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}