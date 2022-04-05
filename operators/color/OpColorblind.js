class   OpColorblind
extends OpColorBase
{
    #paramL;
    #paramM;
    #paramS;



    constructor()
    {
        super('colorblind', 'colorblind', 'color', 80);


        this.addInput (new  Input(this.dataType));
        this.addOutput(new Output(this.dataType));


        this.addParam(this.#paramL = new NumberParam('l', 'L', false, true, true, 2, 0, 2, 0, 0.02));
        this.addParam(this.#paramM = new NumberParam('m', 'M', false, true, true, 2, 0, 2, 0, 0.02));
        this.addParam(this.#paramS = new NumberParam('s', 'S', false, true, true, 2, 0, 2, 0, 0.02));

        this.#paramL.addEventListener('change', () => this.#paramL.control.dragScale = getDecimalCount(getNumberString(this.#paramL.value, this.#paramL.control.displayDec)) == 0 ? 0.02 : 0.05);
        this.#paramM.addEventListener('change', () => this.#paramM.control.dragScale = getDecimalCount(getNumberString(this.#paramM.value, this.#paramM.control.displayDec)) == 0 ? 0.02 : 0.05);
        this.#paramS.addEventListener('change', () => this.#paramS.control.dragScale = getDecimalCount(getNumberString(this.#paramS.value, this.#paramS.control.displayDec)) == 0 ? 0.02 : 0.05);


        this.header.connectionPadding = 18;
    }



    updateData()
    {
        super.updateData()


        let valid = true;
        
        if (this.inputs[0].isConnected)
        {
            const rgb      = dataColor2rgb(this.inputs[0].data.color);
            const validRgb = invalid2validRgb(rgb);
            
            const cb = rgb2colorblind(
                validRgb,
                this.#paramL.value / 2,
                this.#paramM.value / 2,
                this.#paramS.value / 2);

            const validCb = invalid2validRgb(cb);

            this._color = rgb2dataColor(validCb);


            if (!isRgbValid(rgb))
            {
                this.warningStyle = this.getDefaultWarningStyle(validRgb);
                valid             = false;
            }

            this.forceShowWarning = 
                   this.inputs[0].isConnected
                && !isRgbValid(rgb);        
        }
        else 
        {
            this._color = dataColor_NaN;
            this.forceShowWarning = false;

            valid = false;
        }
                

        this.outputs[0]._data = dataFromDataColor(this._color);

        if (  !valid
            || this.forceShowWarning) 
            this.outputs[0]._data.isValid = false;
    }



    updateParams(dispatchEvents)
    {
        super.updateParams(dispatchEvents);

        this.setParamText(this.#paramL, 'L');
        this.setParamText(this.#paramM, 'M');
        this.setParamText(this.#paramS, 'S');
    }



    setParamText(param, cone)
    {
        const v = Math.round(param.value);

             if (v == 2) param.control.valueText = cone;
        else if (v == 1) param.control.valueText = cone + ' weak';
        else             param.control.valueText = cone + ' blind';
    }



    canShowColor()
    {
        return this.inputs[0].isConnected;
    }
}