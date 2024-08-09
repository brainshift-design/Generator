class   OpColorScheme
extends OperatorBase
{
    paramType;
    paramSpace;



    constructor()
    {
        super(COLOR_SCHEME, 'scheme', 'scheme', iconColorScheme);

        this.subscription = true;
        this.iconOffsetY  = -1;

        
        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput (new Input ([COLOR_VALUE]));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.alwaysSaveParams = true;

        
        this.addParam(this.paramType  = new SelectParam('schemeType', '',      false, true, true, ['similar', 'similar with accent', 'less similar', 'opposite', 'opposite -', 'opposite +', 'opposite split', 'double opposite -', 'double opposite +', 'triangle', 'rectangle', 'square', 'hexagon'], 0));
        this.addParam(this.paramSpace = new SelectParam('space',      'space', false, true, true, ['HSV', 'HCL/ok'], 0));
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


        request.push(...this.node.paramType .genRequest(gen));
        request.push(...this.node.paramSpace.genRequest(gen));


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

        if (type) 
            this.headerOutputs[0].types = [type.value];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        super.updateHeader();

        // const colors = this.getHeaderColors();

        // this._warningOverlay.style.height = this.measureData.headerOffset.height;
    }



    getHeaderColors()
    {
        const colors = super.getHeaderColors();

        if (this.isUnknown())
        {
            colors.text    = darkMode ? hex2rgb('fff8') : hex2rgb('0008');
            colors.inWire  =
            colors.outWire = darkMode ? hex2rgb('888f') : hex2rgb('aaaf');
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