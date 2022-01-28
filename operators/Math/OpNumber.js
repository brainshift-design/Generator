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
        this.alwaysLoadParams = true;
    }



    update()
    {
        if (this.valid) return;

            
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
        this.#paramValue.control.readOnly        =  this.inputs[0].isConnected;
        this.#paramValue.control.style.fontStyle = !this.inputs[0].isConnected ? 'normal' : 'italic';
        
        super.updateNode();
    }



    updateParams(dispatchEvents)
    {
        super.updateParams(dispatchEvents);

        this.outputs[0]._value = this.#paramValue.value;
    }



    loadParams(_node)
    {
        if (_node.params)
        {
            for (const _param of _node.params)
            {
                if (_param[0] == 'value')
                {
                    this.#paramValue.setValue(parseFloat(_param[1]), true, true, false);
                    this.#paramValue.setDecimalsFrom(_param[1]);
                }
            }
        }
        else if (_node.decimals)
            this.#paramValue.setDecimals(parseInt(_node.decimals));
    }



    paramIsConsideredDefault(param)
    {
        return param.isDefault()
            && !this.inputs[0].isConnected;
    }



    toJsonBase(nTab)
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';


        let json = super.toJsonBase(nTab);

        if (this.#paramValue.control.dec != 0)
        {
            json += ',\n'
                + pos + tab + '"decimals": "' + this.#paramValue.control.dec + '"';
        }


        return json;
    }



    toString()
    {
        // let str = opType;

        // if (this.inputs[0].isConnected)
        //     str +=

        // return str;
    }
}