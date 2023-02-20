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
        this.paramOperation.enableControlText(true);

        this.paramValue.enableControlText(false);
        this.paramValue.control.text.style.fontStyle = settings.showBoolValues ? 'normal' : 'italic';

        const v = Math.round(this.paramValue.value.value);

             if (this.isUnknown())        this.paramValue.control.valueText = UNKNOWN_DISPLAY;
        else if (settings.showBoolValues
              && !isNaN(v))               this.paramValue.control.valueText = v != 0 ? TRUE_DISPLAY : FALSE_DISPLAY;
        else                              this.paramValue.control.valueText = '';

        this.paramValue.control.text.style.letterSpacing = settings.showBoolValues ? '0.1em' : 0;

        this.paramValue.control.showBar = !this.isUnknown();


        this.updateParamControls();
    }
}