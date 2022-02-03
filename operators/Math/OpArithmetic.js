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


        this.addNewInput();
        this.addOutput(new Output(this.dataType));
        
        this.addParam(this.#paramValue = new NumberParam('value', '', false, false, false));

        this.#paramValue.control.readOnly        = true;
        this.#paramValue.control.style.fontStyle = 'italic';


        this._symbol           = createDiv('arithmeticSymbol');
        this._symbol.innerHTML = symbol;
        this._symbol.clicked0  = false;

        this._symbol.addEventListener('pointerenter', () => this._symbol.style.opacity = this._showOnlySymbol ? 1 : 0.65);
        this._symbol.addEventListener('pointerleave',   () => this._symbol.style.opacity = 1);

        this._symbol.addEventListener('pointerdown', e => 
        { 
            if (e.button == 0)
            {
                if (this._symbol.clicked0)
                {
                    this._symbol.clicked0      = false;
                    this._showOnlySymbol       = true;
                    this._symbol.style.opacity = 1
                    this.updateNode();
                }
                else
                {
                    this._symbol.clicked0 = true;
                    setTimeout(() => this._symbol.clicked0 = false, 250); // seems like a good default guess
                }
            }
        });

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

        this.outputs[0]._data = dataFromNumber(result);

        this.#paramValue.setValue(result, false, true, false);
        this.#paramValue.control.dec = maxDec;
        //this.#paramValue.control.update();

        
        super.updateData()
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
            this._symbol.style.top      = this.header.offsetHeight/2 - 3;
            this.label  .style.top      = 'calc(50% - 3px)';
        }
       
        
        this.label.style.visibility = this._showOnlySymbol ? 'hidden'  : 'visible';
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"showOnlySymbol": "' + (this._showOnlySymbol ? 'true' : 'false') + '"';
    }



    loadParams(_node)
    {
        if (_node.showOnlySymbol)
            this._showOnlySymbol = _node.showOnlySymbol == 'true';

        super.loadParams(_node);
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