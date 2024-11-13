class   OpColorContrast
extends OpColorBase
{
    paramStandard;
    paramContrast;

    colorBack;


    labelColor = [0, 0, 0];

    _rgbText   = [0, 0, 0];
    _rgbBack   = [0, 0, 0];



    constructor()
    {
        super(COLOR_CONTRAST, 'contrast', 'contrast', iconWebContrast);


        this.showIcon = false;
        

        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));
        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));

        // this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));

        // this.outputs[0].forceOutputColor = true;


        this.addParam(this.paramContrast = new NumberParam('contrast', '', false, false, true, 0));
        this.addParam(this.paramStandard = new OptionParam('standard', '', false, true,  true, ['WCAG 2', 'APCA'], 1));
      
        this.paramContrast.isNodeValue = true;
        
        this.paramContrast.controls[0].thinMinus     = true;
        this.paramContrast.controls[0].showExtRanges = false;


        this.paramContrast.getTooltip = () => 
            settings.showTooltipColorContrast ? 
            (this.paramStandard.value.value == 1 ? ttWcag3 : ttWcag2) 
            : null;

        //this.paramStandard.getTooltip = () => null;
        this.paramStandard.reverseMenu = true;

        
        this.header.connectionPadding = 12.5;
    }



    genRequest(gen)
    {
        // 'this' is the node

        if (gen.passedNodes.includes(this))
        {
            return [
                this.type, 
                this.id, 
                this.name];
        }


        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

        
        const input0 = this.inputs[0];
        const input1 = this.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, 0, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, 1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        request.push(...this.paramStandard.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        consoleAssert(
            paramIds.length == values.length,
            'paramIds.length must equal values.length');

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const colText  = values[paramIds.findIndex(id => id == 'text'    )];
        const colBack  = values[paramIds.findIndex(id => id == 'back'    )];
        const standard = values[paramIds.findIndex(id => id == 'standard')];
        const contrast = values[paramIds.findIndex(id => id == 'contrast')];

        consoleAssert(isValid(colText), 'colText is not valid');
        consoleAssert(isValid(colBack), 'colBack is not valid');

        consoleAssert(colText.type == COLOR_VALUE, 'colText.type = ' + colText.type);
        consoleAssert(colBack.type == COLOR_VALUE, 'colBack.type = ' + colBack.type);


        this.labelColor = 
            colText.isValid()
            ? colText.toRgb()
            : getTextColorFromBackColor(colBack);

        this._color = colBack.toDataColor();


        this._rgbText = colText.toRgb();
        this._rgbBack = colBack.toRgb();

        if (deltaE(this._rgbText, this._rgbBack) <= 0.1)
            this._rgbText = darkMode ? [0, 0, 0, 0.2] : [1, 1, 1, 0.2];


        if (   standard
            && contrast)
        {
            if (standard.value == 0)
            {
                let rating = getContrastRating2(contrast.value);

                if (rating != '')
                    rating = '&nbsp;&nbsp;' + rating;

                this.paramContrast.controls[0].min        = 
                this.paramContrast.controls[0].displayMin = 0;

                this.paramContrast.controls[0].max        = 
                this.paramContrast.controls[0].displayMax = 21;

                this.paramContrast.controls[0].setDecimals(2);
                this.paramContrast.controls[0].setSuffix(rating);

                this.paramContrast.controls[0].displayAbsolute = false;
            }
            else
            {
                this.paramContrast.controls[0].min        = -108;
                this.paramContrast.controls[0].max        =  106;
                
                this.paramContrast.controls[0].displayMin = -105;
                this.paramContrast.controls[0].displayMax =  105;

                this.paramContrast.controls[0].displayAbsolute = true;

                this.paramContrast.controls[0].setDecimals(1);
                this.paramContrast.controls[0].setSuffix('<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -9px; left: 2px;">c</span>');

                this.paramContrast.controls[0].setValue(contrast.value, contrast.decimals, false, false);
            }


            if (   this.inputs[0].connected
                && this.inputs[1].connected)
            {
                const rgb0 = colText.toRgb();
                const rgb1 = colBack.toRgb();

                if (  !rgbIsOk(rgb0)
                    && rgbIsOk(rgb1))
                {
                    this.warningStyle     = rgb2style_a(invalid2validRgb(rgb0), 0.3);
                    this.forceShowWarning = true;
                }
                else if (rgbIsOk(rgb0)
                     && !rgbIsOk(rgb1))
                {
                    this.warningStyle     = getDefaultWarningStyle(rgb1);
                    this.forceShowWarning = true;
                }
                else
                    this.forceShowWarning = false;
            }
            else
            {
                this.forceShowWarning = false;
            }
        }
    }



    updateParams()
    {
        this.paramContrast.enableControlText(false, this.isUnknown());
        this.paramStandard.enableControlText(true);

        this.setRanges(this.paramStandard.value);

        this.updateParamControls();
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();

        if (!rgbIsNaN(this._rgbText))
            colors.text = this._rgbText;

        return colors;
    }



    getInputWireColor()
    {
        if (!rgbIsNaN(this._rgbText))
            return this._rgbText;
        else
            return super.getInputWireColor();
    }



    getHeaderOutputColor()
    {
        if (!rgbIsNaN(this._rgbText))
            return this._rgbText;
        else
            return super.getHeaderOutputColor();
    }



    getOutputWireColor()
    {
        // if (!dataColorIsNaN(this._color))
        //     return dataColor2rgb(this._color);
        if (!rgbIsNaN(this._rgbText))
            return this._rgbText;
        else
            return super.getOutputWireColor();
    }



    updateHeader()
    {
        super.updateHeader();

        
        const colors = this.getHeaderColors();
        
        if (this.isUnknown())
            colors.text = darkMode ? hex2rgb('fff8') : hex2rgb('0008');


        updateColorHeader(this, colors);
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();

        const colors = this.getHeaderColors();

        if (   this.inputs[0].connected 
            && this.inputs[1].connected) 
        {
            this.label.style.color = rgb2style(this.labelColor);
        }
        else if (this.inputs[0].connected) 
        {
            this.label.style.color = rgb2style(this.labelColor);
        }
        else if (this.inputs[1].connected) 
        {
            this.label.style.color = rgba2style(colors.text);
        }
        else                               
        {
            this.label.style.color = darkMode ? 'white' : 'black';
        }
    }
}
