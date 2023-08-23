class   OpConvertP3
extends OpColorBase
{
    paramFrom;

    colorBack;



    constructor()
    {
        super(COLOR_CONVERT_P3, 'convert', 'convert', iconConvertP3, true);

        this.subscription = true;
        this.canDisable   = true;
        this.slow         = true;
        this.iconOffsetY  = -1;

        
        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput(new Input(COLOR_TYPES));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));

        this.alwaysSaveParams = true;

        
        this.addParam(this.paramFrom = new SelectParam('from', '', false, true, true, ['sRGB ⟶ P3', 'P3 ⟶ sRGB'], 0));


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


        request.push(...this.node.paramFrom.genRequest(gen));


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

        if (this.isUnknown())
        {
            colors.text = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
            colors.wire = darkMode ? hex2rgb('888f') : hex2rgb('aaaf');
        }
                
        return colors;
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

        super.loadParams(_node, pasting);
    }
}