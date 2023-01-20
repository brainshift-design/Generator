class OpColorCorrect_Correction
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



class   OpColorCorrect
extends OpColorBase
{
    paramOrder;

    paramMargin1;
    paramMargin2;
    paramMargin3;


    colorSpaceIndex = -1;


    constructor()
    {
        super(COLOR_CORRECT, 'valid', 100, true);


        this.addInput(new Input(COLOR_TYPES));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.alwaysLoadParams = true;
        
        this.addParam(this.paramOrder = new SelectParam('order', '', false, true, true, [0, 1, 2, 3, 4, 5], 2));
        
        this.paramOrder.addEventListener('change', () => this.updateCorrections());
        
        
        this.addParam(this.paramMargin1 = new NumberParam('margin1', '', true, true, true, 0));
        this.addParam(this.paramMargin2 = new NumberParam('margin2', '', true, true, true, 0));
        this.addParam(this.paramMargin3 = new NumberParam('margin3', '', true, true, true, 0));
        
        this.paramMargin1.control.showNaNValueName = false;
        this.paramMargin2.control.showNaNValueName = false;
        this.paramMargin3.control.showNaNValueName = false;


        this.initCorrections('');
        this.updateCorrections();


        this.header.connectionPadding = 18;


        startNodeProgress(this);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));


        request.push(...this.node.paramOrder  .genRequest(gen));
        request.push(...this.node.paramMargin1.genRequest(gen));
        request.push(...this.node.paramMargin2.genRequest(gen));
        request.push(...this.node.paramMargin3.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(actionId, updateParamId, paramIds, values)
    {
        const col = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
            col
            ? col.toDataColor()
            : dataColor_NaN;


        this.initCorrections(this._color[0]);

        endNodeProgress(this);

        
        super.updateValues(actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        super.updateParams();

        this.paramOrder  .enableControlText(false);
        this.paramMargin1.enableControlText(false);
        this.paramMargin2.enableControlText(false);
        this.paramMargin3.enableControlText(false);

        this.updateCorrections();
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
            this.paramOrder  .setValue(NumberValue.NaN);
            this.paramMargin1.setValue(NumberValue.NaN);
            this.paramMargin2.setValue(NumberValue.NaN);
            this.paramMargin3.setValue(NumberValue.NaN);

            return;
        }


        switch (colorSpace)
        {
        case 'hex':
        case 'rgb':
            this.paramOrder.setOptions(makeOptions('RGB'));
            this.corrections = [
                new OpColorCorrect_Correction('R', rgbFactor[0]),
                new OpColorCorrect_Correction('G', rgbFactor[1]),
                new OpColorCorrect_Correction('B', rgbFactor[2]) ];

            break;

        case 'hsv':
            this.paramOrder.setOptions(makeOptions('HSV'));
            this.corrections = [
                new OpColorCorrect_Correction('H', hs_Factor[0]/2),
                new OpColorCorrect_Correction('S', hs_Factor[1]),
                new OpColorCorrect_Correction('V', hs_Factor[2]) ];

            break;

        case 'hsl':
            this.paramOrder.setOptions(makeOptions('HSL'));
            this.corrections = [
                new OpColorCorrect_Correction('H', hs_Factor[0]/2),
                new OpColorCorrect_Correction('S', hs_Factor[1]),
                new OpColorCorrect_Correction('L', hs_Factor[2]) ];

            break;

        case 'hclokl':
        case 'hcllab':
        case 'hclluv':
            this.paramOrder.setOptions(makeOptions('HCL'));
            this.corrections = [
                new OpColorCorrect_Correction('H', hclFactor[0]/2),
                new OpColorCorrect_Correction('C', hclFactor[1]),
                new OpColorCorrect_Correction('L', hclFactor[2]) ];

            break;

        case 'oklab': 
        case 'lab':
            this.paramOrder.setOptions(makeOptions('Lab'));
            this.corrections = [
                new OpColorCorrect_Correction('L', oppFactor[0]),
                new OpColorCorrect_Correction('a', oppFactor[1]),
                new OpColorCorrect_Correction('b', oppFactor[2]) ];

            break;

        case 'luv':
            this.paramOrder.setOptions(makeOptions('Luv'));
            this.corrections = [
                new OpColorCorrect_Correction('L', oppFactor[0]),
                new OpColorCorrect_Correction('u', oppFactor[1]),
                new OpColorCorrect_Correction('v', oppFactor[2]) ];

            break;
        }
    }



    updateCorrections()
    {
        this.updateColorSpace();

        if (this.paramOrder.value.isValid())
        {
            const [i1, i2, i3] = getCorrectionsInOrder(this.paramOrder.value.value);

            this.updateMargin(this.paramMargin1, this.corrections[i1]);
            this.updateMargin(this.paramMargin2, this.corrections[i2]);
            this.updateMargin(this.paramMargin3, this.corrections[i3]);
        }
        else
        {
            this.resetMargin(this.paramMargin1);
            this.resetMargin(this.paramMargin2);
            this.resetMargin(this.paramMargin3);
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
        margin.control.setMax(0);
    }



    isConnected()
    {
        return this.inputs[0].connected;
    }
}



function makeOptions(c)
{
    return ([
        c[0]+',&thinsp;'+c[1]+',&thinsp;'+c[2], 
        c[1]+',&thinsp;'+c[0]+',&thinsp;'+c[2], 
        c[1]+',&thinsp;'+c[2]+',&thinsp;'+c[0], 
        c[0]+',&thinsp;'+c[2]+',&thinsp;'+c[1], 
        c[2]+',&thinsp;'+c[0]+',&thinsp;'+c[1], 
        c[2]+',&thinsp;'+c[1]+',&thinsp;'+c[0]]);
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