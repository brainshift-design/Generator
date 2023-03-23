class   OpColorBlind
extends OpColorBase
{
    paramL;
    paramM;
    paramS;


    symbol;

    ringL;
    ringM;
    ringS;


    constructor()
    {
        super(COLORBLIND, 'colorblind');

        this.canDisable = true;
        

        this.addInput(new Input(COLOR_TYPES));
        this.addOutput(new Output([COLOR], this.output_genRequest));


        this.addParam(this.paramL = new NumberParam('l', 'L', false, true, true, 2, 0, 2, 0, 0.02));
        this.addParam(this.paramM = new NumberParam('m', 'M', false, true, true, 2, 0, 2, 0, 0.02));
        this.addParam(this.paramS = new NumberParam('s', 'S', false, true, true, 2, 0, 2, 0, 0.02));

        this.paramL.addEventListener('change', () => this.paramL.controls[0].dragScale = decCount(numToString(this.paramL.value, this.paramL.controls[0].displayDec)) == 0 ? 0.02 : 0.05);
        this.paramM.addEventListener('change', () => this.paramM.controls[0].dragScale = decCount(numToString(this.paramM.value, this.paramM.controls[0].displayDec)) == 0 ? 0.02 : 0.05);
        this.paramS.addEventListener('change', () => this.paramS.controls[0].dragScale = decCount(numToString(this.paramS.value, this.paramS.controls[0].displayDec)) == 0 ? 0.02 : 0.05);


        this.header.connectionPadding = 18;


        this.symbol = createDiv('colorblindSymbol');
        
        this.ringL = createDiv('colorblindRing');
        this.ringM = createDiv('colorblindRing');
        this.ringS = createDiv('colorblindRing');
        
        this.symbol.appendChild(this.ringS);
        this.symbol.appendChild(this.ringM);
        this.symbol.appendChild(this.ringL);

        this.header.appendChild(this.symbol);


        createTooltipSrc(this.symbol, this.symbol, () => ttColorblind);
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

        this._color = 
            value
            ? value.toDataColor()
            : dataColor_NaN;

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        super.updateHeader();

        const colors    = this.getHeaderColors();
        const ringStyle = rgba2style(colors.text);

        const valL = Math.round(this.paramL.value.value);
        const valM = Math.round(this.paramM.value.value);
        const valS = Math.round(this.paramS.value.value);


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
            const lDisplay     = valL >= 1 ? 'block' : 'none';
            const lBorderStyle = valL == 2 ? 'solid' : 'dotted';

            this.ringL.style.width        = '16px';
            this.ringL.style.height       = '16px';
            this.ringL.style.borderRadius = '16px';
            this.ringL.style.border       = '1.5px solid ' + ringStyle;
            this.ringL.style.display      = lDisplay;
            this.ringL.style.borderStyle  = lBorderStyle;


            const mDisplay     = valM >= 1 ? 'block' : 'none';
            const mBorderStyle = valM == 2 ? 'solid' : 'dotted';

            this.ringM.style.width        = '8px';
            this.ringM.style.height       = '8px';
            this.ringM.style.borderRadius = '8px';
            this.ringM.style.border       = '1.5px solid ' + ringStyle;
            this.ringM.style.background   = 'none';
            this.ringM.style.display      = mDisplay;
            this.ringM.style.borderStyle  = mBorderStyle;
            

            const sDisplay      = valS >= 1 ? 'block' : 'none';
            const sBorderRadius = valS == 2 ? 3 : 1;

            this.ringS.style.width        = sBorderRadius + 'px';
            this.ringS.style.height       = sBorderRadius + 'px';
            this.ringS.style.background   = ringStyle;
            this.ringS.style.display      = sDisplay;
            this.ringS.style.borderRadius = sBorderRadius + 'px';
        }
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
        const v = Math.round(param.value.value);

             if (v == 2) param.controls[0].valueText = cone;
        else if (v == 1) param.controls[0].valueText = cone + ' weak';
        else             param.controls[0].valueText = cone + ' blind';
    }
}