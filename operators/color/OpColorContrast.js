const rgb2dark1  = [255/255,  64/255,  96/255];
const rgb2dark2  = [255/255, 255/255,  0/255];
const rgb2dark3  = [ 64/255, 220/255, 64/255];

const rgb2light1 = [255/255,  50/255, 50/255];
const rgb2light2 = [200/255, 195/255,  0/255];
const rgb2light3 = [ 64/255, 220/255, 64/255];


const rgb3dark1  = [255/255,  64/255,  96/255];
const rgb3dark2  = [255/255, 128/255,  24/255];
const rgb3dark3  = [255/255, 185/255,   0/255];
const rgb3dark4  = [255/255, 255/255,   0/255];
const rgb3dark5  = [ 64/255, 255/255,  64/255];
const rgb3dark6  = [  0/255, 164/255, 255/255];
const rgb3dark7  = [230/255, 230/255, 230/255];

const rgb3light1 = [255/255,   0/255,  64/255];
const rgb3light2 = [255/255, 128/255,   0/255];
const rgb3light3 = [250/255, 170/255,   0/255];
const rgb3light4 = [205/255, 175/255,   0/255];
const rgb3light5 = [ 30/255, 220/255,  30/255];
const rgb3light6 = [128/255, 128/255, 255/255];
const rgb3light7 = [255/255, 255/255, 255/255];



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

        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.addParam(this.paramContrast = new NumberParam('contrast', '', false, false, true, 0));
        this.addParam(this.paramStandard = new SelectParam('standard', '', false, true,  true, ['WCAG 2', 'APCA'], 1));
      
        this.paramContrast.isNodeValue = true;
        
        this.paramContrast.controls[0].thinMinus     = true;
        this.paramContrast.controls[0].showExtRanges = false;


        this.paramContrast.getTooltip = () => 
            settings.showTooltipColorContrast ? 
            (this.paramStandard.value.value == 1 ? ttWcag3 : ttWcag2) 
            : null;

        this.paramStandard.getTooltip = () => null;
        this.paramStandard.reverseMenu = true;

        
        this.header.connectionPadding = 12.5;
    }



    output_genRequest(gen)
    {
        // 'this' is the output


        if (gen.passedNodes.includes(this.node))
        {
            return [
                this.node.type, 
                this.node.id, 
                this.node.name];
        }


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
        {
            colors.text    = this._rgbText;
            colors.inwire  = 
            colors.outWire = this._rgbText;
        }

        return colors;
    }



    getOutputWireColor()
    {
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
        {
            colors.text    = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
            colors.inWire  =
            colors.outWire = darkMode ? hex2rgb('888f') : hex2rgb('aaaf');
        }


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



    setRanges(standard)
    {
        if (standard.value == 0) // WCAG 2
        {
            const contrast = Math.abs(this.paramContrast.value.value) / 21;

            const is1 = !this.isUnknown() && contrast > 0  /21 && contrast <=  3  /21;
            const is2 = !this.isUnknown() && contrast > 3  /21 && contrast <=  4.5/21;
            const is3 = !this.isUnknown() && contrast > 4.5/21 && contrast <=  7  /21;
           
            if (darkMode)
            {
                this.paramContrast.controls[0].ranges = [ 
                    new NumberControlRange(0  /21,  3  /21, rgb2style_a(rgb2dark1, is1 ? 1 : 0.2 ), 0.8),
                    new NumberControlRange(3  /21,  4.5/21, rgb2style_a(rgb2dark2, is2 ? 1 : 0.27), 0.8),
                    new NumberControlRange(4.5/21,  7  /21, rgb2style_a(rgb2dark3, is3 ? 1 : 0.27), 0.8),
                    new NumberControlRange(7  /21, 21  /21, 'transparent') ];
            }
            else
            {
                this.paramContrast.controls[0].ranges = [ 
                    new NumberControlRange(0  /21,  3  /21, rgb2style_a(rgb2light1, is1 ? 1 : 0.2 ), 0.8),
                    new NumberControlRange(3  /21,  4.5/21, rgb2style_a(rgb2light2, is2 ? 1 : 0.27), 0.8),
                    new NumberControlRange(4.5/21,  7  /21, rgb2style_a(rgb2light3, is3 ? 1 : 0.27), 0.8),
                    new NumberControlRange(7  /21, 21  /21, 'transparent') ];
            }
        }
        else // APCA
        {
            const contrast = Math.abs(this.paramContrast.value.value) / 100;

            const is1 = !this.isUnknown() && contrast >=  0/100 && contrast <=  15/100; // red
            const is2 = !this.isUnknown() && contrast >  15/100 && contrast <=  30/100; // amber
            const is3 = !this.isUnknown() && contrast >  30/100 && contrast <=  45/100; // orange
            const is4 = !this.isUnknown() && contrast >  45/100 && contrast <=  60/100; // yellow
            const is5 = !this.isUnknown() && contrast >  60/100 && contrast <=  75/100; // green
            const is6 = !this.isUnknown() && contrast >  75/100 && contrast <=  90/100; // blue
            const is7 = !this.isUnknown() && contrast >  90/100;                        // white

            if (darkMode)
            {
                this.paramContrast.controls[0].ranges = [ 
                    new NumberControlRange( 0/105,  15/105, rgb2style_a(rgb3dark1, is1 ? 1 : 0.2), 0.8),   // red
                    new NumberControlRange(15/105,  30/105, rgb2style_a(rgb3dark2, is2 ? 1 : 0.2), 0.8),   // amber
                    new NumberControlRange(30/105,  45/105, rgb2style_a(rgb3dark3, is3 ? 1 : 0.2), 0.8),   // orange
                    new NumberControlRange(45/105,  60/105, rgb2style_a(rgb3dark4, is4 ? 1 : 0.2), 0.8),   // yellow
                    new NumberControlRange(60/105,  75/105, rgb2style_a(rgb3dark5, is5 ? 1 : 0.2), 0.8),   // green
                    new NumberControlRange(75/105,  90/105, rgb2style_a(rgb3dark6, is6 ? 1 : 0.4), 0.8),   // blue
                    new NumberControlRange(90/105, 105/105, rgb2style_a(rgb3dark7, is7 ? 1 : 0  ), 0.8) ]; // white
            }
            else
            {
                this.paramContrast.controls[0].ranges = [
                    new NumberControlRange( 0/105,  15/105, rgb2style_a(rgb3light1, is1 ? 1 : 0.2), 0.8),   // red
                    new NumberControlRange(15/105,  30/105, rgb2style_a(rgb3light2, is2 ? 1 : 0.2), 0.8),   // amber
                    new NumberControlRange(30/105,  45/105, rgb2style_a(rgb3light3, is3 ? 1 : 0.2), 0.8),   // orange
                    new NumberControlRange(45/105,  60/105, rgb2style_a(rgb3light4, is4 ? 1 : 0.2), 0.8),   // yellow
                    new NumberControlRange(60/105,  75/105, rgb2style_a(rgb3light5, is5 ? 1 : 0.2), 0.8),   // green
                    new NumberControlRange(75/105,  90/105, rgb2style_a(rgb3light6, is6 ? 1 : 0.1), 0.8),   // blue
                    new NumberControlRange(90/105, 105/105, rgb2style_a(rgb3light7, is7 ? 1 : 0  ), 0.8) ]; // white

                // this.divShadowLeft .style.display = 'none'; //is4 ? 'block' : 'none';
                // this.divShadowRight.style.display = 'none'; //is4 ? 'block' : 'none';
            }
        }
    }
}



// function OpColorContrast_onConnectInput(node)
// {
//     node.updateHeader();
// }



// function OpColorContrast_onDisconnectInput(node)
// {
//     node.updateHeader();
// }