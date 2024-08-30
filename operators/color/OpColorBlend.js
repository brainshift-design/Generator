class   OpColorBlend
extends OpColorBase
{
    paramMode;
    paramAmount;


    colorBack;



    constructor()
    {
        super(COLOR_BLEND, 'blend', 'blend', iconColorBlend);

        this.iconOffsetY = -1;

        
        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));
        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));

        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.addParam(this.paramMode   = new SelectParam('mode',   '',       false, true, true, BlendModes.map(bm => bm[1]), 0));
        this.addParam(this.paramAmount = new NumberParam('amount', 'amount', false, true, true, 50, 0,  100, 0));
      
        
        this.paramMode.separatorsBefore.push(1, 4, 7, 10, 12);
        this.paramMode.input.outputMustBeCached = true;

        
        this.paramAmount.controls[0].min = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.controls[0].max = Number.MAX_SAFE_INTEGER; // extrapolation

        this.paramAmount.controls[0].setSuffix('%', true);
        

        this.header.connectionPadding = 12.5;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input0 = this.node.inputs[0];
        const input1 = this.node.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        request.push(...this.node.paramMode  .genRequest(gen));
        request.push(...this.node.paramAmount.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
            value
            ? value.toDataColor()
            : dataColor_NaN;

        this.rgbaBack = value.toRgba();

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        super.updateHeader();

        const colors = this.getHeaderColors();

        updateColorHeader(this, colors);
    }
}