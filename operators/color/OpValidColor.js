class   OpValidColor
extends OpColorBase
{
    paramQuality;

    corrections = [];

    

    constructor()
    {
        super(VALID_COLOR, 'valid', 100, true);


        this.addInput(new Input(COLOR_TYPES));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));

        this.alwaysSaveParams = true;

        
        this.addParam(this.paramQuality = new SelectParam('quality', '', false, true, false, ['fast', 'accurate'], 1));


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


        // const hasInputs =
        //        this.node.param1.input.connected
        //     || this.node.param2.input.connected
        //     || this.node.param3.input.connected;

        //const options = 0;//(hasInputs ? 1 : 0) << 20;


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

        endNodeProgress(this);


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        super.updateHeader();

        const colors = this.getHeaderColors();

        this.progressBar.style.background = 
            !rgbIsNaN(colors.back) 
            ? rgb2style_a(colors.text, 0.5) 
            : 'var(--figma-color-bg-brand)';
    }



    initCorrections(colorSpace)
    {
        if (colorSpace == '')
            return;


        switch (colorSpace)
        {
        case 'hex':
        case 'rgb':
            this.corrections = [
                new OpCorrectColor_Correction('R', rgbFactor[0]),
                new OpCorrectColor_Correction('G', rgbFactor[1]),
                new OpCorrectColor_Correction('B', rgbFactor[2]) ];

            break;

        case 'hsv':
            this.corrections = [
                new OpCorrectColor_Correction('H', hs_Factor[0]/2),
                new OpCorrectColor_Correction('S', hs_Factor[1]),
                new OpCorrectColor_Correction('V', hs_Factor[2]) ];

            break;

        case 'hsl':
            this.corrections = [
                new OpCorrectColor_Correction('H', hs_Factor[0]/2),
                new OpCorrectColor_Correction('S', hs_Factor[1]),
                new OpCorrectColor_Correction('L', hs_Factor[2]) ];

            break;

        case 'hclokl':
        case 'hcllab':
        case 'hclluv':
            this.corrections = [
                new OpCorrectColor_Correction('H', hclFactor[0]/2),
                new OpCorrectColor_Correction('C', hclFactor[1]),
                new OpCorrectColor_Correction('L', hclFactor[2]) ];

            break;

        case 'oklab': 
        case 'lab':
            this.corrections = [
                new OpCorrectColor_Correction('L', oppFactor[0]),
                new OpCorrectColor_Correction('a', oppFactor[1]),
                new OpCorrectColor_Correction('b', oppFactor[2]) ];

            break;

        case 'luv':
            this.corrections = [
                new OpCorrectColor_Correction('L', oppFactor[0]),
                new OpCorrectColor_Correction('u', oppFactor[1]),
                new OpCorrectColor_Correction('v', oppFactor[2]) ];

            break;
        }
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
        const tab = TAB;

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"value": "' + ColorValue.fromDataColor(this._color).toString() + '"';
    }



    loadParams(_node, pasting)
    {
        if (_node.value != undefined)
        {
            this._color = parseColorValue(_node.value)[0].toDataColor();
            this.valid = true;
        }

        if (!dataColorIsValid(this._color))
            uiInitNodeProgress(this.id);

        super.loadParams(_node, pasting);
    }
}