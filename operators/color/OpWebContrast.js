class   OpWebContrast
extends OpColorBase
{
    #paramStandard;
    #paramValue;



    constructor()
    {
        super('webcontrast', 'contrast', 'color', 80);


        this.addInput(new Input(this.dataType));
        this.addInput(new Input(this.dataType));


        this.addParam(this.#paramValue    = new NumberParam('value',    '', false, false, true, 0, 0));
        this.addParam(this.#paramStandard = new SelectParam('standard', '', true,  true, ['WCAG 2', 'WCAG 3'], 1));
      

        enableSliderText(this.#paramValue.control, false);
    }



    updateData()
    {
        //log(this.idName + '.OpWebContrast.updateData()');

        this._color = 
            this.inputs[1].isConnected
            ? this.inputs[1].data.color
            : dataColor_NaN;


        if (   this.inputs[0].isConnected
            && this.inputs[1].isConnected)
        {
            this.#paramValue.control.valueText = '';


            const rgb0 = dataColor2rgb(this.inputs[0].data.color);
            const rgb1 = dataColor2rgb(this.inputs[1].data.color);
            
            if (   isValidRgb(rgb0) && this.inputs[0].data.isValid
                && isValidRgb(rgb1) && this.inputs[1].data.isValid)
            {
                if (this.#paramStandard.value == 0)
                {
                    const ratio = getContrastRatio2(
                        dataColor2rgb(this.inputs[0].data.color),
                        dataColor2rgb(this.inputs[1].data.color));

                    let rating = getContrastRating2(ratio);

                    if (rating != '')
                        rating = '&nbsp;&nbsp;' + rating;

                    this.#paramValue.control.min        = 
                    this.#paramValue.control.displayMin = 0;

                    this.#paramValue.control.max        = 
                    this.#paramValue.control.displayMax = 21;

                    this.#paramValue.control.setDecimals(2);

                    this.#paramValue.control.suffix = rating;
                    this.#paramValue.control.setValue(ratio);
                }
                else
                {
                    const ratio = getContrastRatio3(
                        dataColor2rgb(this.inputs[0].data.color),
                        dataColor2rgb(this.inputs[1].data.color));
                        
                    this.#paramValue.control.min        = 
                    this.#paramValue.control.displayMin = 0;

                    this.#paramValue.control.max        = 
                    this.#paramValue.control.displayMax = 108;

                    this.#paramValue.control.setDecimals(0);

                    this.#paramValue.control.suffix = '<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -8px; left: 1px;">c</span>';
                    this.#paramValue.control.setValue(Math.abs(ratio));
                }


                this.forceShowWarning = false;

                super.updateData();
                return;
            }

            else if ((!isValidRgb(rgb0) || !this.inputs[0].data.isValid)
                   &&  isValidRgb(rgb1) &&  this.inputs[1].data.isValid)
            {
                this.warningStyle     = colorStyleRgb_a(invalid2validRgb(rgb0), 0.3);
                this.forceShowWarning = true;
            }
            
            else if (  isValidRgb(rgb0) &&  this.inputs[0].data.isValid
                  && (!isValidRgb(rgb1) || !this.inputs[1].data.isValid))
            {
                this.warningStyle     = this.getDefaultWarningStyle(rgb1);
                this.forceShowWarning = true;
            }

            else
                this.forceShowWarning = false;
        }

        else if (this.inputs[1].isConnected)
        {
            const rgb1 = dataColor2rgb(this.inputs[1].data.color);
            
            this.forceShowWarning = 
                   !isValidRgb(rgb1) 
                || !this.inputs[1].data.isValid;
        }


        this.#paramValue.control.valueText = '?';
        this.#paramValue.setValue(0, false, true, false);

        
        super.updateData();
    }



    updateNode()
    {
        this.setRanges();
        
        super.updateNode();
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



    canShowColor()
    {
        return this.inputs[1].isConnected;
    }



    updateHeaderLabel()
    {
        if (   this.inputs[0].isConnected 
            && this.inputs[1].isConnected)
            this.label.style.color = colorStyleRgb(dataColor2rgb(this.inputs[0].data.color));
        else if (this.inputs[1].isConnected)
        {
            const [,,,, colText,] = this.getHeaderColors();
            this.label.style.color = colorStyleRgba(colText);
        }
        else 
            this.label.style.color = 'black';
    }
}