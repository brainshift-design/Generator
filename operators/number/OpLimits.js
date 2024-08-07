class   OpLimits
extends OperatorBase
{
    paramMin;
    paramMax;



    constructor()
    {
        super(NUMBER_LIMITS, 'limits', 'limits', iconLimits);

        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.addInput (new Input ([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramMin = new NumberParam('min', 'min', true, true, true,   0));
        this.addParam(this.paramMax = new NumberParam('max', 'max', true, true, true, 100));

        this.paramMin.divider = 0.42;
        this.paramMax.divider = 0.42;
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


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramMin.genRequest(gen));
        request.push(...this.node.paramMax.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        //this.paramValue.enableControlText(false, this.isUnknown());
        this.paramMin  .enableControlText(true);
        this.paramMax  .enableControlText(true);

        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text  = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const gray =
               this.active
            && this.outputs[0].types[0] == LIST_VALUE;

        colors.output  = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.outWire = rgbFromType(type, true);

        return colors;
    }



    toJsCode(gen)
    {
        return this.inputs[0].connected
             ? 'Math.min(Math.max(' 
                    + this.paramMin.toJsCode(gen) + ', ' + this.inputs[0].connectedOutput.toJsCode(gen) + '), ' 
                    + this.paramMax.toJsCode(gen) + ')'
             : 'Number.NaN';
    }
}