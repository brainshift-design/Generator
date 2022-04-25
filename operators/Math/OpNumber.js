class   OpNumber
extends OperatorBase
{
    #paramValue;



    constructor()
    {
        super(NUMBER, 'num', 70);

        this.addInput (new Input ([NUMBER]));
        this.addOutput(new Output(NUMBER, this.output_toString));

        this.addParam(this.#paramValue = new NumberParam('value', '', false, false, false));
        
        this.alwaysLoadParams = true;
    }



    // updateData() 
    // {
    //     if (this.inputs[0].connected)
    //     {
    //         this.#paramValue.control.setDecimals(this.inputs[0].data.decimals);
    //         this.#paramValue.setValue(this.inputs[0].data.value, true, true, false);
    //     }

    //     this.#paramValue.control.readOnly = this.inputs[0].connected;
        
    //     this.outputs[0]._data = dataFromNumber(
    //         this.#paramValue.value, 
    //         this.#paramValue.control.dec);
            
                  
//     super.updateData()
    // }



    output_toString()
    {
        // 'this' is the output

        if (this.cache != '') 
            return this.cache;


        const req = [
            this.type, 
            this.node.id];
                
                
        const input = this.node.inputs[0];

        req.push(...
            input.connected
            ? input.connectedOutput.toString()
            : [ this.node.#paramValue.value      .toString(),
                this.node.#paramValue.control.dec.toString() ]);

                
        return this.cache = [...req];
    }



    updateNode()
    {
        enableElementText(this.#paramValue.control, !this.inputs[0].connected);
        
        super.updateNode();
    }



    updateParams(dispatchEvents)
    {
        super.updateParams(dispatchEvents);

        this.outputs[0]._value = this.#paramValue.value;
    }



    loadParams(_node)
    {
        if (_node.decimals)
            this.#paramValue.setDecimals(parseInt(_node.decimals));

            
        super.loadParams(_node);
    }



    paramIsConsideredDefault(param)
    {
        return param.isDefault()
            && !this.inputs[0].connected;
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
        // let str = nodeType;

        // if (this.inputs[0].connected)
        //     str +=

        // return str;
    }
}