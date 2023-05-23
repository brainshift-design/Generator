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
const rgb3light2 = [255/255, 112/255,   0/255];
const rgb3light3 = [220/255, 150/255,   0/255];
const rgb3light4 = [210/255, 205/255,   0/255];
const rgb3light5 = [ 30/255, 220/255,  30/255];
const rgb3light6 = [128/255, 128/255, 255/255];
const rgb3light7 = [255/255, 255/255, 255/255];



class   OpColorContrast
extends OpColorBase
{
    paramStandard;
    paramContrast;

    labelColor = [0, 0, 0];


    _rgbText   = [0, 0, 0];
    _rgbBack   = [0, 0, 0];


    constructor()
    {
        super(COLOR_CONTRAST, 'contrast', 'contrast', '');


        this.addInput(new Input(COLOR_TYPES));
        this.addInput(new Input(COLOR_TYPES));

        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));
        //this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.addParam(this.paramContrast = new NumberParam('contrast', '', false, false, true, 0));
        this.addParam(this.paramStandard = new SelectParam('standard', '', false, true,  true, ['WCAG 2', 'APCA'], 1));
      
        this.paramContrast.controls[0].thinMinus     = true;
        this.paramContrast.controls[0].showExtRanges = false;


        this.paramStandard.getTooltip = () => null;

        this.paramContrast.getTooltip = () => 
            settings.showTooltipColorContrast ? 
            (this.paramStandard.value.value == 1 ? ttWcag3 : ttWcag2) 
            : null;


        this.header.connectionPadding = 12.5;
    }



    output_genRequest(gen)
    {
        // console.trace();
        if (gen.passedNodes.includes(this.node))
        {
            return [
                this.node.type, 
                this.node.id, 
                this.node.name];
        }


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

                this.paramContrast.controls[0].setValue(contrast.value, false, false);
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
        this.paramContrast.enableControlText(false);
        this.paramStandard.enableControlText(true);

        this.setRanges(this.paramStandard.value);

        this.updateParamControls();
    }



    updateHeader()
    {
        super.updateHeader();


        this.outputs[0].lightColor =
        this.outputs[0]. darkColor =
        this.outputs[0]. wireColor = this._rgbText;

        this.outputs[1].lightColor =
        this.outputs[1]. darkColor =
        this.outputs[1]. wireColor = this._rgbBack;
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();

        const colors = this.getHeaderColors();

          if (   this.inputs[0].connected 
              && this.inputs[1].connected) this.label.style.color = rgb2style(this.labelColor);
        else if (this.inputs[1].connected) this.label.style.color = rgba2style(colors.text);
        else                               this.label.style.color = darkMode ? 'white' : 'black';
    }



    setRanges(standard)
    {
        if (standard.value == 0)
        {
            const contrast = Math.abs(this.paramContrast.value.value) / 21;

            const is1 = contrast > 0  /21 && contrast <=  3  /21;
            const is2 = contrast > 3  /21 && contrast <=  4.5/21;
            const is3 = contrast > 4.5/21 && contrast <=  7  /21;
           
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
        else
        {
            const contrast = Math.abs(this.paramContrast.value.value) / 100;

            const is1 = contrast >=  0/100 && contrast <=  15/100;
            const is2 = contrast >  15/100 && contrast <=  30/100;
            const is3 = contrast >  30/100 && contrast <=  45/100;
            const is4 = contrast >  45/100 && contrast <=  60/100;
            const is5 = contrast >  60/100 && contrast <=  75/100;
            const is6 = contrast >  75/100 && contrast <=  90/100;
            const is7 = contrast >  90/100;

            if (darkMode)
            {
                this.paramContrast.controls[0].ranges = [ 
                    new NumberControlRange( 0/105,  15/105, rgb2style_a(rgb3dark1, is1 ? 1 : 0.2), 0.8),
                    new NumberControlRange(15/105,  30/105, rgb2style_a(rgb3dark2, is2 ? 1 : 0.2), 0.8),
                    new NumberControlRange(30/105,  45/105, rgb2style_a(rgb3dark3, is3 ? 1 : 0.2), 0.8),
                    new NumberControlRange(45/105,  60/105, rgb2style_a(rgb3dark4, is4 ? 1 : 0.2), 0.8),
                    new NumberControlRange(60/105,  75/105, rgb2style_a(rgb3dark5, is5 ? 1 : 0.2), 0.8),
                    new NumberControlRange(75/105,  90/105, rgb2style_a(rgb3dark6, is6 ? 1 : 0.4), 0.8),
                    new NumberControlRange(90/105, 105/105, rgb2style_a(rgb3dark7, is7 ? 1 : 0  ), 0.8) ];
            }
            else
            {
                this.paramContrast.controls[0].ranges = [
                    new NumberControlRange( 0/105,  15/105, rgb2style_a(rgb3light1, is1 ? 1 : 0.2), 0.8),
                    new NumberControlRange(15/105,  30/105, rgb2style_a(rgb3light2, is2 ? 1 : 0.2), 0.8),
                    new NumberControlRange(30/105,  45/105, rgb2style_a(rgb3light3, is3 ? 1 : 0.2), 0.8),
                    new NumberControlRange(45/105,  60/105, rgb2style_a(rgb3light4, is4 ? 1 : 0.2), 0.8),
                    new NumberControlRange(60/105,  75/105, rgb2style_a(rgb3light5, is5 ? 1 : 0.2), 0.8),
                    new NumberControlRange(75/105,  90/105, rgb2style_a(rgb3light6, is6 ? 1 : 0.1), 0.8),
                    new NumberControlRange(90/105, 105/105, 'transparent') ];
            }
        }
    }
}