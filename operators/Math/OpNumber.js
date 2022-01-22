class   OpNumber
extends Operator
{
    #paramValue;



    constructor()
    {
        super('number', 'num', 'number', 70);

        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));

        this.addParam(this.#paramValue = new NumberParam('value', false, false, false));
        
        this.#paramValue.allowEditDecimals = true;
    }



    update()
    {
        if (!this.needsUpdate())
            return;
        
        if (this.inputs[0].isConnected)
        {
            this.#paramValue.control.dec = this.inputs[0].data.decimals;
            this.#paramValue.setValue(this.inputs[0].data.value, true, true, false);
        }
        
        this.outputs[0]._data = dataFromNumber(
                  this.#paramValue.value, 
                  this.#paramValue.control.dec);
                  
        super.update()
    }



    updateNode()
    {
        this.#paramValue.control.pointerEvents   = !this.inputs[0].isConnected;
        this.#paramValue.control.style.fontStyle = !this.inputs[0].isConnected ? 'normal' : 'italic';
        
        super.updateNode();
    }



    updateParams(dispatchEvents)
    {
        super.updateParams(dispatchEvents);

        this.outputs[0]._value = this.#paramValue.value;
    }



    generate()
    {
        //return 
    }



    loadParams(_node)
    {
        for (const _param of _node.params)
        {
            if (_param[0] == 'value')
            {
                this.#paramValue.setDecimals(_param[1]);
                this.#paramValue.setValue(parseFloat(_param[1]), true, true, false);
            }
        }
    }
}