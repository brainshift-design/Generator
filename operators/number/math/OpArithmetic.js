class   OpArithmetic
extends OperatorBase
{
    paramOperand;

    _symbol;
    _showOnlySymbol;



    constructor(type, shortName, symbol)
    {
        super(type, shortName, 70);

        this.alwaysLoadParams = true;
        this._showOnlySymbol  = true;


        this.addInput (new Input(NUMBER_TYPES));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        

        this.addParam(this.paramOperand = new NumberParam('operand', '', false, true,  false, 0));


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
    
    
    
    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;
            

        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramOperand.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        
        return request;
    }



    updateParams()
    {
        this.paramOperand.enableControlText(true);

        super.updateParams();
    }



    updateHeader()
    {
        super.updateHeader();


        const colBack = rgbHeaderFromType(this.type, this.active);
        const colText = isDark(colBack) ? [1, 1, 1] : [0, 0, 0];

        this._symbol.style.fontSize   = this._showOnlySymbol ? 17 : 12;
        this._symbol.style.fontWeight = this.active ? 'bold' : 'normal';
        this._symbol.style.color      = rgb2style(colText);
        this._symbol.style.left       = 'calc(50% + 1px)';
        

        const padding         = this.header.connectionPadding;
        const connectedInputs = this.headerInputs.filter(i => i.connected);


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
             + ',\n' + pos + tab + '"onlySymbol": "' + boolToString(this._showOnlySymbol) + '"';
    }



    loadParams(_node)
    {
        if (_node.showOnlySymbol)
            this._showOnlySymbol = isTrue(_node.showOnlySymbol);

        super.loadParams(_node);
    }
}



function OpArithmetic_onConnectInput(node)
{
    node.addNewInput();
}



function OpArithmetic_onDisconnectInput(node, input)
{
    removeFromArray(node.inputs, input);
    node.inputControls.removeChild(input.div);
}