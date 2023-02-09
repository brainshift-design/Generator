class OpCorrectColor_Correction
{
    name; // 'H', 'C', or 'L'
    max;
    value;
    //locked;

    constructor(name, max, value = 0)//, locked = false)
    {
        this.name   = name;
        this.max    = max;
        this.value  = value;
        //this.locked = locked;
    }
}



class   OpCorrectColor
extends OpColorBase
{
    paramOrder;

    param1;
    param2;
    param3;


    colorSpaceIndex = -1;


    constructor()
    {
        super(CORRECT_COLOR, 'corrected', 100, true);


        this.addInput(new Input(COLOR_TYPES));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));

        this.alwaysSaveParams = true;
        //this.alwaysLoadParams = true;
        
        this.addParam(this.paramOrder = new SelectParam('order', '', false, true, true, [0, 1, 2, 3, 4, 5], 2));
        
        this.paramOrder.addEventListener('change', () => this.updateCorrections());
        
        
        this.addParam(this.param1 = new NumberParam('margin1', '', true, true, true, 0));
        this.addParam(this.param2 = new NumberParam('margin2', '', true, true, true, 0));
        this.addParam(this.param3 = new NumberParam('margin3', '', true, true, true, 0));
        
        this.param1.control.showNaNValueName = false;
        this.param2.control.showNaNValueName = false;
        this.param3.control.showNaNValueName = false;


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
               this.node.param1.input.connected
            || this.node.param2.input.connected
            || this.node.param3.input.connected;

        const options = (hasInputs ? 1 : 0) << 20;


        const [request, ignore] = this.node.genRequestStart(gen, options);
        if (ignore) return request;


        const input = this.node.inputs[0];

        request.push(input.connected ? 1 : 0);


        if (input.connected)
            request.push(...pushInputOrParam(input, gen));


        const valid = 
            input.connected
            ? input.node.valid
            : !dataColorIsNaN(this.node._color);


        const paramIds = [];

        for (const param of this.node.params)
            if (      param.input 
                   && param.input.connected
                || valid)
                paramIds.push(param.id);

        paramIds.push('value');

        request.push(paramIds.join(','));

        
        if (this.node.paramOrder.input.connected || valid) request.push(...this.node.paramOrder.genRequest(gen));
        if (this.node.param1    .input.connected || valid) request.push(...this.node.param1    .genRequest(gen));
        if (this.node.param2    .input.connected || valid) request.push(...this.node.param2    .genRequest(gen));
        if (this.node.param3    .input.connected || valid) request.push(...this.node.param3    .genRequest(gen));

        request.push(COLOR_VALUE, (
            valid
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



    updateParams()
    {
        this.paramOrder.enableControlText(false);
        this.param1    .enableControlText(false);
        this.param2    .enableControlText(false);
        this.param3    .enableControlText(false);

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
        case 'rgb':
            this.paramOrder.setOptions(makeOptions('RGB'));
            this.corrections = [
                new OpCorrectColor_Correction('R', rgbFactor[0]),
                new OpCorrectColor_Correction('G', rgbFactor[1]),
                new OpCorrectColor_Correction('B', rgbFactor[2]) ];

            break;

        case 'hsv':
            this.paramOrder.setOptions(makeOptions('HSV'));
            this.corrections = [
                new OpCorrectColor_Correction('H', hs_Factor[0]/2),
                new OpCorrectColor_Correction('S', hs_Factor[1]),
                new OpCorrectColor_Correction('V', hs_Factor[2]) ];

            break;

        case 'hsl':
            this.paramOrder.setOptions(makeOptions('HSL'));
            this.corrections = [
                new OpCorrectColor_Correction('H', hs_Factor[0]/2),
                new OpCorrectColor_Correction('S', hs_Factor[1]),
                new OpCorrectColor_Correction('L', hs_Factor[2]) ];

            break;

        case 'hclokl':
        case 'hcllab':
        case 'hclluv':
            this.paramOrder.setOptions(makeOptions('HCL'));
            this.corrections = [
                new OpCorrectColor_Correction('H', hclFactor[0]/2),
                new OpCorrectColor_Correction('C', hclFactor[1]),
                new OpCorrectColor_Correction('L', hclFactor[2]) ];

            break;

        case 'oklab': 
        case 'lab':
            this.paramOrder.setOptions(makeOptions('Lab'));
            this.corrections = [
                new OpCorrectColor_Correction('L', oppFactor[0]),
                new OpCorrectColor_Correction('a', oppFactor[1]),
                new OpCorrectColor_Correction('b', oppFactor[2]) ];

            break;

        case 'luv':
            this.paramOrder.setOptions(makeOptions('Luv'));
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

        if (this.paramOrder.value.isValid())
        {
            const [i1, i2, i3] = getCorrectionsInOrder(this.paramOrder.value.value);

            this.updateMargin(this.param1, this.corrections[i1]);
            this.updateMargin(this.param2, this.corrections[i2]);
            this.updateMargin(this.param3, this.corrections[i3]);
        }
        else
        {
            this.resetMargin(this.param1);
            this.resetMargin(this.param2);
            this.resetMargin(this.param3);
        }
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
        margin.control.name = correctionName;

        margin.control.setMin(0);
        margin.control.setMax(correction.max);
    }



    resetMargin(margin)
    {
        margin.setName('', false);
        margin.control.name = '';
        margin.control.setMin(0);
        margin.control.setMax(Number.MAX_SAFE_INTEGER);
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
            this._color = parseColorValue(_node.value)[0].toDataColor();

        if (!dataColorIsValid(this._color))
            uiInitNodeProgress(this.id);

        super.loadParams(_node, pasting);
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



// function uiEndFindCorrection(nodeId, success, closestOrder, closest1, closest2, closest3)
// {
//     // const node = nodeFromId(nodeId);

//     // if (success)
//     // {
//     //     node.paramOrder.setValue(closestOrder, true, true, false);

//     //     const [i1, i2, i3] = getCorrectionOrder(closestOrder);

//     //     node.corrections[i1].value = closest1;
//     //     node.corrections[i2].value = closest2;
//     //     node.corrections[i3].value = closest3;

//     //     node.updateCorrections();
//     // }

//     // validateIsFinding = false;

//     // node.findBar.style.display = 'none';

//     //pushUpdate([node]);

//     //uiSaveNodes([nodeId]);
// }