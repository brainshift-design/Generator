class   OpText
extends ResizableBase
{
    paramValue;



    constructor()
    {
        super(TEXT, 'text');

        this.canResize = true;

        this.addInput (new Input (TEXT_TYPES, getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));

        this.addParam(this.paramValue = new TextParam('value', '', false, false));

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

        console.assert(value.type == TEXT_VALUE, 'expected TEXT_VALUE in backInit()');
        
        this.node.paramValue.setValue(value, false, true, false);
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

        this.paramValue.controls[0].valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : '';
        this.paramValue.controls[0].showBar   = !this.isUnknown();


        this.updateParamControls();
    }



    paramIsConsideredDefault(param)
    {
        return  param.isDefault()
            && !this.inputs[0].connected;
    }
}