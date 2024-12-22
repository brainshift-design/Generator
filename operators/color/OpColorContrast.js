class   OpColorContrast
extends OpColorBase
{
    static { Operator.types[COLOR_CONTRAST] = this; }



    paramStandard;

    colorBack;


    labelColor = [0, 0, 0];

    _rgbText   = [0, 0, 0];
    _rgbBack   = [0, 0, 0];



    constructor()
    {
        super(COLOR_CONTRAST, 'contrast', 'contrast', iconWebContrast);


        this.outputValueType = ANY_VALUE;
        this.showIcon        = false;
        

        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));
        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));


        this.addParam(this.paramStandard = new OptionParam('standard', '', false, true,  true, ['WCAG 2', 'APCA'], 1));
      
        this.paramStandard.reverseMenu = true;

        
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

        else if (input0.connected) request.push(1, 0, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, 1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        request.push(...this.node.paramStandard.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        consoleAssert(
            paramIds.length == values.length,
            'paramIds.length must equal values.length');


        const type     = values[paramIds.findIndex(id => id == 'type'    )];
        const colText  = values[paramIds.findIndex(id => id == 'text'    )];
        const colBack  = values[paramIds.findIndex(id => id == 'back'    )];
        const standard = values[paramIds.findIndex(id => id == 'standard')];


        if (type)
            this.headerOutputs[0].types = [type.value];


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


        if (   standard)
        {
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


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
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



    getOutputWireColor()
    {
        return rgb_NaN;
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
