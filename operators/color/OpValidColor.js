class   OpValidColor
extends OpColorBase
{
    paramQuality;

    corrections = [];

    

    constructor()
    {
        super(VALID_COLOR, 'valid', 'valid', iconValidColor, true);

        this.canDisable  = true;
        this.slow        = true;
        this.iconOffsetY = -1;

        
        this.addInput(new Input(COLOR_TYPES));
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
        const col = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
            col
            ? col.toDataColor()
            : dataColor_NaN;


        this.initCorrections(this._color[0]);
        this.endNodeProgress();


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    // updateHeader()
    // {
    //     super.updateHeader();

    //     const colors = this.getHeaderColors();

    //     // this.progressBar.style.background = 
    //     //     !rgbIsNaN(colors.back) 
    //     //     ? rgb2style_a(colors.text, 0.5) 
    //     //     : 'var(--figma-color-bg-brand)';
    // }



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