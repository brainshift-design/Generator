class   OpNumber
extends ResizableBase
{
    paramValue;



    constructor()
    {
        super(NUMBER, 'num', 'number', iconNumber);


        this.showIcon = false;

        
        this.addInput (new Input ([NUMBER_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));

        this.addParam(this.paramValue = new NumberParam('value', 'value', false, false, false));

        this.alwaysLoadParams = true;
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        const valueHeight = 
              !this.headerOutputs[0].isCondition()
            || this.notCondition
            ? defParamHeight 
            : 0;

        super.setRect(
            x,
            y,
            w,
            defHeaderHeight + valueHeight,
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

        consoleAssert(value.type == NUMBER_VALUE, 'expected NUMBER_VALUE in backInit()');
        
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
        const input = this.inputs[0];
        
        this.paramValue.enableControlText(!input.connected, this.isUnknown());

        this.paramValue.controls[0].valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : '';
        this.paramValue.controls[0].showBar   = !this.isUnknown();

        this.updateParamControls();

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



    toJavascript(gen)
    {
        const conn = this.inputs[0].connected;


        gen.nTab++;
        const defs = this.toJsDefs(gen);
        gen.nTab--;


        let js = gen.NL + 'function ' + this.name + '(';
        
        if (   conn 
            && defs == NULL)
            js += 'input';

        js += ')';


        js += gen.NL + '{';
        gen.nTab++;


        js += defs;


        js += gen.NL + 'return ';
        js += conn ? 'input' : this.toJsCode(gen);
        js += ';';


        gen.nTab--;
        js += gen.NL + '}';


        return js;
    }



    toJsDefs(gen)
    {
        if (  !this.inputs[0].connected
            || gen.connectedOut(this))
            return '';

        
        let js = '';


        js += gen.NL + 'const input = ';
        js += this.inputs[0].connectedOutput.toJsCode(gen);
        js += ';';


        return js;
    }



    toJsCode(gen)
    {
        return this.inputs[0].connected
             ? this.inputs[0].connectedOutput.toJsCode(gen)
             : this.paramValue.value.toJsCode(gen);
    }
}