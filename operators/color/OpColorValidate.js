var validateIsFinding = false;



class OpColorValidate_Correction
{
    name; // 'H', 'C', or 'L'
    max;
    value;
    locked;

    constructor(name, max, value = 0, locked = false)
    {
        this.name   = name;
        this.max    = max;
        this.value  = value;
        this.locked = locked;
    }
}



class   OpColorValidate
extends OpColorBase
{
    paramOrder;

    param1;
    param2;
    param3;


    findBar;
    findProgress;


    corrections = [];



    constructor()
    {
        super(COLOR_VALIDATE, 'validate', 80);


        this.addInput(new Input(COLOR_TYPES));
        this.addOutput(new Output(COLOR, this.output_genRequest));


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


        this.addParam(this.param1 = new NumberParam('margin1', '', true, true, true, 0));
        this.addParam(this.param2 = new NumberParam('margin2', '', true, true, true, 0));
        this.addParam(this.param3 = new NumberParam('margin3', '', true, true, true, 0));

        // this.param1.showParamLock = true;
        // this.param2.showParamLock = true;
        // this.param3.showParamLock = true;


        this.param1.addEventListener('change', () => 
        {
            const [i1,,] = getCorrectionOrder(this.paramOrder.value);
            this.corrections[i1].value = this.param1.value;
            uiSaveNodes([this.id]);
        });

        // this.param1.addEventListener('changelock', () => 
        // {
        //     const [i1,,] = getCorrectionOrder(this.paramOrder.value);
        //     this.corrections[i1].locked = this.param1.locked;
        //     actionManager.do(new SetParamLockAction(this.params[1+i1], this.param1.locked));
        // });


        this.param2.addEventListener('change', () => 
        {
            const [, i2,] = getCorrectionOrder(this.paramOrder.value);
            this.corrections[i2].value = this.param2.value;
            uiSaveNodes([this.id]);
        });

        // this.param2.addEventListener('changelock', () => 
        // {
        //     const [, i2,] = getCorrectionOrder(this.paramOrder.value);
        //     this.corrections[i2].locked = this.param2.locked;
        //     actionManager.do(new SetParamLockAction(this.params[1+i2], this.param2.locked));
        // });


        this.param3.addEventListener('change', () => 
        {
            const [,, i3] = getCorrectionOrder(this.paramOrder.value);
            this.corrections[i3].value = this.param3.value;
            uiSaveNodes([this.id]);
        });

        // this.param3.addEventListener('changelock', () => 
        // {
        //     const [,, i3] = getCorrectionOrder(this.paramOrder.value);
        //     this.corrections[i3].locked = this.param3.locked;
        //     actionManager.do(new SetParamLockAction(this.params[1+i3], this.param3.locked));
        // });


        this.initCorrections();
        this.updateCorrections();


        this.header.connectionPadding = 18;


        this.header.addEventListener('pointerup', e => 
        { 
            if (   e.button == 0
                && !validateIsFinding
                && this.inputs[0].connected) 
            { 
                this.findBar     .style.display = 'block';
                this.findProgress.style.width   = 0;
                
                validateIsFinding = true;

                // uiQueueMessageToGenerator(
                // {
                //     cmd:       'genFindCorrection',
                //     nodeId:     this.id,
                //     inputColor: this.inputs[0].data.color,
                //     param1:     this.param1.value,
                //     param2:     this.param2.value,
                //     param3:     this.param3.value,
                //     locked1:    this.param1.locked,
                //     locked2:    this.param2.locked,
                //     locked3:    this.param3.locked
                // });
            }
        });


        this.createProgressBar();
    }



    createProgressBar()
    {
        this.findBar      = createDiv('findBar');
        this.findProgress = createDiv('findProgress');

        this.findBar.appendChild(this.findProgress);
        this.header .appendChild(this.findBar);
    }



    initCorrections()
    {
        this.corrections.push(new OpColorValidate_Correction('H', 180));
        this.corrections.push(new OpColorValidate_Correction('C', 100));
        this.corrections.push(new OpColorValidate_Correction('L', 100));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        if (!isEmpty(this.cache))
            return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [req, ignore] = this.node.genRequestStart(gen);
        if (ignore) return req;


        const input = this.node.inputs[0];

        if (input.connected)
            req.push(...pushInputOrParam(input, gen));


        req.push(...this.node.param1.genRequest(gen));
        req.push(...this.node.param2.genRequest(gen));
        req.push(...this.node.param3.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return req;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const col = values[paramIds.findIndex(id => id == 'value')];

        if (this.inputs[0].connected)
        {
            this._color = [...validateColor(
                col.toDataColor(),
                this.paramOrder.value, 
                this.param1.value,
                this.param2.value,
                this.param3.value)];
        }
        else
            this._color = dataColor_NaN;

        super.updateValues(updateParamId, paramIds, values);
    }



    updateCorrections()
    {
        const [i1, i2, i3] = getCorrectionOrder(this.paramOrder.value);

        this.updateMargin(this.param1, this.corrections[i1]);
        this.updateMargin(this.param2, this.corrections[i2]);
        this.updateMargin(this.param3, this.corrections[i3]);
    }



    updateMargin(margin, correction)
    {
        margin.setName(correction.name, false);
        margin.control.name = addValidateSymbol(correction.name);

        margin.control.setMin(0,              false);
        margin.control.setMax(correction.max, false);

        margin.locked = correction.locked;
        margin.updateLock();

        if (!margin.locked)
        {
            margin.control.setDecimals(Math.min(decCount(numToString(correction.value, -1))));
            margin.setValue(correction.value, true, true, false);
        }
    }



    updateHeaderLabel()
    {
        this.label  .style.top = '40%';

        const colors    = this.getHeaderColors();
        const findStyle = colorStyleRgb_a(colors.text, 0.35);

        this.findBar     .style.outline    = '1px solid ' + findStyle;
        this.findProgress.style.background = findStyle;


        super.updateHeaderLabel();
    }



    canShowColor()
    {
        return this.inputs[0].connected;
    }



    isConnected()
    {
        return this.inputs[0].connected;
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;

        const [i1, i2, i3] = getCorrectionOrder(this.paramOrder.value);

        return super.toJsonBase(nTab)
            + ',\n' + pos + tab + '"locked1": "' + boolString(this.corrections[i1].locked) + '"'
            + ',\n' + pos + tab + '"locked2": "' + boolString(this.corrections[i2].locked) + '"'
            + ',\n' + pos + tab + '"locked3": "' + boolString(this.corrections[i3].locked) + '"';
    }



    loadParams(_node)
    {
        super.loadParams(_node);

        const [i1, i2, i3] = getCorrectionOrder(this.paramOrder.value);

        if (_node.locked1) this.corrections[i1].locked = isTrue(_node.locked1);
        if (_node.locked2) this.corrections[i2].locked = isTrue(_node.locked2);
        if (_node.locked3) this.corrections[i3].locked = isTrue(_node.locked3);

        this.updateCorrections();

        super.loadParams(_node); // must be done again after the locks have been set
    }
}



function uiUpdateFindCorrectionProgress(nodeId, progress)
{
    const node = nodeFromId(nodeId);

    node.findProgress.style.width = (progress * 100) + '%';
}



function uiEndFindCorrection(nodeId, success, closestOrder, closest1, closest2, closest3)
{
    const node = nodeFromId(nodeId);

    if (success)
    {
        node.paramOrder.setValue(closestOrder, true, true, false);

        const [i1, i2, i3] = getCorrectionOrder(closestOrder);

        node.corrections[i1].value = closest1;
        node.corrections[i2].value = closest2;
        node.corrections[i3].value = closest3;

        node.updateCorrections();
    }

    validateIsFinding = false;

    node.findBar.style.display = 'none';

    pushUpdate([node]);

    uiSaveNodes([nodeId]);
}



function getCorrectionOrder(order)
{
    switch (order)
    {
        case 0: return [0, 1, 2];
        case 1: return [1, 0, 2];
        case 2: return [1, 2, 0];
        case 3: return [0, 2, 1];
        case 4: return [2, 0, 1];
        case 5: return [2, 1, 0];
    }
}



function addValidateSymbol(name)
{
    return /*'<span class="asterisk">±&thinsp;</span>' + */name;
}