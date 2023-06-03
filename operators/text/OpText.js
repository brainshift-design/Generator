class   OpText
extends ResizableBase
{
    paramValue;



    constructor()
    {
        super(TEXT, 'text', 'text', '');

        this.alwaysSaveParams = true;
        this.alwaysLoadParams = true;


        this.addInput (new Input (TEXT_TYPES, getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));

        this.addParam(this.paramValue = new TextParam('value', 'value', true, false, false));

        this.paramValue.controls[0].textbox.defPlaceholder = '...';
        this.paramValue.controls[0].setFont('Roboto Mono', 10, 'center');


        //this.header.addEventListener('pointerdown', e => this.paramValue.controls[0].textbox.blur());
    }



    setSize(w, h, updateTransform = true)
    {
        super.setSize(w, h, updateTransform);
        this.updateValueParam();
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(x, y, w, h, updateTransform);
        this.updateValueParam();
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
        this.paramValue.enableControlText(!this.inputs[0].connected);
        this.paramValue.controls[0].valueText = this.isUnknown() ? UNKNOWN_DISPLAY : '';

        this.updateParamControls();
        
        this.updateValueParam();
    }



    updateValueParam()
    {
        this.paramValue.controls[0].setSize(
            this.div.offsetWidth,
            this.div.offsetHeight - Math.max(defHeaderHeight, this.header.offsetHeight));
    }



    paramIsConsideredDefault(param)
    {
        return  param.isDefault()
            && !this.inputs[0].connected;
    }
}