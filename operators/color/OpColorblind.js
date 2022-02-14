class   OpColorblind
extends OpColorBase
{
    #paramS;
    #paramM;
    #paramL;



    constructor()
    {
        super('colorblind', 'colorblind', 'color', 80);


        this.addInput (new  Input(this.dataType));
        this.addOutput(new Output(this.dataType));


        this.addParam(this.#paramS = new NumberParam('s', 'S', false, true, true, 2, 0, 2, 0));
        this.addParam(this.#paramM = new NumberParam('m', 'M', false, true, true, 2, 0, 2, 0));
        this.addParam(this.#paramL = new NumberParam('l', 'L', false, true, true, 2, 0, 2, 0));

        this.#paramS.allowEditDecimals = true;
        this.#paramM.allowEditDecimals = true;
        this.#paramL.allowEditDecimals = true;


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


            if (!isValidRgb(rgb))
            {
                this.warningStyle = this.getDefaultWarningStyle(validRgb);
                valid             = false;
            }

            this.forceShowWarning = 
                   this.inputs[0].isConnected
                && !isValidRgb(rgb);        
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

        this.setParamText(this.#paramS, 'S');
        this.setParamText(this.#paramM, 'M');
        this.setParamText(this.#paramL, 'L');
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