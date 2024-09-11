class   OpColorInterpolate
extends OpColorBase
{
    paramSpace;
    paramGamma;
    paramAmount;
    paramDegree;


    checkersHolder;
    checkers;
    colorBack;

    value;




    constructor()
    {
        super(COLOR_INTERPOLATE, 'inter', 'interpolate', iconColorInterpolate);

        this.variableInputs = true;
        this.iconOffsetY    = -3;

        
        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.checkersHolder = createDiv('nodeHeaderCheckersHolder');
        this.checkers       = createDiv('nodeHeaderCheckers'      );
        
        this.checkersHolder.appendChild(this.checkers);
        this.inner.insertBefore(this.checkersHolder, this.header);


        this.addNewInput();
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.addParam(this.paramAmount = new NumberParam('amount', '',       false, true, true, 50, 0, 100, 0));
        this.addParam(this.paramSpace  = new SelectParam('space',  '',       false, true, true, ColorSpaces.map(s => s[1]), 1));
        this.addParam(this.paramGamma  = new NumberParam('gamma',  'gamma',  true,  true, true, 1, 0.01, 4, 2));
        this.addParam(this.paramDegree = new SelectParam('degree', 'degree', false, true, true, ['linear', 'quadratic', 'cubic', 'cosine'], 0));

        this.paramSpace.separatorsBefore = [4, 9, 12, 15];
        this.paramSpace.markMenuPro      = subscribed() ? [] : [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        this.paramSpace.minMenuWidth     = subscribed() ? 200 : 220;
        
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



    addNewInput()
    {
        const newInput = new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]);
        
        newInput.isNew = true;


        newInput.addEventListener('connect', e => 
        {
            onVariableConnectInput(e.detail.input); 
            e.detail.input.isNew = false; 
        });
        
        
        newInput.addEventListener('disconnect', e => 
        {
            onVariableDisconnectInput(e.detail.input);
        });


        this.addInput(newInput);


        return newInput;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.node.inputs.filter(i => i.connected && !i.param);

        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));


        request.push(...this.node.paramSpace .genRequest(gen));
        request.push(...this.node.paramGamma .genRequest(gen));
        request.push(...this.node.paramAmount.genRequest(gen));
        request.push(...this.node.paramDegree.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        this.value = values[paramIds.findIndex(id => id == 'value')];
        const type = values[paramIds.findIndex(id => id == 'type' )];

        if (type) 
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        this._color = 
               this.value 
            && this.value.type 
            && this.value.type == FILL_VALUE
            ? this.value.color.toDataColor()
            : dataColor_NaN;

        this.rgbaBack = this.value.toRgba();
    }



    updateHeader()
    {
        super.updateHeader();
        
        const colors = this.getHeaderColors();

        if (this.value.isValid())
            this.checkersHolder.style.opacity = (100 - this.value.opacity.toNumber()) + '%';

        updateFillHeader(this, colors, this.value.isValid());

        this._warningOverlay.style.height = this.measureData.headerOffset.height;
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors();

        if (   !this.value
            || !this.value.opacity)
            return colors;

        
        const opacity = this.value.opacity.value;


        if (this.isUnknown())
        {
            colors.back      = darkMode ? hex2rgb('444' ) : hex2rgb('ccc' );
            colors.colorBack = darkMode ? hex2rgb('444' ) : hex2rgb('ccc' );
            colors.text      = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
        }
        else
        {
            colors.back = 
                   !rgbIsNaN(colors.back)
                && !isNaN(opacity)
                ? rgb_a(colors.back)
                : rgb_NaN;

            colors.colorBack =
                   !rgbIsNaN(colors.colorBack) 
                && !isNaN(opacity) 
                ? rgb_a(colors.colorBack)
                : rgbDocumentBody;

            colors.text = getTextColorFromBackColor(
                colors.colorBack, 
                this.rgbaBack ? this.rgbaBack[3] : 1);
        }
        

        return colors;
    }
}