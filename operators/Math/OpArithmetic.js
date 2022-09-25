class   OpArithmetic
extends OperatorBase
{
    paramValue;

    _symbol;
    _showOnlySymbol;


    constructor(type, shortName, symbol)
    {
        super(type, shortName, 50);

        this.variableInputs  = true;
        this.alwaysLoadParams = true;

        this._showOnlySymbol  = true;


        this.addNewInput();
        this.addOutput(new Output(NUMBER, this.output_genRequest));
        

        this.addParam(this.paramValue = new NumberParam('value', '', false, false, false));
        //this.paramValue.enableControlText(false);


        this._symbol           = createDiv('arithmeticSymbol');
        this._symbol.innerHTML = symbol;
        this._symbol.clicked0  = false;
        
        this._symbol.addEventListener('pointerenter', () => this._symbol.style.opacity = this._showOnlySymbol ? 1 : 0.65);
        this._symbol.addEventListener('pointerleave', () => this._symbol.style.opacity = 1);

        this._symbol.addEventListener('pointerdown', e => 
        { 
            if (e.button == 0)
            {
                if (this._symbol.clicked0) // finish double click on small symbol
                {
                    this._symbol.clicked0      = false;
                    this._symbol.style.opacity = 1;

                    actionManager.do(new ToggleArithmeticSymbolAction(this.id, true));

                    this.header.ignoreDoubleClick = true;
                }
                else if (!this._showOnlySymbol) // start double cick on small symbol
                {
                    this._symbol.clicked0 = true;
                    setTimeout(() => this._symbol.clicked0 = false, 250); // seems like a good default guess
                }
            }
        });

        this.header.appendChild(this._symbol);

        
        this.textbox.addEventListener('finishedit', e => 
        {
            if (this._showOnlySymbol)
                actionManager.do(new ToggleArithmeticSymbolAction(this.id, false), e.detail.value != e.detail.oldValue);
        });
    }
    
    
    
    addNewInput()
    {
        const input = new Input([NUMBER]);
        input.isNew = true;

        input.addEventListener('connect',    () => { OpArithmetic_onConnectInput(this); input.isNew = false; });
        input.addEventListener('disconnect', () => OpArithmetic_onDisconnectInput(this, input));

        this.addInput(input);

        return input;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        // if (!isEmpty(this.cache))
        //     return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;
            

        const connectedInputs = this.node.inputs.filter(i => i.connected);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        connectedInputs.forEach(input => 
            request.push(...pushInputOrParam(input, gen)));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        
        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        super.updateValues(updateParamId, paramIds, values);

        if (paramIds.includes('value'))
            this.outputs[0].cache = [NUMBER_VALUE, values[0].toString()];
    }



    updateHeader()
    {
        super.updateHeader();


        const colBack = rgbFromType(this.type, this.active);
        const colText = isDark(colBack) ? [1, 1, 1] : [0, 0, 0];

        this._symbol.style.fontSize   = this._showOnlySymbol ? 17 : 12;
        this._symbol.style.fontWeight = this.active ? 'bold' : 'normal';
        this._symbol.style.color      = rgb2style(colText);
        this._symbol.style.left       = 'calc(50% + 1px)';
        

        const padding         = this.header.connectionPadding;
        const connectedInputs = this.inputs .filter(i => !i.param && i.connected);


        if (isEmpty(connectedInputs))
        {
            if (this._showOnlySymbol)
            {
                this._symbol.style.top = 2;
            }
            else
            {
                this._symbol.style.top = -1;
                this.label  .style.top = 'calc(50% + 4px)';
            }
        }
        else
        {
            const [connectedInputY, connectedInputHeight] = getHeaderConnY(connectedInputs, padding, 5);

            if (this._showOnlySymbol)
            {
                this._symbol.style.top = connectedInputY[0]/2 + connectedInputHeight/2 - 9;
            }
            else
            {
                this._symbol.style.top = connectedInputY[0]/2 + connectedInputHeight/2 - 6;
                this.label  .style.top = 'calc(50% + 5px)';
            }
        }
        

        this.label.style.visibility = this._showOnlySymbol ? 'hidden'  : 'visible';
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"onlySymbol": "' + boolString(this._showOnlySymbol) + '"';
    }



    paramsToJson(nTab = 0)
    {
        return '';
    }



    loadParams(_node)
    {
        if (_node.showOnlySymbol)
            this._showOnlySymbol = isTrue(_node.showOnlySymbol);

        //super.loadParams(_node);
    }
}



function OpArithmetic_onConnectInput(node)
{
    node.addNewInput();
    //node.updateNode();
}



function OpArithmetic_onDisconnectInput(node, input)
{
    removeFromArray(node.inputs, input);
    node.inputControls.removeChild(input.control);
    //node.updateNode();
}