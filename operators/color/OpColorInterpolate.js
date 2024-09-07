class   OpColorInterpolate
extends OpColorBase
{
    paramSpace;
    paramGamma;
    paramAmount;
    paramDegree;


    colorBack;



    constructor()
    {
        super(COLOR_INTERPOLATE, 'inter', 'interpolate', iconColorInterpolate);

        this.iconOffsetY = -3;

        
        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addNewInput();
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.addParam(this.paramSpace  = new SelectParam('space',  '',       false, true, true, ColorSpaces.map(s => s[1]), 1));
        this.addParam(this.paramGamma  = new NumberParam('gamma',  'gamma',  true,  true, true, 1, 0.01, 4, 2));
        this.addParam(this.paramAmount = new NumberParam('amount', '',       false, true, true, 50, 0, 100, 0));
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
        const value = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
               value 
            && value.type 
            && value.type == COLOR_VALUE
            ? value.toDataColor()
            : dataColor_NaN;

        this.rgbaBack = value.toRgba();

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        super.updateHeader();
        
        const colors = this.getHeaderColors();
        // updateColorHeader(this, colors);

        
        const inputs = this.headerInputs.filter(i => i.connected);


        if (   this.isUnknown()
            ||    !rgbaIsNaN  (colors.back)
               && !rgbaIsValid(colors.back)
            || inputs.length == 0)
        {
            updateFillHeader(this, colors, false);

            if (   !rgbaIsNaN  (colors.back)
                && !rgbaIsValid(colors.back))
            {
                this._warningOverlay.style.height  = this.measureData.headerOffset.height;
                this._warningOverlay.style.display = 'block';
            }

            return;
        }
        else
            this._warningOverlay.style.display = 'none';

        
        if (    this.isUnknown()
            || !inputs.some(value => value.isValid()))
            this.checkers.style.display = 'none';

        else
            updateHeaderCheckers(this, colors, true);
    }
}