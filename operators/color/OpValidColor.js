class   OpValidColor
extends OpColorBase
{
    paramQuality;

    corrections = [];


    colorBack;



    constructor()
    {
        super(VALID_COLOR, 'valid', 'valid', iconValidColor, true);

        this.canDisable  = true;
        this.slow        = true;
        this.iconOffsetY = -1;

        
        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput(new Input([...COLOR_TYPES, LIST_VALUE]));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));

        this.alwaysSaveParams = true;

        
        this.addParam(this.paramQuality = new SelectParam('quality', '', false, true, true, ['clip sRGB', 'clip chroma', 'find closest'], 1));


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


        request.push(...this.node.paramQuality.genRequest(gen));


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
            && !isListType(value.type)
            ? value.toDataColor()
            : dataColor_NaN;

        if (type) 
            this.outputs[0].types = [type.value];


        this.initCorrections(this._color[0]);
        this.endProgress();


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        super.updateHeader();

        const colors = this.getHeaderColors();
        updateColorHeader(this, colors);
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();
        const type   = this.outputs[0].types[0];

        if (this.isUnknown())
        {
            colors.text = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
            colors.wire = darkMode ? hex2rgb('888f') : hex2rgb('aaaf');
        }
                
        colors.output = rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = rgbFromType(type, true);

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