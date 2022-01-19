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
        this.addParam(this.#value    = new NumberParam('', false, true, 0));
        
        this.#value.control.pointerEvents   = false;
        this.#value.control.style.fontStyle = 'italic';

         setTimeout(() => this.#standard.setValue(1));
    }



    update()
    {
        if (!this.needsUpdate())
            return;

            
        if (this.#standard.value == 0)
            this.#value.control.ranges = [];
        else
        {
            this.#value.control.ranges = [
                new NumberSliderRange( 0/108,  15/108, 'rgba(255,   0, 0, 0.2)'),
                new NumberSliderRange(15/108,  30/108, 'rgba(255,  68, 0, 0.2)'),
                new NumberSliderRange(30/108,  45/108, 'rgba(255, 105, 0, 0.2)'),
                new NumberSliderRange(45/108,  60/108, 'rgba(255, 136, 0, 0.2)'),
                new NumberSliderRange(60/108,  75/108, 'rgba(255, 204, 0, 0.2)'),
                new NumberSliderRange(75/108,  90/108, 'rgba(255, 255, 0, 0.2)'),
                new NumberSliderRange(90/108, 108/108, 'transparent')];
        }


        if (   this.inputs[0].isConnected
            && this.inputs[1].isConnected)
        {
            this.#value.control.valueText = '';


            const rgb0 = dataColor2rgb(this.inputs[0].data.color);
            const rgb1 = dataColor2rgb(this.inputs[1].data.color);
            
            if (   isValidRgb(rgb0)
                && isValidRgb(rgb1))
            {
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
                        
                    this.#value.control.min    = 0;
                    this.#value.control.max    = 108;
                    this.#value.control.suffix = '<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -8px; left: 1px;">c</span>';
                    this.#value.control.setValue(Math.abs(ratio));
                }


                super.update();
                return;
            }
            
        }


        this.#value.control.valueText = '?';
        this.#value.setValue(0, false, true, false);

           
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
}