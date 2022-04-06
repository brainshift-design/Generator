class   OpArithmetic
extends OperatorBase
{
    #paramValue;

    _symbol;
    _showOnlySymbol;


    constructor(opType, shortType, symbol)
    {
        super(opType, shortType, 'number', 50);

        this._variableInputs  = true;
        this.alwaysLoadParams = true;

        this._showOnlySymbol  = true;


        this.addNewInput();
        this.addOutput(new Output(this.dataType));
        
        this.addParam(this.#paramValue = new NumberParam('value', '', false, false, false));

        enableSliderText(this.#paramValue.control, false);


        this._symbol           = createDiv('arithmeticSymbol');
        this._symbol.innerHTML = symbol;
        this._symbol.clicked0  = false;
        
        this._symbol.addEventListener('pointerenter', () => this._symbol.style.opacity = this._showOnlySymbol ? 1 : 0.65);
        this._symbol.addEventListener('pointerleave', () => this._symbol.style.opacity = 1);

        this._symbol.addEventListener('pointerdown', e => 
        { 
            if (e.button == 0)
            {
                if (this._symbol.clicked0)
                {
                    this._symbol.clicked0      = false;
                    this._symbol.style.opacity = 1;

                    actionManager.do(new ToggleArithmeticSymbolAction(this.id, true));
                }
                else if (!this._showOnlySymbol)
                {
                    this._symbol.clicked0 = true;
                    setTimeout(() => this._symbol.clicked0 = false, 250); // seems like a good default guess
                }
            }
        });

        this.header.appendChild(this._symbol);

        
        this.textbox.addEventListener('finishedit', e => 
        {
            actionManager.do(new ToggleArithmeticSymbolAction(this.id, false), e.detail.value != e.detail.oldValue);
        });
    }
    
    
    
    addNewInput()
    {
        const input = new Input(this.dataType);
        input.isNew = true;

        input.addEventListener('connect',    () => { onConnectInput(this); input.isNew = false; });
        input.addEventListener('disconnect', () => onDisconnectInput(this, input));

        this.addInput(input);

        return input;
    }



    // refresh()
    // {
    //     super.refresh();
        
    //     //this._sampled = Number.NaN;
    // }



    updateData()
    {
        let maxDec = 0;

        for (const input of this.inputs)
        {
            if (input.isConnected)
            {
                //input.connectedOutput.op.updateData();

                // ^ this could have removed one or more inputs and connections
                // in which case abort
                if (!input.isConnected)
                {
                    super.updateData();
                    return;
                }

                maxDec = Math.max(maxDec, input.data.decimals);
            }
        }


        const result = this.getResult();

        this.outputs[0]._data = dataFromNumber(result, maxDec);

        this.#paramValue.control.setDecimals(maxDec);
        this.#paramValue.setValue(result, false, true, false);

        
        super.updateData()
    }



    updateHeader()
    {
        super.updateHeader();


        const colBack  = dataType2rgb(this._dataType, this.active);
        const darkText = rgb2hclokl(colBack)[2] > 0.71;
        
        const colText  = darkText ? [0, 0, 0] : [1, 1, 1];

        this._symbol.style.color      = colorStyleRgb(colText);
        this._symbol.style.fontWeight = this.active ? 'bold' : 'normal';
    }



    getResult()
    {
        return Number.NaN;
    }



    updateNode()
    {
        super.updateNode();


        if (this._showOnlySymbol)
        {
            this._symbol.style.fontSize = 17;
            this._symbol.style.left     = 'calc(50% + 1px)';
            this._symbol.style.top      = this.header.offsetHeight/2 - 11;
        }
        else
        {
            this._symbol.style.fontSize = 12;
            this._symbol.style.left     = 'calc(50% + 1px)';
            this._symbol.style.top      = this.header.offsetHeight/2 - 15;
            this.label  .style.top      = 'calc(50% + 3px)';
        }
       
        
        this.label.style.visibility = this._showOnlySymbol ? 'hidden'  : 'visible';
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"showOnlySymbol": "' + boolString(this._showOnlySymbol) + '"';
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



function onConnectInput(op)
{
    op.addNewInput();
    op.updateNode();
    graphView.updateNodeTransform(op);
}



function onDisconnectInput(op, input)
{
    removeFromArray(op.inputs, input);
    op.inputControls.removeChild(input.control);
    op.updateNode();
}