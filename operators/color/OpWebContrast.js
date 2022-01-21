class   OpWebContrast
extends Operator
{
    #paramStandard;
    #paramValue;


    #warningOverlay;


    constructor()
    {
        super('webcontrast', 'contrast', 'color', 90);

        this.addInput(new Input(this.dataType));
        this.addInput(new Input(this.dataType));

        this.addParam(this.#paramStandard = new SelectParam('standard', true, true, ['WCAG 2', 'WCAG 3'], 1));
        this.addParam(this.#paramValue    = new NumberParam('value', false, false, true, 0));
      
        
        this.#paramStandard.addEventListener('change', () =>
        {
            this.setRanges();
        });

        this.#paramValue.control.pointerEvents   = false;
        this.#paramValue.control.style.fontStyle = 'italic';


        this.#warningOverlay = document.createElement('div');
        this.#warningOverlay.className = 'colorWarningOverlay';
        this.inner.appendChild(this.#warningOverlay);


        setTimeout(() => this.#paramStandard.setValue(1));
    }



    setRanges()
    {
        if (this.#paramStandard.value == 0)
            this.#paramValue.control.ranges = [];
        else
        {
            this.#paramValue.control.ranges = [
                new NumberSliderRange( 0/108,  15/108, 'rgba(255,   0,  64, 0.2 )', 0.8),
                new NumberSliderRange(15/108,  30/108, 'rgba(255, 112,   0, 0.2 )', 0.8),
                new NumberSliderRange(30/108,  45/108, 'rgba(255, 185,   0, 0.2 )', 0.8),
                new NumberSliderRange(45/108,  60/108, 'rgba(255, 255,   0, 0.2 )', 0.8),
                new NumberSliderRange(60/108,  75/108, 'rgba(64,  255,  64, 0.2 )', 0.8),
                new NumberSliderRange(75/108,  90/108, 'rgba(0,     0, 255, 0.07)', 0.8),
                new NumberSliderRange(90/108, 108/108, 'transparent')];
        }

        this.#paramValue.control.update();
    }



    update()
    {
        if (!this.needsUpdate())
            return;


        if (this.inputs[0].isConnected)
            this.inputs[0].connectedOutput.op.update();
            
        if (this.inputs[1].isConnected)
            this.inputs[1].connectedOutput.op.update();

            
        if (   this.inputs[0].isConnected
            && this.inputs[1].isConnected)
        {
            this.#paramValue.control.valueText = '';


            const rgb0 = dataColor2rgb(this.inputs[0].data.color);
            const rgb1 = dataColor2rgb(this.inputs[1].data.color);
            
            if (   isValidRgb(rgb0)
                && isValidRgb(rgb1))
            {
                if (this.#paramStandard.value == 0)
                {
                    const ratio = getContrastRatio2(
                        dataColor2rgb(this.inputs[0].data.color),
                        dataColor2rgb(this.inputs[1].data.color));

                    let rating = getContrastRating2(ratio);

                    if (rating != '')
                        rating = '&nbsp;&nbsp;' + rating;

                    this.#paramValue.control.min    = 0;
                    this.#paramValue.control.max    = 21;
                    this.#paramValue.control.suffix = rating;
                    this.#paramValue.control.setValue(ratio);
                }
                else
                {
                    const ratio = getContrastRatio3(
                        dataColor2rgb(this.inputs[0].data.color),
                        dataColor2rgb(this.inputs[1].data.color));
                        
                    this.#paramValue.control.min    = 0;
                    this.#paramValue.control.max    = 108;
                    this.#paramValue.control.suffix = '<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -8px; left: 1px;">c</span>';
                    this.#paramValue.control.setValue(Math.abs(ratio));
                }


                super.update();
                return;
            }
            
        }


        this.#paramValue.control.valueText = '?';
        this.#paramValue.setValue(0, false, true, false);

           
        super.update()
    }



    updateNode()
    {
        if (   this.inputs[0].isConnected
            && this.inputs[1].isConnected)
        {
            const rgb0 = dataColor2rgb(this.inputs[0].data.color);
            const rgb1 = dataColor2rgb(this.inputs[1].data.color);
            
            if (   !isValidRgb(rgb0)
                || !isValidRgb(rgb1))
            {
                const colBack = 
                    this.inputs[1].isConnected
                    ? dataColor2rgb(this.inputs[1].data.color)
                    : rgbFromDataType(this._dataType);

                const darkText = rgb2hclokl(colBack)[2] > 0.71;

                const colWarning   = darkText ? [0, 0, 0, 0.12] : [1, 1, 1, 0.2];
                const warningStyle = colorStyleRgba(colWarning);
        
                this.#warningOverlay.style.background =
                    'repeating-linear-gradient('
                    + '-45deg, '
                    + 'transparent 0 7px,'
                    +  warningStyle + ' 7px 14px)';
            }
            else
            {
                this.#warningOverlay.style.background = 'transparent';
            }
        }
             
        super.updateNode();
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