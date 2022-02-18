var validateIsFinding = false;



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


    constructor()
    {
        super('validatecolor', 'validate', 'color', 80);


        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));


        this.addParam(this.paramOrder = new SelectParam('order',   '', false, true, true, ['H,&thinsp;C,&thinsp;L', 'H,&thinsp;L,&thinsp;C', 'C,&thinsp;H,&thinsp;L', 'C,&thinsp;L,&thinsp;H', 'L,&thinsp;H,&thinsp;C', 'L,&thinsp;C,&thinsp;H'], 2));
        this.addParam(this.param1     = new NumberParam('margin1', '', true,  true, true, 0));
        this.addParam(this.param2     = new NumberParam('margin2', '', true,  true, true, 0));
        this.addParam(this.param3     = new NumberParam('margin3', '', true,  true, true, 0));


        this.param1.control.max = 100;
        this.param2.control.max = 100;
        this.param3.control.max = 360;


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
                this.findProgress.style.width = 0;
                
                validateIsFinding = true;

                uiPostMessageToGenerator(
                {
                    msg:       'genFindCorrection',
                    nodeId:     this.id,
                    inputColor: this.inputs[0].data.color,
                    max1:       this.param1.control.max,
                    max2:       this.param2.control.max,
                    max3:       this.param3.control.max
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



    updateData()
    {
        //log(this.id + '.OpValidColor.updateData()');

        this.updateMargins();


        if (this.inputs[0].isConnected)
        {
            this._color = [...adjustColor(
                [...this.inputs[0].data.color],
                this.paramOrder.value, 
                this.param1    .value,
                this.param2    .value,
                this.param3    .value)];
        }
        else
            this._color = dataColor_NaN;

            
        this.outputs[0]._data = dataFromDataColor(this._color);


        super.updateData()
    }



    updateMargins()
    {
        const order = this.paramOrder.value;

        const [n1, n2, n3] = getValidateComponentNames(order);
        const [m1, m2, m3] = getValidateMax(order);

        this.updateMargin(m1, this.param1); this.param1.control.name = n1; 
        this.updateMargin(m2, this.param2); this.param2.control.name = n2; 
        this.updateMargin(m3, this.param3); this.param3.control.name = n3; 
    }



    updateMargin(max, margin)
    {
        margin.control.setMin(0, false);
        margin.control.setMax(max, false);
    }



    updateLupe()
    {

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
}



function uiUpdateFindCorrectionProgress(nodeId, progress)
{
    const node = nodeFromId(nodeId);

    node.findProgress.style.width = (progress * 100) + '%';
}



function uiEndFindCorrectionProgress(nodeId, success, closestOrder, closest1, closest2, closest3)
{
    const node = nodeFromId(nodeId);

    if (success)
    {
        node.paramOrder.setValue(closestOrder, true, true, false);
        node.param1    .setValue(closest1,     true, true, false);
        node.param2    .setValue(closest2,     true, true, false);
        node.param3    .setValue(closest3,     true, true, false);
    }

    validateIsFinding = false;

    node.findBar.style.display = 'none';
    node.btnFind.style.display = 'block';

    node.pushUpdate();
}



function getValidateComponentNames(order)
{
    switch (order)
    {
        case 0: return ['H', 'C', 'L'];
        case 1: return ['H', 'L', 'C'];
        case 2: return ['C', 'H', 'L'];
        case 3: return ['C', 'L', 'H'];
        case 4: return ['L', 'H', 'C'];
        case 5: return ['L', 'C', 'H'];
    }
}