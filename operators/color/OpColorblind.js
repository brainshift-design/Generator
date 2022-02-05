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


        this.addParam(this.#paramL = new NumberParam('l', 'L', false, true, true, 2, 0, 2, 0));
        this.addParam(this.#paramM = new NumberParam('m', 'M', false, true, true, 2, 0, 2, 0));
        this.addParam(this.#paramS = new NumberParam('s', 'S', false, true, true, 2, 0, 2, 0));

        this.#paramL.allowEditDecimals = true;
        this.#paramM.allowEditDecimals = true;
        this.#paramS.allowEditDecimals = true;

        this.header.connectionPadding = 14;
    }



    updateData()
    {
        super.updateData()


        if (this.inputs[0].isConnected)
        {
            const rgb = dataColor2rgb(this.inputs[0].data.color);

            this._color = rgb2dataColor(
                rgb2colorblind(
                    invalid2validRgb(rgb),
                    this.#paramL.value / 2,
                    this.#paramM.value / 2,
                    this.#paramS.value / 2));
        }
        else 
            this._color = dataColor_NaN;

        
        this.forceShowWarning = 
                this.inputs[0].isConnected
            && !isValidRgb(dataColor2rgb(this.inputs[0].data.color));


        this.outputs[0]._data = dataFromDataColor(this._color);
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
        else if (v == 1) param.control.valueText = cone + ' Weak';
        else             param.control.valueText = cone + ' Blind';
    }
}