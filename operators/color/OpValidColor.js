class   OpValidColor
extends OpColorBase
{
    paramMethod;

    corrections = [];


    colorBack;



    constructor()
    {
        super(VALID_COLOR, 'valid', 'valid', iconValidColor, true);

        // this.subscription = true;
        this.canDisable   = true;
        this.slow         = true;
        this.iconOffsetY  = -1;

        
        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE, LIST_VALUE]));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));

        this.alwaysSaveParams = true;

        
        this.addParam(this.paramMethod = new SelectParam('method', '', false, true, true, ['clip sRGB', 'clip chroma', 'find closest'], 1));


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


        const [request, ignore] = this.node.genRequestStart(gen, 0);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));


        request.push(...this.node.paramMethod.genRequest(gen));


        const cached = 
            (input.connected
             ?  input.node.valid
             : !dataColorIsNaN(this.node._color))
            || !this.node.enabled;

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
        const value = values[paramIds.findIndex(id => id == 'value')];
        const type  = values[paramIds.findIndex(id => id == 'type' )];

        this._color = 
                value
            && !isListValueType(value.type)
            ? value.toDataColor()
            : dataColor_NaN;

        this.rgbaBack = value.toRgba();
        

        if (type) 
            this.headerOutputs[0].types = [type.value];


        this.initCorrections(this._color[0]);
        this.endProgress();


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        super.updateHeader();

        const colors = this.getHeaderColors();
        updateColorHeader(this, colors);

        this._warningOverlay.style.height = this.measureData.headerOffset.height;
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();

        if (this.isUnknown())
            colors.text = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
                
        return colors;
    }



    initCorrections(colorSpace)
    {
        if (colorSpace == '')
            return;

        this.corrections = getColorCorrections(colorSpace);
    }



    updateCorrections()
    {
        this.updateColorSpace();
    }



    updateColorSpace()
    {
        if (dataColorIsValid(this._color))
            this.initCorrections(this._color[0]);
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
        if (_node._color != undefined)
        {
            this._color = parseColorValue(_node._color)[0].toDataColor();
            this.valid = true;
        }

        if (!dataColorIsValid(this._color))
            this.initProgress();

        super.loadParams(_node, pasting);
    }
}