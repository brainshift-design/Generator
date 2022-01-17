class   OpArithmetic
extends Operator
{
    #paramValue;

    _symbol;
    _showOnlySymbol;


    constructor(opType, shortType, symbol)
    {
        super(opType, shortType, 'number', 65);

        this.addNewInput();
        this.addOutput(new Output(this.dataType));
        
        this.addParam(this.#paramValue = new NumberParam('', false, false));

        this.#paramValue.control.pointerEvents   = false;
        this.#paramValue.control.style.fontStyle = 'italic';


        this._symbol = document.createElement('div');
        this._symbol.className = 'arithmeticSymbol';
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
    }



    refresh()
    {
        super.refresh();
        
        this._sampled = Number.NaN;
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
        const inputSize = 10;
        const padding   =  8;
        const gap       =  4;

            
        let height = padding;

        for (let i = 0; i < this.inputs.length; i++)
        {
            const input = this.inputs[i];
            
            if (i > 0)
                height += gap;

            input.control.style.top       = height;
            input.control.style.transform = 'none';

            height += inputSize;
        }

        height += padding;


        this.header.style.height = height;


        if (this._showOnlySymbol)
        {
            this._symbol.style.fontSize = 20;
            this._symbol.style.left     = 'calc(50% + 1.5px)';
            this._symbol.style.top      = height/2 - 14;
        }
        else
        {
            this._symbol.style.fontSize = 12;
            this._symbol.style.left     = 'calc(50% + 3px)';
            this._symbol.style.top      = height/2 - 2;
            this.label  .style.top      = 'calc(50% - 3px)';
        }
       
        
        this.label.style.visibility = this._showOnlySymbol ? 'hidden'  : 'visible';


        super.updateNode();
    }
}



function onConnectInput(op)
{
    op.addNewInput(); 

    op.invalidate();
    op.update();

    updateGraphNode(op);
}



function onDisconnectInput(op, input)
{
    removeFromArray(op.inputs, input); 

    op.invalidate();
    op.update();

    updateGraphNode(op);
}