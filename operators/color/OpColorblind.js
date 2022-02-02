class   OpColorblind
extends Operator
{
    #paramL;
    #paramM;
    #paramS;


    #warningOverlay;


    constructor()
    {
        super('colorblind', 'blind', 'color', 80);

        this.addInput (new  Input(this.dataType));
        this.addOutput(new Output(this.dataType));

        this.addParam(this.#paramL = new SelectParam('L', true, true, ['L Blind', 'L Weak', 'L'], 2));
        this.addParam(this.#paramM = new SelectParam('M', true, true, ['M Blind', 'M Weak', 'M'], 2));
        this.addParam(this.#paramS = new SelectParam('S', true, true, ['S Blind', 'S Weak', 'S'], 2));
      
        this.header.connectionPadding = 14;
        // this.#paramStandard.control.barHeight = 0.2;

        // this.#paramValue.control.readOnly        = true;
        // this.#paramValue.control.style.fontStyle = 'italic';

        this.#warningOverlay = createDiv('colorWarningOverlay');
        this.#warningOverlay.style.zIndex = 1;
        this.header.appendChild(this.#warningOverlay);
    }



    update()
    {
        if (this.valid) return;


        // if (this.inputs[0].isConnected) this.inputs[0].connectedOutput.op.update();
        // if (this.inputs[1].isConnected) this.inputs[1].connectedOutput.op.update();


        // this.updateParams(false);

        
        // if (   this.inputs[0].isConnected
        //     && this.inputs[1].isConnected)
        // {
        //     this.#paramValue.control.valueText = '';


        //     const rgb0 = dataColor2rgb(this.inputs[0].data.color);
        //     const rgb1 = dataColor2rgb(this.inputs[1].data.color);
            
        //     if (   isValidRgb(rgb0)
        //         && isValidRgb(rgb1))
        //     {
        //         if (this.#paramStandard.value == 0)
        //         {
        //             const ratio = getContrastRatio2(
        //                 dataColor2rgb(this.inputs[0].data.color),
        //                 dataColor2rgb(this.inputs[1].data.color));

        //             let rating = getContrastRating2(ratio);

        //             if (rating != '')
        //                 rating = '&nbsp;&nbsp;' + rating;

        //             this.#paramValue.control.min    = 0;
        //             this.#paramValue.control.max    = 21;
        //             this.#paramValue.control.suffix = rating;
        //             this.#paramValue.control.setValue(ratio);
        //         }
        //         else
        //         {
        //             const ratio = getContrastRatio3(
        //                 dataColor2rgb(this.inputs[0].data.color),
        //                 dataColor2rgb(this.inputs[1].data.color));
                        
        //             this.#paramValue.control.min    = 0;
        //             this.#paramValue.control.max    = 108;
        //             this.#paramValue.control.suffix = '<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -8px; left: 1px;">c</span>';
        //             this.#paramValue.control.setValue(Math.abs(ratio));
        //         }


        //         super.update();
        //         return;
        //     }
            
        // }


        // this.#paramValue.control.valueText = '?';
        // this.#paramValue.setValue(0, false, true, false);

           
        super.update()
    }



    updateNode()
    {
        // if (   this.inputs[0].isConnected
        //     && this.inputs[1].isConnected)
        // {
        //     const colBack  = dataColor2rgb(this.inputs[1].data.color);

        //     const rgb0 = dataColor2rgb(this.inputs[0].data.color);
        //     const rgb1 = dataColor2rgb(this.inputs[1].data.color);

        //     if (   !isValidRgb(rgb0)
        //         || !isValidRgb(rgb1))
        //     {
        //         const colWarning = 
        //               !isValidRgb(rgb0)
        //             && maxRgbDistance(
        //                 rgb2hclokl(invalid2validRgb(rgb0)), 
        //                 rgb2hclokl(invalid2validRgb(rgb1))) > 0.15
        //             ? rgb_a(invalid2validRgb(rgb0), 0.25)
        //             : (isDark(colBack)
        //                ? [0, 0, 0, 0.12] 
        //                : [1, 1, 1, 0.2]);

        //         this.updateWarningOverlay(colorStyleRgba(colWarning));
        //     }
        //     else
        //     {
        //         this.#warningOverlay.style.display = 'none';
        //     }
        // }
        // else
        // {
        //     let colWarning;

        //     if (this.inputs[1].isConnected)
        //     {
        //         const colBack  = dataColor2rgb(this.inputs[1].data.color);
        //         const darkText = rgb2hclokl(colBack)[2] > 0.71;
        //         const satBias  = Math.min(Math.max(0, ((rgb2hsv(invalid2validRgb(colBack))[1] - 0.7) / 0.3), 1));
    
        //         colWarning = 
        //             darkText 
        //             ? [0, 0, 0, 0.1  * (1 + satBias)] 
        //             : [1, 1, 1, 0.16 * (1 + satBias)];
        //     }
        //     else
        //         colWarning = [0.5, 1, 0.5, 0.2];

            
        //     this.updateWarningOverlay(colorStyleRgba(colWarning));
        // }


        //this.#paramStandard.control.update();


        super.updateNode();
    }



    updateHeader()
    {
        // const colBack = 
        //     this.inputs[1].isConnected
        //     ? dataColor2rgb(this.inputs[1].data.color)
        //     : dataType2rgb(this._dataType);

        // const darkText = rgb2hclokl(colBack)[2] > 0.71;
        // const satBias  = Math.min(Math.max(0, ((rgb2hsv(invalid2validRgb(colBack))[1] - 0.7) / 0.3), 1));
        
        // const colText = 
        //     darkText 
        //     ? [0, 0, 0, 0.24 * (1 + satBias)] 
        //     : [1, 1, 1, 0.4  * (1 + satBias)];


        // for (const input of this.inputs.filter(i => !i.param))
        // {
        //     input.wireColor = colBack;
        //     input.color     = colText;
            
        //     input.updateControl();
        // }


        // for (const output of this.outputs.filter(i => !i.param))
        // {
        //     output.wireColor = colBack;
        //     output.color     = colText;

        //     output.updateControl();
        // }


        // if (   this.inputs[0].isConnected 
        //     && this.inputs[1].isConnected)
        //     this.label.style.color = colorStyleRgb(dataColor2rgb(this.inputs[0].data.color));
        // else if (this.inputs[1].isConnected)
        //     this.label.style.color = colorStyleRgba(colText);
        // else 
        //     this.label.style.color = 'black';


        // this.header.style.background = 
        //     this.inputs[1].isConnected 
        //     ? colorStyleRgb(dataColor2rgb(this.inputs[1].data.color))
        //     : '#ead8eaee';//colorStyleRgb_a(dataType2rgb(this._dataType, false), 0.95);
    }



    updateWarningOverlay(warningStyle)
    {
        this.#warningOverlay.style.display    = 'block';
        this.#warningOverlay.style.height     = 38;
        this.#warningOverlay.style.background =
            'repeating-linear-gradient('
            + '-45deg, '
            + 'transparent 0 7px,'
            +  warningStyle + ' 7px 14px)';
    }



    loadParams(_node)
    {
        for (const _param of _node.params)
        {
            switch (_param[0])
            {
                case 'L':
                    this.#paramL.setValue(parseInt(_param[1]), true, true, false);
                    break;

                case 'M':
                    this.#paramM.setValue(parseFloat(_param[1]), true, true, false);
                    break;

                case 'S':
                    this.#paramS.setValue(parseFloat(_param[1]), true, true, false);
                    break;
            }
        }
    }
}