var validateIsFinding = false;



class OpValidateColor_Correction
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



class   OpValidateColor
extends OpColorBase
{
    paramOrder;

    param1;
    param2;
    param3;

    btnFind;


    findBar;
    findProgress;


    corrections = [];



    constructor()
    {
        super('validatecolor', 'validate', 'color', 80);


        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));


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

        this.param1.allowEditDecimals = true;
        this.param2.allowEditDecimals = true;
        this.param3.allowEditDecimals = true;

        this.param1.showParamLock = true;
        this.param2.showParamLock = true;
        this.param3.showParamLock = true;


        this.param1.addEventListener('change', () => 
        {
            const [i1,,] = getCorrectionOrder(this.paramOrder.value);
            this.corrections[i1].value = this.param1.value;
            uiSaveNodesAndConns([this.id]);
        });

        this.param1.addEventListener('changelock', () => 
        {
            const [i1,,] = getCorrectionOrder(this.paramOrder.value);
            this.corrections[i1].locked = this.param1.locked;
            actionManager.do(new SetParamLockAction(this.params[1+i1], this.param1.locked));
        });


        this.param2.addEventListener('change', () => 
        {
            const [, i2,] = getCorrectionOrder(this.paramOrder.value);
            this.corrections[i2].value = this.param2.value;
            uiSaveNodesAndConns([this.id]);
        });

        this.param2.addEventListener('changelock', () => 
        {
            const [, i2,] = getCorrectionOrder(this.paramOrder.value);
            this.corrections[i2].locked = this.param2.locked;
            actionManager.do(new SetParamLockAction(this.params[1+i2], this.param2.locked));
        });


        this.param3.addEventListener('change', () => 
        {
            const [,, i3] = getCorrectionOrder(this.paramOrder.value);
            this.corrections[i3].value = this.param3.value;
            uiSaveNodesAndConns([this.id]);
        });

        this.param3.addEventListener('changelock', () => 
        {
            const [,, i3] = getCorrectionOrder(this.paramOrder.value);
            this.corrections[i3].locked = this.param3.locked;
            actionManager.do(new SetParamLockAction(this.params[1+i3], this.param3.locked));
        });


        this.initCorrections();
        this.updateCorrections();


        this.header.connectionPadding = 18;


        this.btnFind = createDiv('findColorCorrection');
        this.header.appendChild(this.btnFind);


        this.btnFind.addEventListener('pointerenter', () => { this.btnFind.over = true;  this.updateHeaderLabel(); });
        this.btnFind.addEventListener('pointerleave', () => { this.btnFind.over = false; this.updateHeaderLabel(); });


        this.btnFind.addEventListener('pointerdown', e => 
        { 
            if (e.button == 0) 
            {
                this.btnFind.button0 = true;  
                this.updateHeaderLabel(); 
            }
        });

        
        this.header.addEventListener('pointerup', e => 
        { 
            if (   e.button == 0
                && this.btnFind.button0
                && !validateIsFinding
                && this.inputs[0].isConnected) 
            { 
                this.btnFind.button0 = false;

                this.btnFind     .style.display = 'none';
                this.findBar     .style.display = 'block';
                this.findProgress.style.width   = 0;
                
                validateIsFinding = true;

                uiPostMessageToGenerator(
                {
                    msg:       'genFindCorrection',
                    nodeId:     this.id,
                    inputColor: this.inputs[0].data.color,
                    param1:     this.param1.value,
                    param2:     this.param2.value,
                    param3:     this.param3.value,
                    locked1:    this.param1.locked,
                    locked2:    this.param2.locked,
                    locked3:    this.param3.locked
                });
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
        this.corrections.push(new OpValidateColor_Correction('H', 180));
        this.corrections.push(new OpValidateColor_Correction('C', 100));
        this.corrections.push(new OpValidateColor_Correction('L', 100));
    }



    updateCorrections()
    {
        const [i1, i2, i3] = getCorrectionOrder(this.paramOrder.value);

        this.updateMargin(this.param1, this.corrections[i1]);
        this.updateMargin(this.param2, this.corrections[i2]);
        this.updateMargin(this.param3, this.corrections[i3]);
    }



    updateData()
    {
        //log(this.id + '.OpValidColor.updateData()');

        if (this.inputs[0].isConnected)
        {
            this._color = [...validateColor(
                [...this.inputs[0].data.color],
                this.paramOrder.value, 
                this.param1.value,
                this.param2.value,
                this.param3.value)];
        }
        else
            this._color = dataColor_NaN;

            
        this.outputs[0]._data = dataFromDataColor(this._color);


        super.updateData()
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
            margin.control.setDecimals(Math.min(getDecimalCount(getNumberString(correction.value, -1))));
            margin.setValue(correction.value, true, true, false);
        }
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();

        this.label  .style.top = '40%';
        this.btnFind.style.top = '67%';

        const [,,,, textColor,] = this.getHeaderColors();

        const textStyle = colorStyleRgb_a(
            textColor, 
            this.btnFind.over
            ? Math.min(textColor[3] * 1.8, 1) 
            : textColor[3]);

        this.btnFind.style.background         = 'url(\'data:image/svg+xml;utf8,<svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.10345 5.05172C8.10345 7.01329 6.51329 8.60345 4.55172 8.60345C2.59016 8.60345 1 7.01329 1 5.05172C1 3.09016 2.59016 1.5 4.55172 1.5C6.51329 1.5 8.10345 3.09016 8.10345 5.05172ZM7.39723 8.60458C6.61787 9.22958 5.62846 9.60345 4.55172 9.60345C2.03788 9.60345 0 7.56557 0 5.05172C0 2.53788 2.03788 0.5 4.55172 0.5C7.06557 0.5 9.10345 2.53788 9.10345 5.05172C9.10345 6.12858 8.72949 7.1181 8.10436 7.8975L11.3535 11.1467L10.6464 11.8538L7.39723 8.60458Z" fill="'+textStyle+'" fill-opacity="0.8"/></svg>\')';
        this.btnFind.style.backgroundPosition = '50% 50%';
        this.btnFind.style.backgroundRepeat   = 'no-repeat';


        const findStyle = colorStyleRgb_a(textColor, 0.35);

        this.findBar     .style.outline    = '1px solid ' + findStyle;
        this.findProgress.style.background = findStyle;
    }



    canShowColor()
    {
        return this.inputs[0].isConnected;
    }



    isConnected()
    {
        return this.inputs[0].isConnected;
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';

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
    node.btnFind.style.display = 'block';

    node.pushUpdate();

    uiSaveNodesAndConns([nodeId]);
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