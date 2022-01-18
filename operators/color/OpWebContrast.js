class   OpWebContrast
extends Operator
{
    #standard;
    #value;



    constructor()
    {
        super('webcontrast', 'contrast', 'color', 90);

        this.addInput(new Input(this.dataType));
        this.addInput(new Input(this.dataType));

        this.addParam(this.#standard = new SelectParam('standard', true, true, ['WCAG 2', 'WCAG 3']));
        this.addParam(this.#value    = new NumberParam('', false, true, 0, 0, 100));
        
        this.#value.control.pointerEvents   = false;
        this.#value.control.style.fontStyle = 'italic';

         setTimeout(() => this.#standard.setValue(1));
    }



    update()
    {
        if (!this.needsUpdate())
            return;

            
        if (   this.inputs[0].isConnected
            && this.inputs[1].isConnected)
        {
            this.#value.control.valueText = '';

            if (this.#standard.value == 0)
            {
                const ratio = getContrastRatio2(
                    dataColor2rgb(this.inputs[0].data.color),
                    dataColor2rgb(this.inputs[1].data.color));

                let rating = getContrastRating2(ratio);

                if (rating != '')
                    rating = '&nbsp;&nbsp;' + rating;

                this.#value.control.min    = 0;
                this.#value.control.max    = 21;
                this.#value.control.suffix = rating;
                this.#value.control.setValue(ratio);
            }
            else
            {
                const ratio = getContrastRatio3(
                    dataColor2rgb(this.inputs[0].data.color),
                    dataColor2rgb(this.inputs[1].data.color));
                    
                this.#value.control.min    = -110;
                this.#value.control.max    =  110;
                this.#value.control.suffix = '';
                this.#value.control.setValue(ratio);
            }
        }
        else
        {
            this.#value.control.valueText = '?';
            this.#value.setValue(0);
        }

           
        super.update()
    }



    updateHeader()
    {
        const colBack = 
            this.inputs[1].isConnected
            ? dataColor2rgb(this.inputs[1].data.color)
            : rgbFromDataType(this._dataType);

        const darkText = rgb2hclokl(colBack)[2] > 0.71;

        const colText = darkText ? [0, 0, 0, 0.24] : [1, 1, 1, 0.4];


        for (const input of this.inputs.filter(i => !i.param))
        {
            const colIn = colorStyleRgba(colText, darkText ? 0.08 : 0.16);

            input.wireColor = colBack;
            input.color     = colIn;
            
            input.updateControl();
        }


        for (const output of this.outputs.filter(i => !i.param))
        {
            const colOut = colorStyleRgba(colText, darkText ? 0.06 : 0.12);

            output.wireColor = colBack;
            output.color     = colOut;

            output.updateControl();
        }


        this.label.style.fontWeight = 
               this.inputs[0].isConnected
            && this.inputs[1].isConnected
            ? 'bold'
            : 'normal';


        if (   this.inputs[0].isConnected 
            && this.inputs[1].isConnected)
            this.label.style.color = colorStyleRgb(dataColor2rgb(this.inputs[0].data.color));
        else if (this.inputs[0].isConnected)
            this.label.style.color = 'black';
        else if (this.inputs[1].isConnected)
            this.label.style.color = colorStyleRgba(colText);


        this.header.style.background = 
            this.inputs[1].isConnected 
            ? colorStyleRgb(dataColor2rgb(this.inputs[1].data.color))
            : colorStyleRgb(rgbFromDataType(this._dataType, false));
    }



    // updateParams(dispatchEvents)
    // {
    //     super.updateParams(dispatchEvents);

    //     // this.outputs[0]._value = this.#value.value;
    // }



    // generate(callerInput)
    // {
    //     if (this.valid) return;
    //     super.generate(callerInput);


    //     if (isNaN(this._sampled))
    //         this._sampled = this._value.value;

    //     this.output._data = dataFromNumber(this._sampled);
    // }
}