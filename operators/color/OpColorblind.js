class   OpColorBlind
extends OpColorBase
{
    static { operatorTypes[COLORBLIND] = this; }



    paramL;
    paramM;
    paramS;


    symbol;

    ringL;
    ringM;
    ringS;

    menuL;
    menuM;
    menuS;


    colorBack;


    
    constructor()
    {
        super(COLORBLIND, 'colorblind', 'colorblind', NULL);

        this.subscription = true;
        this.canDisable   = true;
        

        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput (new Input ([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE, LIST_VALUE]));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.addParam(this.paramS = new NumberParam('s', 'S', true, true, true, 1, 0, 1, 1, 0.02));
        this.addParam(this.paramM = new NumberParam('m', 'M', true, true, true, 1, 0, 1, 1, 0.02));
        this.addParam(this.paramL = new NumberParam('l', 'L', true, true, true, 1, 0, 1, 1, 0.02));

        this.paramL.addEventListener('change', () => this.paramL.controls[0].dragScale = decCount(numToString(this.paramL.value, this.paramL.controls[0].displayDec)) == 0 ? 0.02 : 0.05);
        this.paramM.addEventListener('change', () => this.paramM.controls[0].dragScale = decCount(numToString(this.paramM.value, this.paramM.controls[0].displayDec)) == 0 ? 0.02 : 0.05);
        this.paramS.addEventListener('change', () => this.paramS.controls[0].dragScale = decCount(numToString(this.paramS.value, this.paramS.controls[0].displayDec)) == 0 ? 0.02 : 0.05);


        this.setAllParamDividers(0.42);


        this.header.connectionPadding = 18;


        this.symbol = createDiv('colorblindSymbol');
        
        this.ringL  = createDiv('colorblindRing');
        this.ringM  = createDiv('colorblindRing');
        this.ringS  = createDiv('colorblindRing');
        
        this.symbol.appendChild(this.ringS);
        this.symbol.appendChild(this.ringM);
        this.symbol.appendChild(this.ringL);

        this.header.appendChild(this.symbol);


        createTooltipSrc(
            this.symbol, 
            this.symbol, 
            () => 
                settings.showTooltipColorBlindness 
                    ? ttColorblind 
                    : null);


        this.menuL = new Menu('L', false, true);
        this.menuL.addItems([
            new MenuItem('1     ·  L normal', null, false, {callback: () => { hideAllMenus(); this.paramL.setValue(new NumberValue(1  ), true); }}),
            new MenuItem('0.5  ·  L weak',    null, false, {callback: () => { hideAllMenus(); this.paramL.setValue(new NumberValue(0.5), true); }}),
            new MenuItem('0     ·  L blind',  null, false, {callback: () => { hideAllMenus(); this.paramL.setValue(new NumberValue(0  ), true); }})]);

        this.menuM = new Menu('M', false, true);
        this.menuM.addItems([
            new MenuItem('1     ·  M normal', null, false, {callback: () => { hideAllMenus(); this.paramM.setValue(new NumberValue(1  ), true); }}),
            new MenuItem('0.5  ·  M weak',    null, false, {callback: () => { hideAllMenus(); this.paramM.setValue(new NumberValue(0.5), true); }}),
            new MenuItem('0     ·  M blind',  null, false, {callback: () => { hideAllMenus(); this.paramM.setValue(new NumberValue(0  ), true); }})]);

        this.menuS = new Menu('S', false, true);
        this.menuS.addItems([
            new MenuItem('1     ·  S normal', null, false, {callback: () => { hideAllMenus(); this.paramS.setValue(new NumberValue(1  ), true); }}),
            new MenuItem('0.5  ·  S weak',    null, false, {callback: () => { hideAllMenus(); this.paramS.setValue(new NumberValue(0.5), true); }}),
            new MenuItem('0     ·  S blind',  null, false, {callback: () => { hideAllMenus(); this.paramS.setValue(new NumberValue(0  ), true); }})]);


        this.menuL.minWidth = 120;
        this.menuM.minWidth = 120;
        this.menuS.minWidth = 120;


        this.paramL.controls[0].div.addEventListener('pointerdown', e => this.showParamMenu(e, this.paramL, this.menuL));
        this.paramM.controls[0].div.addEventListener('pointerdown', e => this.showParamMenu(e, this.paramM, this.menuM));
        this.paramS.controls[0].div.addEventListener('pointerdown', e => this.showParamMenu(e, this.paramS, this.menuS));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

            
        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];

        request.push(input.connected ? 1 : 0);


        if (input.connected)
            request.push(...pushInputOrParam(input, gen));


        request.push(...this.node.paramL.genRequest(gen));
        request.push(...this.node.paramM.genRequest(gen));
        request.push(...this.node.paramS.genRequest(gen));


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

        const colors = this.getHeaderColors();

        const ringStyle = 
            !this.isUnknown()
            ? rgba2style(colors.text)
            : darkMode 
            ? '#fffc' 
            : '#000c';

        const valL = Math.round(this.paramL.value.value * 2) / 2;
        const valM = Math.round(this.paramM.value.value * 2) / 2;
        const valS = Math.round(this.paramS.value.value * 2) / 2;


        if (   valL == 0
            && valM == 0
            && valS == 0)
        {
            this.ringL.style.display      = 'none';
            this.ringS.style.display      = 'none';

            this.ringM.style.display      = 'block';
            this.ringM.style.width        = '14px';
            this.ringM.style.height       = '14px';
            this.ringM.style.borderRadius = '14px';
            this.ringM.style.background   = ringStyle;
            this.ringM.style.border       = 'none';
        }
        else
        {
            const lDisplay     = valL >= 0.5 ? 'block' : 'none';
            const lBorderStyle = valL == 1   ? 'solid' : 'dashed';

            this.ringL.style.width        = '16px';
            this.ringL.style.height       = '16px';
            this.ringL.style.borderRadius = '16px';
            this.ringL.style.border       = '1.5px solid ' + ringStyle;
            this.ringL.style.display      = lDisplay;
            this.ringL.style.borderStyle  = lBorderStyle;


            const mDisplay     = valM >= 0.5 ? 'block' : 'none';
            const mBorderStyle = valM == 1   ? 'solid' : 'dashed';

            this.ringM.style.width        = '9px';
            this.ringM.style.height       = '9px';
            this.ringM.style.borderRadius = '9px';
            this.ringM.style.border       = '1.5px solid ' + ringStyle;
            this.ringM.style.background   = 'none';
            this.ringM.style.display      = mDisplay;
            this.ringM.style.borderStyle  = mBorderStyle;
            

            const sDisplay      = valS >= 0.5 ? 'block' : 'none';
            const sBorderRadius = valS == 1   ? 3 : 1;

            this.ringS.style.width        = sBorderRadius + 'px';
            this.ringS.style.height       = sBorderRadius + 'px';
            this.ringS.style.background   = ringStyle;
            this.ringS.style.display      = sDisplay;
            this.ringS.style.borderRadius = sBorderRadius + 'px';
        }


        updateColorHeader(this, colors);
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();
        
        this.label.style.top = '59%';
    }



    updateParams()
    {
        this.updateParamText(this.paramL, 'L');
        this.updateParamText(this.paramM, 'M');
        this.updateParamText(this.paramS, 'S');

        this.updateParamControls();
    }



    updateParamText(param, cone)
    {
        param.controls[0].suffixOffsetY = -1.5;

        const v = Math.round(param.value.value * 2) / 2;

             if (v == 1  ) param.controls[0].setSuffix(''      );
        else if (v == 0.5) param.controls[0].setSuffix(' weak' );
        else               param.controls[0].setSuffix(' blind');
    }
}