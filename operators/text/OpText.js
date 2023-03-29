class   OpText
extends ResizableBase
{
    paramValue;



    constructor()
    {
        super(TEXT, 'text');


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



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(x, y, w, h, updateTransform);

        this.paramValue.controls[0].textarea.style.height = (h - this.header.offsetHeight) + 'px';
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
        this.paramValue.enableControlText(!this.inputs[0].connected);
        this.updateParamControls();
    }



    paramIsConsideredDefault(param)
    {
        return  param.isDefault()
            && !this.inputs[0].connected;
    }
}