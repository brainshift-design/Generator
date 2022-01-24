class   OpArithmetic
extends Operator
{
    #paramValue;

    _symbol;
    _showOnlySymbol;


    constructor(opType, shortType, symbol)
    {
        super(opType, shortType, 'number', 50);

        this._variableInputs  = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output(this.dataType));
        
        this.addParam(this.#paramValue = new NumberParam('value', false, false, false));

        this.#paramValue.control.readOnly        = true;
        this.#paramValue.control.style.fontStyle = 'italic';


        this._symbol           = createDiv('arithmeticSymbol');
        this._symbol.innerHTML = symbol;

        this.header.appendChild(this._symbol);

        this._showOnlySymbol = true;
        this.textbox.addEventListener('focus', () => { this._showOnlySymbol = false; });
    }
    
    
    
    addNewInput()
    {
        const input = new Input(this.dataType);

        input.addEventListener('connect',    () => onConnectInput(this));
        input.addEventListener('disconnect', () => onDisconnectInput(this, input));

        this.addInput(input);

        return input;
    }



    refresh()
    {
        super.refresh();
        
        //this._sampled = Number.NaN;
    }



    update()
    {
        if (!this.needsUpdate())
            return;

        let maxDec = 0;

        for (const input of this.inputs)
        {
            if (input.isConnected)
            {
                input.connectedOutput.op.update();
                maxDec = Math.max(maxDec, input.data.decimals);
            }
        }


        const result = this.getResult();

        this.outputs[0]._data = dataFromNumber(result);

        this.#paramValue.setValue(result, false, true, false);

        this.#paramValue.control.dec = maxDec;
        this.#paramValue.control.update();

        super.update()
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
            this._symbol.style.top      = this.header.offsetHeight/2 - 12;
        }
        else
        {
            this._symbol.style.fontSize = 12;
            this._symbol.style.left     = 'calc(50% + 2px)';
            this._symbol.style.top      = this.header.offsetHeight/2 - 2;
            this.label  .style.top      = 'calc(50% - 3px)';
        }
       
        
        this.label.style.visibility = this._showOnlySymbol ? 'hidden'  : 'visible';
    }



    toJson(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';
        
        let json = 
              pos + '{\n'
            + this.toJsonBase(nTab)
            + ',\n' + pos + tab + '"showOnlySymbol": "' + (this._showOnlySymbol ? 'true' : 'false') + '"';
        
        json += '\n' + pos + '}';

        return json;
    }



    loadParams(_node)
    {
        if (_node.showOnlySymbol)
            this._showOnlySymbol = _node.showOnlySymbol == 'true';
    }
}



function onConnectInput(op)
{
    op.addNewInput(); 
    op.pushUpdate();
}



function onDisconnectInput(op, input)
{
    removeFromArray(op.inputs, input);
    op.inputControls.removeChild(input.control);
    op.pushUpdate();
}