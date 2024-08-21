class   OpColorInterpolate
extends OpColorBase
{
    paramSpace;
    paramAmount;
    paramGamma;


    colorBack;



    constructor()
    {
        super(COLOR_INTERPOLATE, 'inter', 'interpolate', iconColorInterpolate);

        this.iconOffsetY = -3;

        
        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));
        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));

        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.addParam(this.paramSpace  = new SelectParam('space',  '',      false, true, true, getColorSpaces().map(s => s[1]), 1));
        this.addParam(this.paramAmount = new NumberParam('amount', '',      false, true, true, 50, 0, 100, 0));
        this.addParam(this.paramGamma  = new NumberParam('gamma',  'gamma', true,  true, true, 1, 0.01, 4, 2));
      
        
        this.paramSpace.controls[0].setMin(1);
        this.paramSpace.excludeFromMenu.push(0);
        this.paramSpace.input.outputMustBeCached = true;

        
        this.paramAmount.controls[0].min = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.controls[0].max = Number.MAX_SAFE_INTEGER; // extrapolation

        this.paramAmount.controls[0].setSuffix('%', true);

        this.paramGamma.divider = 0.54;
        

        this.header.connectionPadding = 12.5;

        
        this.paramSpace.getTooltip = () => 
            settings.showTooltipColorInterpolation 
            ? ttInterpolationSpace 
            : null;
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


        request.push(...this.node.paramSpace .genRequest(gen));
        request.push(...this.node.paramAmount.genRequest(gen));
        request.push(...this.node.paramGamma .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const col = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
               col 
            && col.type 
            && col.type == COLOR_VALUE
            ? col.toDataColor()
            : dataColor_NaN;

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        super.updateHeader();
        
        const colors = this.getHeaderColors();
        updateColorHeader(this, colors);
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();

        if (this.isUnknown())
        {
            colors.text    = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
            colors.inWire  =
            colors.outWire = darkMode ? hex2rgb('888f') : hex2rgb('aaaf');
        }

        return colors;
    }
}