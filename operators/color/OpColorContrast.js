class   OpColorContrast
extends OpColorBase
{
    paramStandard;
    paramValue;

    labelColor = [0, 0, 0];


    constructor()
    {
        super(COLOR_CONTRAST, 'contrast', 80);


        this.addInput(new Input(COLOR_TYPES));
        this.addInput(new Input(COLOR_TYPES));


        this.addParam(this.paramValue    = new NumberParam('value',    '', false, false, true, 0, 0));
        this.addParam(this.paramStandard = new SelectParam('standard', '', false, true,  true, ['WCAG 2', 'WCAG 3'], 1));
      

        this.paramValue.enableControlText(false);


        createTooltip(ttWcag2);
        createTooltip(ttWcag3);

        createTooltipSrc(
            this.paramValue.control, 
            () => this.paramStandard.value == 1 ? ttWcag3 : ttWcag2);


        this.header.connectionPadding = 12.5;
    }



    getShowTooltip()
    {
        return this.paramStandard.value == 1
               ? ttWcag3
               : ttWcag2;
    }



    genRequest(gen)
    {
        // 'this' is the node

        if (!isEmpty(this.requestCache))
            return this.requestCache;


        gen.scope.push({
            nodeId:  this.id, 
            paramId: '' });



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



    updateValues(updateParamId, paramIds, values)
    {
        console.assert(
            paramIds.length == values.length,
            'paramIds.length must equal values.length');

        const colText = values[paramIds.findIndex(id => id == 'text')];
        const colBack = values[paramIds.findIndex(id => id == 'back')];

        console.assert(colText.type == COLOR_VALUE, 'colText.type = ' + colText.type);
        console.assert(colBack.type == COLOR_VALUE, 'colBack.type = ' + colBack.type);

        this.labelColor = 
            colText.isValid()
            ? colText.toRgb()
            : [0, 0, 0];

        this._color = colBack.toDataColor();


        super.updateValues(updateParamId, paramIds, values);


        const value = this.paramValue.value;


        if (this.paramStandard.value == 0)
        {
            let rating = getContrastRating2(value);

            if (rating != '')
                rating = '&nbsp;&nbsp;' + rating;

            this.paramValue.control.min        = 
            this.paramValue.control.displayMin = 0;

            this.paramValue.control.max        = 
            this.paramValue.control.displayMax = 21;

            this.paramValue.control.setDecimals(2);
            this.paramValue.control.setSuffix(rating);
        }
        else
        {
            this.paramValue.control.min        = 
            this.paramValue.control.displayMin = 0;

            this.paramValue.control.max        = 
            this.paramValue.control.displayMax = 105;

            this.paramValue.control.setDecimals(1);
            this.paramValue.control.setSuffix('<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -9px; left: 2px;">c</span>');

            this.paramValue.control.setValue(Math.abs(value), false, false);
        }


        if (   this.inputs[0].connected
            && this.inputs[1].connected)
        {
            const rgb0 = colText.toRgb();
            const rgb1 = colBack.toRgb();

            if (   (    rgbIsNaN  (rgb0)
                    || !rgbIsValid(rgb0))
                && !rgbIsNaN  (rgb1)
                &&  rgbIsValid(rgb1))
            {
                this.warningStyle     = rgb2style_a(invalid2validRgb(rgb0), 0.3);
                this.forceShowWarning = true;
            }
            else if (!rgbIsNaN  (rgb0)
                  &&  rgbIsValid(rgb0)
                  && (    rgbIsNaN  (rgb1)
                      || !rgbIsValid(rgb1)))
            {
                this.warningStyle     = this.getDefaultWarningStyle(rgb1);
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



    updateNode()
    {
        this.setRanges();
        
        super.updateNode();
    }



    setRanges()
    {
        if (isDarkMode())
        {
            if (this.paramStandard.value == 0)
                this.paramValue.control.ranges = [
                    new NumberControlRange(0  /21,  3  /21, 'rgba(255, 112,  0, 0.2 )', 0.8),
                    new NumberControlRange(3  /21,  4.5/21, 'rgba(255, 255,  0, 0.27)', 0.8),
                    new NumberControlRange(4.5/21,  7  /21, 'rgba(64,  220, 64, 0.27)', 0.8),
                    new NumberControlRange(7  /21, 21  /21, 'transparent') ];

            else
                this.paramValue.control.ranges = [
                    new NumberControlRange( 0/105,  15/105, 'rgba(255,  64,  96, 0.2)', 0.8),
                    new NumberControlRange(15/105,  30/105, 'rgba(255, 128,  24, 0.2)', 0.8),
                    new NumberControlRange(30/105,  45/105, 'rgba(255, 185,   0, 0.2)', 0.8),
                    new NumberControlRange(45/105,  60/105, 'rgba(255, 255,   0, 0.2)', 0.8),
                    new NumberControlRange(60/105,  75/105, 'rgba( 64, 255,  64, 0.2)', 0.8),
                    new NumberControlRange(75/105,  90/105, 'rgba(110, 128, 255, 0.4)', 0.8),
                    new NumberControlRange(90/105, 105/105, 'transparent') ];
        }
        else
        {
            if (this.paramStandard.value == 0)
                this.paramValue.control.ranges = [
                    new NumberControlRange(0  /21,  3  /21, 'rgba(255, 112,  0, 0.2 )', 0.8),
                    new NumberControlRange(3  /21,  4.5/21, 'rgba(255, 255,  0, 0.27)', 0.8),
                    new NumberControlRange(4.5/21,  7  /21, 'rgba(64,  220, 64, 0.27)', 0.8),
                    new NumberControlRange(7  /21, 21  /21, 'transparent') ];

            else
                this.paramValue.control.ranges = [
                    new NumberControlRange( 0/105,  15/105, 'rgba(255,   0,  64, 0.2 )', 0.8),
                    new NumberControlRange(15/105,  30/105, 'rgba(255, 112,   0, 0.2 )', 0.8),
                    new NumberControlRange(30/105,  45/105, 'rgba(255, 185,   0, 0.2 )', 0.8),
                    new NumberControlRange(45/105,  60/105, 'rgba(255, 255,   0, 0.2 )', 0.8),
                    new NumberControlRange(60/105,  75/105, 'rgba(64,  255,  64, 0.2 )', 0.8),
                    new NumberControlRange(75/105,  90/105, 'rgba(0,     0, 255, 0.07)', 0.8),
                    new NumberControlRange(90/105, 105/105, 'transparent') ];
        }

        this.paramValue.control.update();
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();


        if (   this.inputs[0].connected 
            && this.inputs[1].connected)
            colors.textStyle = rgb2style(this.labelColor);
        else if (this.inputs[1].connected)
            colors.textStyle = rgba2style(colors.text);
        else 
            colors.textStyle = 'black';


        return colors;
    }
}