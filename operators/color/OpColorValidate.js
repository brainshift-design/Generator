//var validateIsFinding = false;



class OpColorValidate_Correction
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



class   OpColorValidate
extends OpColorBase
{
    paramOrder;

    paramMargin1;
    paramMargin2;
    paramMargin3;


    findBar;
    findProgress;


    constructor()
    {
        super(COLOR_VALIDATE, 'validate', 90);


        this.addInput(new Input(COLOR_TYPES));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.alwaysLoadParams = true;


        this.addParam(this.paramOrder = new SelectParam('order', '', false, true, true, [
            'H,&thinsp;C,&thinsp;L', 
            'C,&thinsp;H,&thinsp;L', 
            'C,&thinsp;L,&thinsp;H', 
            'H,&thinsp;L,&thinsp;C', 
            'L,&thinsp;H,&thinsp;C', 
            'L,&thinsp;C,&thinsp;H' 
        ], 2));

        this.paramOrder.addEventListener('change', () => this.updateCorrections());


        this.addParam(this.paramMargin1 = new NumberParam('margin1', '', true, true, true, 0));
        this.addParam(this.paramMargin2 = new NumberParam('margin2', '', true, true, true, 0));
        this.addParam(this.paramMargin3 = new NumberParam('margin3', '', true, true, true, 0));


        // this.paramMargin1.addEventListener('change', () => 
        // {
        //     const [i1,,] = getCorrectionOrder(this.paramOrder.value);
        //     this.corrections[i1].value = this.paramMargin1.value;
        //     uiSaveNodes([this.id]);
        // });


        // this.paramMargin2.addEventListener('change', () => 
        // {
        //     const [, i2,] = getCorrectionOrder(this.paramOrder.value);
        //     this.corrections[i2].value = this.paramMargin2.value;
        //     uiSaveNodes([this.id]);
        // });

        
        // this.paramMargin3.addEventListener('change', () => 
        // {
        //     const [,, i3] = getCorrectionOrder(this.paramOrder.value);
        //     this.corrections[i3].value = this.paramMargin3.value;
        //     uiSaveNodes([this.id]);
        // });


        this.initCorrections();
        this.updateCorrections();


        this.header.connectionPadding = 18;


        // this.header.addEventListener('pointerup', e => 
        // { 
        //     if (   e.button == 0
        //         && !validateIsFinding
        //         && this.inputs[0].connected) 
        //     { 
        //         this.findBar     .style.display = 'block';
        //         this.findProgress.style.width   = 0;
                
        //         validateIsFinding = true;

        //         // uiQueueMessageToGenerator(
        //         // {
        //         //     cmd:       'genFindCorrection',
        //         //     nodeId:     this.id,
        //         //     inputColor: this.inputs[0].data.color,
        //         //     param1:     this.margin1.value,
        //         //     param2:     this.margin2.value,
        //         //     param3:     this.margin3.value,
        //         //     locked1:    this.margin1.locked,
        //         //     locked2:    this.margin2.locked,
        //         //     locked3:    this.margin3.locked
        //         // });
        //     }
        // });


        this.createProgressBar();
    }



    createProgressBar()
    {
        this.findBar      = createDiv('findBar');
        this.findProgress = createDiv('findProgress');

        this.findBar.appendChild(this.findProgress);
        this.header .appendChild(this.findBar);
    }



    canAutoConnectFrom(node)
    {
        return COLOR_TYPES.includes(node.type);
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



    updateValues(updateParamId, paramIds, values)
    {
        const col = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
            col
            ? col.toDataColor()
            : dataColor_NaN;

        this.updateCorrections();


        const order   = values[paramIds.findIndex(id => id == 'order'  )];
        const margin1 = values[paramIds.findIndex(id => id == 'margin1')];
        const margin2 = values[paramIds.findIndex(id => id == 'margin2')];
        const margin3 = values[paramIds.findIndex(id => id == 'margin3')];

        // if (   order
        //     && margin1
        //     && margin2
        //     && margin3)
        // {
        //     node.paramOrder.setValue(order, false, true, false);

        //     const [i1, i2, i3] = getCorrectionOrder(closestOrder);

        //     node.corrections[i1].value = closest1;
        //     node.corrections[i2].value = closest2;
        //     node.corrections[i3].value = closest3;

        //     node.updateCorrections();
        // }

        //validateIsFinding = false;

        this.findBar.style.display = 'none';


        super.updateValues(updateParamId, paramIds, values);
    }



    initCorrections()
    {
        this.corrections = [
            new OpColorValidate_Correction('H', 180),
            new OpColorValidate_Correction('C', 100),
            new OpColorValidate_Correction('L', 100) ];
    }



    updateCorrections()
    {
        const [i1, i2, i3] = getCorrectionsInOrder(this.paramOrder.value.value);

        this.updateMargin(this.paramMargin1, this.corrections[i1]);
        this.updateMargin(this.paramMargin2, this.corrections[i2]);
        this.updateMargin(this.paramMargin3, this.corrections[i3]);
    }



    updateMargin(margin, correction)
    {
        margin.setName(correction.name, false);
        margin.control.name = correction.name;

        margin.control.setMin(0,              false);
        margin.control.setMax(correction.max, false);

        //margin.locked = correction.locked;
        //margin.updateLock();

        // if (!margin.locked)
        // {
            //margin.control.setDecimals(Math.min(decCount(numToString(correction.value, -1))));
            //margin.setValue(correction.value, true, true, false);
        //}
    }



    // updateHeaderLabel()
    // {
    //     this.label.style.top = '40%';

    //     // const colors    = this.getHeaderColors();
    //     // const findStyle = rgb2style_a(colors.text, 0.35);

    //     // this.findBar     .style.outline    = '1px solid ' + findStyle;
    //     // this.findProgress.style.background = findStyle;


    //     super.updateHeaderLabel();
    // }



    // canShowColor()
    // {
    //     return this.inputs[0].connected;
    // }



    isConnected()
    {
        return this.inputs[0].connected;
    }



    // toJsonBase(nTab = 0) 
    // {
    //     let   pos = ' '.repeat(nTab);
    //     const tab = TAB;

    //     const [i1, i2, i3] = getCorrectionOrder(this.order.value);

    //     return super.toJsonBase(nTab)
    //         + ',\n' + pos + tab + '"locked1": "' + boolToString(this.corrections[i1].locked) + '"'
    //         + ',\n' + pos + tab + '"locked2": "' + boolToString(this.corrections[i2].locked) + '"'
    //         + ',\n' + pos + tab + '"locked3": "' + boolToString(this.corrections[i3].locked) + '"';
    // }



    // loadParams(_node)
    // {
    //     super.loadParams(_node);

    //     const [i1, i2, i3] = getCorrectionOrder(this.order.value);

    //     if (_node.locked1) this.corrections[i1].locked = isTrue(_node.locked1);
    //     if (_node.locked2) this.corrections[i2].locked = isTrue(_node.locked2);
    //     if (_node.locked3) this.corrections[i3].locked = isTrue(_node.locked3);

    //     this.updateCorrections();

    //     super.loadParams(_node); // must be done again after the locks have been set
    // }
}



function uiUpdateFindCorrectionProgress(nodeId, progress)
{
    const node = nodeFromId(nodeId);

    node.findBar     .style.display = 'block';
    node.findProgress.style.width   = (progress * 100) + '%';
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