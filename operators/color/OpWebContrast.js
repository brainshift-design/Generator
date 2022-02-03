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


        this.addParam(this.#paramValue    = new NumberParam('value',    false, false, true, 0));
        this.addParam(this.#paramStandard = new SelectParam('standard', true,  true, ['WCAG 2', 'WCAG 3'], 1));
      

        this.#paramStandard.control.barHeight = 0.2;

        this.#paramValue.control.readOnly        = true;
        this.#paramValue.control.style.fontStyle = 'italic';
    }



    update()
    {
        if (this.valid) return;


        if (this.inputs[0].isConnected) this.inputs[0].connectedOutput.op.update();
        if (this.inputs[1].isConnected) this.inputs[1].connectedOutput.op.update();


        this.updateParams(false);

        
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



    // updateHeader()
    // {
    //     const colBack = 
    //         this.inputs[1].isConnected
    //         ? dataColor2rgb(this.inputs[1].data.color)
    //         : dataType2rgb(this._dataType);

    //     const darkText = rgb2hclokl(colBack)[2] > 0.71;
    //     const satBias  = Math.min(Math.max(0, ((rgb2hsv(invalid2validRgb(colBack))[1] - 0.7) / 0.3), 1));
        
    //     const colText = 
    //         darkText 
    //         ? [0, 0, 0, 0.24 * (1 + satBias)] 
    //         : [1, 1, 1, 0.4  * (1 + satBias)];


    //     for (const input of this.inputs.filter(i => !i.param))
    //     {
    //         input.wireColor = colBack;
    //         input.color     = colText;
            
    //         input.updateControl();
    //     }


    //     for (const output of this.outputs.filter(i => !i.param))
    //     {
    //         output.wireColor = colBack;
    //         output.color     = colText;

    //         output.updateControl();
    //     }


    //     if (   this.inputs[0].isConnected 
    //         && this.inputs[1].isConnected)
    //         this.label.style.color = colorStyleRgb(dataColor2rgb(this.inputs[0].data.color));
    //     else if (this.inputs[1].isConnected)
    //         this.label.style.color = colorStyleRgba(colText);
    //     else 
    //         this.label.style.color = 'black';


    //     this.header.style.background = 
    //         this.inputs[1].isConnected 
    //         ? colorStyleRgb(dataColor2rgb(this.inputs[1].data.color))
    //         : '#ead8eaee';//colorStyleRgb_a(dataType2rgb(this._dataType, false), 0.95);


    //     super.updateHeader();
    // }



    // updateWarningOverlay()
    // {
    //     if (   this.inputs[0].isConnected
    //         && this.inputs[1].isConnected)
    //     {
    //         const colBack  = dataColor2rgb(this.inputs[1].data.color);

    //         const rgb0 = dataColor2rgb(this.inputs[0].data.color);
    //         const rgb1 = dataColor2rgb(this.inputs[1].data.color);

    //         if (   !isValidRgb(rgb0)
    //             || !isValidRgb(rgb1))
    //         {
    //             const colWarning = 
    //                   !isValidRgb(rgb0)
    //                 && maxRgbDistance(
    //                     rgb2hclokl(invalid2validRgb(rgb0)), 
    //                     rgb2hclokl(invalid2validRgb(rgb1))) > 0.15
    //                 ? rgb_a(invalid2validRgb(rgb0), 0.25)
    //                 : (isDark(colBack)
    //                    ? [0, 0, 0, 0.12] 
    //                    : [1, 1, 1, 0.2]);

    //             this.updateWarningOverlayStyle(colorStyleRgba(colWarning));
    //         }
    //         else
    //         {
    //             this._warningOverlay.style.display = 'none';
    //         }
    //     }
    //     else
    //     {
    //         let colWarning;

    //         if (this.inputs[1].isConnected)
    //         {
    //             const colBack  = dataColor2rgb(this.inputs[1].data.color);
    //             const darkText = rgb2hclokl(colBack)[2] > 0.71;
    //             const satBias  = Math.min(Math.max(0, ((rgb2hsv(invalid2validRgb(colBack))[1] - 0.7) / 0.3), 1));
    
    //             colWarning = 
    //                 darkText 
    //                 ? [0, 0, 0, 0.1  * (1 + satBias)] 
    //                 : [1, 1, 1, 0.16 * (1 + satBias)];
    //         }
    //         else
    //             colWarning = [0.5, 1, 0.5, 0.2];

            
    //         this.updateWarningOverlayStyle(colorStyleRgba(colWarning));
    //     }


    //     super.updateWarningOverlay();
    // }



    loadParams(_node)
    {
        for (const _param of _node.params)
        {
            switch (_param[0])
            {
                case 'standard':
                    this.#paramStandard.setValue(parseInt(_param[1]), true, true, false);
                    break;
            }
        }
    }
}