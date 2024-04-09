class   OpNumberBias
extends OperatorBase
{
    paramMin;
    paramMax;
    paramBias;
    paramSpread;



    constructor()
    {
        super(NUMBER_BIAS, 'bias', 'bias', iconNumberBias);

        this.canDisable  = true;
        this.iconOffsetY = -1;


        this.addInput (new Input ([NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramMin    = new NumberParam('min',    'min',    true, true, true,   0));
        this.addParam(this.paramMax    = new NumberParam('max',    'max',    true, true, true, 100));
        this.addParam(this.paramBias   = new NumberParam('bias',   'bias',   true, true, true, 0, -100, 100));
        this.addParam(this.paramSpread = new NumberParam('spread', 'spread', true, true, true, 0, -100, 100));

        
        this.paramBias  .controls[0].suffix = '%';
        this.paramSpread.controls[0].suffix = '%';
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

        request.push(...this.node.paramMin   .genRequest(gen));
        request.push(...this.node.paramMax   .genRequest(gen));
        request.push(...this.node.paramBias  .genRequest(gen));
        request.push(...this.node.paramSpread.genRequest(gen));

        
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
        this.paramMin   .enableControlText(true, this.paramMin   .isUnknown());
        this.paramMax   .enableControlText(true, this.paramMax   .isUnknown());
        this.paramBias  .enableControlText(true, this.paramBias  .isUnknown());
        this.paramSpread.enableControlText(true, this.paramSpread.isUnknown());

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
    
    
    
    // toJsCode(gen)
    // {
    //     return this.inputs[0].connected
    //          ? 'Math.min(Math.max(' 
    //                 + this.paramMin.toJsCode(gen) + ', ' + this.inputs[0].connectedOutput.toJsCode(gen) + '), ' 
    //                 + this.paramMax.toJsCode(gen) + ')'
    //          : 'Number.NaN';
    // }
}