class   OpArithmetic
extends OperatorBase
{
    #paramValue;

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
            actionManager.do(new ToggleArithmeticSymbolAction(this.id, false), e.detail.value != e.detail.oldValue);
        });
    }
    
    
    
    addNewInput()
    {
        const input = new Input([NUMBER]);
        input.isNew = true;

        input.addEventListener('connect',    () => { onConnectInput(this); input.isNew = false; });
        input.addEventListener('disconnect', () => onDisconnectInput(this, input));

        this.addInput(input);

        return input;
    }



    output_genRequest()
    {
        // 'this' is the output

        if (this.node.valid)
            return this.cache;

        const connectedInputs  = this.node.inputs.filter(i => i.connected);

        const req = [
            this.node.type,
            this.node.id,
            connectedInputs.length]; // utility values like param count are stored as numbers
        
        connectedInputs.forEach(input => 
            req.push(...input.connectedOutput.genRequest()));

        
        return this.cache = [...req];
    }



    updateParamValue(index, value)
    {
        super.updateParamValue(index, value);

        this.outputs[0].cache = [
            NUMBER_VALUE, 
            value.toString()];
    }



    updateHeader()
    {
        super.updateHeader();


        const colBack  = rgbFromType(this.type, this.active);
        const darkText = rgb2hclokl(colBack)[2] > 0.71;
        
        const colText  = darkText ? [0, 0, 0] : [1, 1, 1];

        this._symbol.style.color      = colorStyleRgb(colText);
        this._symbol.style.fontWeight = this.active ? 'bold' : 'normal';
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



function onConnectInput(node)
{
    node.addNewInput();
    node.updateNode();
}



function onDisconnectInput(node, input)
{
    removeFromArray(node.inputs, input);
    node.inputControls.removeChild(input.control);
    node.updateNode();
}