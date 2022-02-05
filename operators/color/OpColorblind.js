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


        this.addParam(this.#paramL = new NumberParam('l', 'L', false, true, true, 1, 0, 1, 1));
        this.addParam(this.#paramM = new NumberParam('m', 'M', false, true, true, 1, 0, 1, 1));
        this.addParam(this.#paramS = new NumberParam('s', 'S', false, true, true, 1, 0, 1, 1));

        
        this.#paramL.addEventListener('change', () => this.setParamText(this.#paramL, 'L'));
        this.#paramM.addEventListener('change', () => this.setParamText(this.#paramM, 'M'));
        this.#paramS.addEventListener('change', () => this.setParamText(this.#paramS, 'S'));


        this.setParamText(this.#paramL, 'L');
        this.setParamText(this.#paramM, 'M');
        this.setParamText(this.#paramS, 'S');


        this.header.connectionPadding = 14;
    }



    setParamText(param, cone)
    {
        const v = Math.round(param.value * 2);

             if (v == 2) param.control.valueText = cone;
        else if (v == 1) param.control.valueText = cone + ' Weak';
        else             param.control.valueText = cone + ' Blind';
    }



    updateData()
    {
        if (this.inputs[0].isConnected)
        {
            const rgb = dataColor2rgb(this.inputs[0].data.color);

            this._color = rgb2dataColor(
                rgb2colorblind(
                    invalid2validRgb(rgb),
                    this.#paramL.value,
                    this.#paramM.value,
                    this.#paramS.value));

            this.forceShowWarning = !isValidRgb(rgb);
        }
        else 
        {
            this._color = dataColor_NaN;
        }

        
        this.outputs[0]._data = dataFromDataColor(this._color);
        
        
        super.updateData()
    }
}