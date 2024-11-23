class   OpBoundedNumber
extends ResizableBase
{
    paramValue;
    paramMin;
    paramMax;



    constructor()
    {
        super(BOUNDED_NUMBER, 'bounded', 'bounded number', iconBoundedNumber);


        this.showIcon = false;

        
        this.addInput (new Input ([NUMBER_VALUE, TEXT_VALUE], getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));

        this.addParam(this.paramValue = new NumberParam('value', 'value', false, false, false,  1));
        this.addParam(this.paramMin   = new NumberParam('min',   'min',   true,  true,  true,   0));
        this.addParam(this.paramMax   = new NumberParam('max',   'max',   true,  true,  true, 100));

        this.paramMin.divider = 0.42;
        this.paramMax.divider = 0.42;

        this.alwaysLoadParams = true;


        this.paramValue.getConnectedMin = () => 
        {
            const connectedInputs = this.outputs[0].connectedInputs.filter(i => i.param);

            if (   connectedInputs.length == 1
                && connectedInputs[0].param
                && connectedInputs[0].param.type == NUMBER_VALUE)
            {
                const ctrl = connectedInputs[0].param.controls[0];

                return ctrl.minDisplay != Number.MIN_SAFE_INTEGER
                     ? ctrl.minDisplay
                     : ctrl.min != Number.MIN_SAFE_INTEGER
                        ? ctrl.min
                        : Number.NaN;
            }

            return Number.NaN;
        };


        this.paramValue.getConnectedMax = () => 
        {
            const connectedInputs = this.outputs[0].connectedInputs.filter(i => i.param);

            if (   connectedInputs.length == 1
                && connectedInputs[0].param
                && connectedInputs[0].param.type == NUMBER_VALUE)
            {
                const ctrl = connectedInputs[0].param.controls[0];

                return ctrl.maxDisplay != Number.MAX_SAFE_INTEGER
                     ? ctrl.maxDisplay
                     : ctrl.max != Number.MAX_SAFE_INTEGER
                        ? ctrl.max
                        : Number.NaN;
            }

            return Number.NaN;
        };
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        const valueHeight = defParamHeight * 2 +
            (  !this.headerOutputs[0].isCondition()
             || this.notCondition
             ? defParamHeight 
             : 0);

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

        request.push(...this.node.paramMin.genRequest(gen));
        request.push(...this.node.paramMax.genRequest(gen));

        
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



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const min = values[paramIds.findIndex(id => id == 'min')];
        const max = values[paramIds.findIndex(id => id == 'max')];

        this.paramValue.controls[0].setMin(Math.min(min.value, max.value));
        this.paramValue.controls[0].setMax(Math.max(min.value, max.value));

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
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