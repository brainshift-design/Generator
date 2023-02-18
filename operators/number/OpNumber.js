class   OpNumber
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(NUMBER, 'num');

        this.addInput (new Input (NUMBER_TYPES, this.input_getValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest, this.output_backInit));

        this.addParam(this.paramValue = new NumberParam('value', '', false, false, false));

        this.alwaysLoadParams = true;
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.node.paramValue.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        actionManager.do(new SetParamValueAction(this.node.paramValue, value), false, true);
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

        if (input.connected) request.push(...pushInputOrParam(input, gen));
        else                 request.push(...this.node.paramValue.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        const input = this.inputs[0];
        
        this.paramValue.enableControlText(!input.connected);

        this.paramValue.control.valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : '';
        this.paramValue.control.showBar   = !this.isUnknown();


        this.updateParamControls();
    }



    paramIsConsideredDefault(param)
    {
        return  param.isDefault()
            && !this.inputs[0].connected;
    }
}