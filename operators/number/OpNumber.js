class   OpNumber
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(NUMBER, 'num');

        this.addInput (new Input (NUMBER_TYPES, getNodeInputValuesForUndo, this.input_getBackInitValue));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest, getNodeOutputValuesForUndo, this.output_backInit));

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

        console.assert(value.type == NUMBER_VALUE, 'expected NUMBER_VALUE in backInit()');
        
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



    toJsCode()
    {
        return this.inputs[0].connected
             ? '(' + this.inputs[0].connectedOutput.toJsCode() + ')'
             : this.paramValue.value.toJsCode();
    }



    toJsFunction(nTab = 0)
    {
        let pos = TAB.repeat(nTab);


        const connectedOutside = this.inputs.find(i => 
               i.connected 
            && i.connectedOutput.node );


        let js = 'function ' + this.name + '(';
        
        // js += 
        //     this.inputs[0].connected
        //     ? this.inputs[0].connectedOutput.toJsCode()
        //     : this.paramValue.value.toJsCode();
        
        js += ')';


        js += '\n' + pos + '{';

        
        js += '\n' + pos + TAB + 'return ';
        
        js += 
            this.inputs[0].connected
            ? this.inputs[0].connectedOutput.toJsCode()
            : this.paramValue.value.toJsCode();

        js += ';'


        js += '\n' + pos + '}';

        return js;
    }
}