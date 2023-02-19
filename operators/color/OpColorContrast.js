class   OpColorContrast
extends OpColorBase
{
    paramStandard;
    paramContrast;

    labelColor = [0, 0, 0];


    constructor()
    {
        super(COLOR_CONTRAST, 'contrast');


        this.addInput(new Input(COLOR_TYPES));
        this.addInput(new Input(COLOR_TYPES));


        this.addParam(this.paramContrast = new NumberParam('contrast', '', false, false, true, 0));
        this.addParam(this.paramStandard = new SelectParam('standard', '', false, true,  true, ['WCAG 2', 'WCAG 3'], 1));
      

        createTooltip(ttWcag2);
        createTooltip(ttWcag3);
        
        this.paramStandard.getTooltip = () => null;
        this.paramContrast.getTooltip = () => this.paramStandard.value.value == 1 ? ttWcag3 : ttWcag2;


        this.header.connectionPadding = 12.5;
    }



    genRequest(gen)
    {
        // 'this' is the node

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
        console.assert(
            paramIds.length == values.length,
            'paramIds.length must equal values.length');

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const colText  = values[paramIds.findIndex(id => id == 'text'    )];
        const colBack  = values[paramIds.findIndex(id => id == 'back'    )];
        const standard = values[paramIds.findIndex(id => id == 'standard')];
        const contrast = values[paramIds.findIndex(id => id == 'contrast')];

        console.assert(isValid(colText), 'colText is not valid');
        console.assert(isValid(colBack), 'colBack is not valid');

        console.assert(colText.type == COLOR_VALUE, 'colText.type = ' + colText.type);
        console.assert(colBack.type == COLOR_VALUE, 'colBack.type = ' + colBack.type);


        this.labelColor = 
            colText.isValid()
            ? colText.toRgb()
            : getTextColorFromBackColor(colBack);

        this._color = colBack.toDataColor();


        if (   standard
            && contrast)
        {
            if (standard.value == 0)
            {
                let rating = getContrastRating2(contrast.value);

                if (rating != '')
                    rating = '&nbsp;&nbsp;' + rating;

                this.paramContrast.control.min        = 
                this.paramContrast.control.displayMin = 0;

                this.paramContrast.control.max        = 
                this.paramContrast.control.displayMax = 21;

                this.paramContrast.control.setDecimals(2);
                this.paramContrast.control.setSuffix(rating);

                this.paramContrast.control.displayAbsolute = false;
            }
            else
            {
                this.paramContrast.control.min        = -108;
                this.paramContrast.control.max        =  106;
                
                this.paramContrast.control.displayMin = -105;
                this.paramContrast.control.displayMax =  105;

                this.paramContrast.control.displayAbsolute = true;

                this.paramContrast.control.setDecimals(1);
                this.paramContrast.control.setSuffix('<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -9px; left: 2px;">c</span>');

                this.paramContrast.control.setValue(contrast.value, false, false);
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
                else if ( rgbIsOk(rgb0)
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


            this.setRanges(standard);
        }
    }



    updateParams()
    {
        this.paramStandard.enableControlText(true);
        this.paramContrast.enableControlText(false);
            
        this.updateParamControls();
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();

        const colors = this.getHeaderColors();

        // let textStyle;

          if (   this.inputs[0].connected 
              && this.inputs[1].connected) this.label.style.color = rgb2style(this.labelColor);
        else if (this.inputs[1].connected) this.label.style.color = rgba2style(colors.text);
        else                               this.label.style.color = darkMode ? 'white' : 'black';
    }



    setRanges(standard)
    {
        if (darkMode)
        {
            if (standard.value == 0)
            {
                this.paramContrast.control.ranges = [ 
                    new NumberControlRange(0  /21,  3  /21, 'rgba(255, 112,  0, 0.2 )', 0.8),
                    new NumberControlRange(3  /21,  4.5/21, 'rgba(255, 255,  0, 0.27)', 0.8),
                    new NumberControlRange(4.5/21,  7  /21, 'rgba(64,  220, 64, 0.27)', 0.8),
                    new NumberControlRange(7  /21, 21  /21, 'transparent') ];
            }
            else
            {
                this.paramContrast.control.ranges = [ 
                    new NumberControlRange( 0/105,  15/105, 'rgba(255,  64,  96, 0.2)', 0.8),
                    new NumberControlRange(15/105,  30/105, 'rgba(255, 128,  24, 0.2)', 0.8),
                    new NumberControlRange(30/105,  45/105, 'rgba(255, 185,   0, 0.2)', 0.8),
                    new NumberControlRange(45/105,  60/105, 'rgba(255, 255,   0, 0.2)', 0.8),
                    new NumberControlRange(60/105,  75/105, 'rgba( 64, 255,  64, 0.2)', 0.8),
                    new NumberControlRange(75/105,  90/105, 'rgba(110, 128, 255, 0.4)', 0.8),
                    new NumberControlRange(90/105, 105/105, 'transparent') ];
            }
        }
        else
        {
            if (standard.value == 0)
            {
                this.paramContrast.control.ranges = [ 
                    new NumberControlRange(0  /21,  3  /21, 'rgba(255, 112,  0, 0.2 )', 0.8),
                    new NumberControlRange(3  /21,  4.5/21, 'rgba(255, 255,  0, 0.27)', 0.8),
                    new NumberControlRange(4.5/21,  7  /21, 'rgba(64,  220, 64, 0.27)', 0.8),
                    new NumberControlRange(7  /21, 21  /21, 'transparent') ];
            }
            else
            {
                this.paramContrast.control.ranges = [
                    new NumberControlRange( 0/105,  15/105, 'rgba(255,   0,  64, 0.2 )', 0.8),
                    new NumberControlRange(15/105,  30/105, 'rgba(255, 112,   0, 0.2 )', 0.8),
                    new NumberControlRange(30/105,  45/105, 'rgba(255, 185,   0, 0.2 )', 0.8),
                    new NumberControlRange(45/105,  60/105, 'rgba(255, 255,   0, 0.2 )', 0.8),
                    new NumberControlRange(60/105,  75/105, 'rgba(64,  255,  64, 0.2 )', 0.8),
                    new NumberControlRange(75/105,  90/105, 'rgba(0,     0, 255, 0.07)', 0.8),
                    new NumberControlRange(90/105, 105/105, 'transparent') ];
            }
        }

        this.paramContrast.control.update();
    }



    legacyLoadParams(_node, pasting)
    {
        this.legacyLoadParamById(_node, 'contrast', '0'); 
        this.legacyLoadParamById(_node, 'standard', '1');
    }
}