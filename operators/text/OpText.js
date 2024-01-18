class   OpText
extends ResizableBase
{
    paramValue;



    constructor()
    {
        super(TEXT, 'text', 'text', '');


        this.addInput (new Input (TEXT_TYPES, getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));

        this.addParam(this.paramValue = new TextParam('value', 'value', false, false, false));

        this.paramValue.controls[0].allowTabs         = true;
        this.paramValue.controls[0].requireFinishCtrl = true;
        this.paramValue.controls[0].textbox.defPlaceholder = '...';

        setControlFont(this.paramValue.controls[0].textbox, 'Roboto Mono', 10, 'center');
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        this.updateValueParam();

        const valueHeight = 
              !this.headerOutputs[0].isCondition()
            || this.notCondition === true
            ? defParamHeight 
            : 0;

        super.setRect(
            x, 
            y, 
            w, 
              !this.headerOutputs[0].isCondition()
            || this.notCondition === true
            ? Math.max(defHeaderHeight + valueHeight, h)
            : defHeaderHeight, 
            updateTransform);
    }

    
    
    input_getBackInitValue()
    {
        // 'this' is the input

        return this.node.paramValue.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == TEXT_VALUE, 'expected TEXT_VALUE in backInit()');
        
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



    updateNode()
    {
        super.updateNode();

        
        this.div   .style.borderRadius = 
        this.inner .style.borderRadius = 
        this.header.style.borderRadius = 
              !this.headerOutputs[0].isCondition()
            || this.notCondition
            ? '4px 4px 0 0'
            : '4px';
    }



    updateParams()
    {
        this.paramValue.enableControlText(true, this.isUnknown());

        this.updateParamControls();
        this.updateValueParam();
    }



    updateValueParam()
    {
        this.paramValue.div.style.width  = this.div.offsetWidth;
        this.paramValue.div.style.height = this.div.offsetHeight - Math.max(defHeaderHeight, this.header.offsetHeight);    

        this.paramValue.div.style.display = 
              !this.headerOutputs[0].isCondition()
            || this.notCondition
            ? 'inline-block'
            : 'none';
    }



    paramIsConsideredDefault(param)
    {
        return  param.isDefault()
            && !this.inputs[0].connected;
    }
}