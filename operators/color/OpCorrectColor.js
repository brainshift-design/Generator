class   OpCorrectColor
extends OpColorBase
{
    paramOrder;

    param1;
    param2;
    param3;

    corrections = [];


    colorBack;


    
    constructor()
    {
        super(CORRECT_COLOR, 'correct', 'correct', iconCorrectColor, true);

        this.subscription     = true;
        this.slow             = true;
        this.canDisable       = true;
        this.subscription     = true;
        this.iconOffsetY      = -1;
        this.alwaysSaveParams = true;

        
        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput(new Input([COLOR_VALUE]));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.addParam(this.paramOrder = new SelectParam('order', '', false, true, true, [0, 1, 2, 3, 4, 5], 2));
        
        this.paramOrder.addEventListener('change', () => this.updateCorrections());
        
        
        this.addParam(this.param1 = new NumberParam('margin1', '', true, true, true, 0));
        this.addParam(this.param2 = new NumberParam('margin2', '', true, true, true, 0));
        this.addParam(this.param3 = new NumberParam('margin3', '', true, true, true, 0));


        this.initCorrections('');
        this.updateCorrections();


        this.header.connectionPadding = 18;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const hasInputs =
               this.node.paramOrder.input.connected
            || this.node.param1    .input.connected
            || this.node.param2    .input.connected
            || this.node.param3    .input.connected;

        const options = (hasInputs ? 1 : 0) << 20;


        const [request, ignore] = this.node.genRequestStart(gen, options);
        if (ignore) return request;


        const input = this.node.inputs[0];

        request.push(input.connected ? 1 : 0);


        if (input.connected)
            request.push(...pushInputOrParam(input, gen));


        const cached = 
               (input.connected
                ?    input.node.valid
                  //|| !dataColorIsNaN(this.node._color)
                : !dataColorIsNaN(this.node._color))
            || !this.node.enabled;


        const paramIds = [];

        for (const param of this.node.params)
            if (      param.input 
                   && param.input.connected
                || cached)
                paramIds.push(param.id);

        paramIds.push('value');

        request.push(paramIds.join(','));

        
        if (this.node.paramOrder.input.connected || cached) request.push(...this.node.paramOrder.genRequest(gen));
        if (this.node.param1    .input.connected || cached) request.push(...this.node.param1    .genRequest(gen));
        if (this.node.param2    .input.connected || cached) request.push(...this.node.param2    .genRequest(gen));
        if (this.node.param3    .input.connected || cached) request.push(...this.node.param3    .genRequest(gen));

 
        request.push(COLOR_VALUE, (
            cached
            ? ColorValue.fromDataColor(this.node._color)
            : ColorValue.NaN).toString()); // value


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const col = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
            col
            ? col.toDataColor()
            : dataColor_NaN;


        this.initCorrections(this._color[0]);
        this.endProgress();


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        //this.updateCorrectionNames();
    }



    updateParams()
    {
        this.paramOrder.enableControlText(false, this.isUnknown());
        this.param1    .enableControlText(false, this.isUnknown());
        this.param2    .enableControlText(false, this.isUnknown());
        this.param3    .enableControlText(false, this.isUnknown());

        this.updateCorrections();

        this.updateParamControls();
    }



    updateHeader()
    {
        super.updateHeader();

        const colors = this.getHeaderColors();

        this.progressBar.style.background = 
            !rgbIsNaN(colors.back) 
            ? rgb2style_a(colors.text, 0.5) 
            : 'var(--figma-color-bg-brand)';


        updateColorHeader(this, colors);
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();

        if (this.isUnknown())
        {
            colors.text = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
            colors.wire = darkMode ? hex2rgb('888f') : hex2rgb('aaaf');
        }

        return colors;
    }



    initCorrections(colorSpace)
    {
        if (colorSpace == '')
        {
            this.paramOrder.setValue(NumberValue.NaN);
            this.param1    .setValue(NumberValue.NaN);
            this.param2    .setValue(NumberValue.NaN);
            this.param3    .setValue(NumberValue.NaN);

            return;
        }


        switch (colorSpace)
        {
        case 'hex':
        case 'rgb':    this.paramOrder.setOptions(makeOptions('RGB')); break;
        case 'hsv':    this.paramOrder.setOptions(makeOptions('HSV')); break;
        case 'hsl':    this.paramOrder.setOptions(makeOptions('HSL')); break;
        case 'hclok':
        case 'hclab':
        case 'hcluv':  this.paramOrder.setOptions(makeOptions('HCL')); break;
        case 'oklab':  
        case 'lab':    this.paramOrder.setOptions(makeOptions('Lab')); break;
        case 'luv':    this.paramOrder.setOptions(makeOptions('Luv')); break;
        }


        this.corrections = getColorCorrections(colorSpace);
    }



    updateCorrections()
    {
        this.updateColorSpace();

        
        if (this.paramOrder.value.isValid())
        {
            const [i1, i2, i3] = getCorrectionsInOrder(this.paramOrder.value.value);

            this.updateMargin(this.param1, this.corrections[i1]);
            this.updateMargin(this.param2, this.corrections[i2]);
            this.updateMargin(this.param3, this.corrections[i3]);

            this.param1.showName = true;
            this.param2.showName = true;
            this.param3.showName = true;
        }
        else
        {
            this.resetMargin(this.param1);
            this.resetMargin(this.param2);
            this.resetMargin(this.param3);

            this.param1.showName = false;
            this.param2.showName = false;
            this.param3.showName = false;
        }
    }



    updateCorrectionNames()
    {
        this.param1.controls[0].showName = this.param1.value.isValid();
        this.param2.controls[0].showName = this.param2.value.isValid();
        this.param3.controls[0].showName = this.param3.value.isValid();
    }



    updateColorSpace()
    {
        if (dataColorIsValid(this._color))
            this.initCorrections(this._color[0]);
    }



    updateMargin(margin, correction)
    {
        const correctionName = '<span style="position: relative; top: -1px; font-weight: 200;">±</span>&thinsp;' + correction.name;

        margin.setName(correctionName, false);
        margin.controls[0].name = correctionName;

        margin.controls[0].setMin(0);
        margin.controls[0].setMax(correction.max);
    }



    resetMargin(margin)
    {
        margin.setName('', false);
        margin.controls[0].name = '<span style="position: relative; top: -1px; font-weight: 200;">±</span>';
        margin.controls[0].setMin(0);
        margin.controls[0].setMax(Number.MAX_SAFE_INTEGER);
    }



    isConnected()
    {
        return this.inputs[0].connected;
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"_color": "' + ColorValue.fromDataColor(this._color).toString() + '"';
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);

        if (_node._color != undefined)
        {
            this._color = parseColorValue(_node._color)[0].toDataColor();
            this.valid = true;
        }

        if (!dataColorIsValid(this._color))
            this.initProgress();
    }
}



function makeOptions(c)
{
    return ([
        c[0]+', '+c[1]+', '+c[2], 
        c[1]+', '+c[0]+', '+c[2], 
        c[1]+', '+c[2]+', '+c[0], 
        c[0]+', '+c[2]+', '+c[1], 
        c[2]+', '+c[0]+', '+c[1], 
        c[2]+', '+c[1]+', '+c[0]]);
}
