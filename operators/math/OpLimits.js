class   OpLimits
extends OperatorBase
{
    #paramMin;
    #paramMax;



    constructor()
    {
        super('limits', 'lim', 'number', 70);

        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));

        this.addParam(this.#paramMin = new NumberParam('min', true, true, true, 0));
        this.addParam(this.#paramMax = new NumberParam('max', true, true, true));
        
        this.#paramMin.addEventListener('change', () => this.#paramMax.control.setMin(this.#paramMin.value, false));
        this.#paramMax.addEventListener('change', () => this.#paramMin.control.setMax(this.#paramMax.value, false));
    }



    updateData()
    {
        if (this.inputs[0].isConnected)
        {
            this.#paramMin.control.dec = this.inputs[0].data.decimals;
            this.#paramMax.control.dec = this.inputs[0].data.decimals;
            
            this.outputs[0]._data = dataFromNumber(
                Math.min(Math.max(
                    this.#paramMin.value, 
                    this.inputs[0].data.value), 
                    this.#paramMax.value),
                this.inputs[0].data.decimals);
        }
        else
            this.outputs[0]._data = dataFromNumber(Number.Nan, 0);
            
                  
        super.updateData()
    }



    // loadParams(_node)
    // {
    //     for (const _param of _node.params)
    //     {
    //         switch (_param[0])
    //         {
    //             case 'min':
    //                 this.#paramMin.setValue(parseFloat(_param[1]), true, true, false);
    //                 this.#paramMin.setDecimalsFrom(_param[1]);
    //                 break;

    //             case 'max':
    //                 this.#paramMax.setValue(parseFloat(_param[1]), true, true, false);
    //                 this.#paramMax.setDecimalsFrom(_param[1]);
    //                 break;
    //         }
    //     }
    // }



    toString()
    {
        // let str = opType;

        // if (this.inputs[0].isConnected)
        //     str +=

        // return str;
    }
}