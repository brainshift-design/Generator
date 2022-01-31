class   OpColorInterpolate
extends Operator
{
    #paramSpace;
    #paramFactor;


    #warningOverlay;


    _color;


    constructor()
    {
        super('colorinterpolate', 'lerp', 'color', 90);

        this._color = ['rgb', 0.5, 0.5, 0.5];


        this.addInput(new Input(this.dataType));
        this.addInput(new Input(this.dataType));

        this.addOutput(new Output(this.dataType));


        this.addParam(this.#paramSpace  = new SelectParam('space',  true,  true, OpColorSpaces.map(s => s[1])));
        this.addParam(this.#paramFactor = new NumberParam('factor', false, true,  true, 0, 0, 1, 2));
      
        this.#paramSpace.control.min = 2;
        this.#paramSpace.control.setValue(this.#paramSpace.control.value, false, false, false);

        // this.#paramValue.control.readOnly        = true;
        // this.#paramValue.control.style.fontStyle = 'italic';


        this.#warningOverlay = createDiv('colorWarningOverlay');
        this.#warningOverlay.style.zIndex = 1;
        this.header.appendChild(this.#warningOverlay);
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
        //     this.#paramValue.control.valueText = '';


            const rgb0 = dataColor2rgb(this.inputs[0].data.color);
            const rgb1 = dataColor2rgb(this.inputs[1].data.color);
            
            if (   isValidRgb(rgb0)
                && isValidRgb(rgb1))
            {
                const col0 = dataColor2rgb(this.inputs[0].data.color);
                const col1 = dataColor2rgb(this.inputs[1].data.color);
                const f    = this.#paramFactor.value;

                const col = rgbLerp(col0, col1, f);

                this._color = rgb2dataColor(col);
                this.outputs[0]._data = dataFromDataColor(this._color);
                
//              this.#paramValue.control.min    = 0;
//              this.#paramValue.control.max    = 108;
//              this.#paramValue.control.suffix = '<span style="font-size: 5; position: relative; top: -7px; left: 2px;">L</span><span style="font-size: 3; font-weight: bold; position: relative; top: -8px; left: 1px;">c</span>';
//              this.#paramValue.control.setValue(Math.abs(ratio));

                super.update();
                return;
            }
        }


        // this.#paramValue.control.valueText = '?';
        // this.#paramValue.setValue(0, false, true, false);

           
        super.update()
    }



    updateNode()
    {
        if (   this.inputs[0].isConnected
            && this.inputs[1].isConnected)
        {
            const colBack = dataColor2rgb(this.inputs[1].data.color);

            const rgb0    = dataColor2rgb(this.inputs[0].data.color);
            const rgb1    = dataColor2rgb(this.inputs[1].data.color);

            if (   !isValidRgb(rgb0)
                || !isValidRgb(rgb1))
            {
                const colWarning = 
                      !isValidRgb(rgb0)
                    && maxRgbDistance(
                        rgb2hclokl(invalid2validRgb(rgb0)), 
                        rgb2hclokl(invalid2validRgb(rgb1))) > 0.15
                    ? rgb_a(invalid2validRgb(rgb0), 0.25)
                    : (isDark(colBack)
                       ? [0, 0, 0, 0.12] 
                       : [1, 1, 1, 0.2]);

                this.updateWarningOverlay(colorStyleRgba(colWarning));
            }
            else
            {
                this.#warningOverlay.style.display = 'none';
            }
        }
        else
        {
            let colWarning;

            if (this.inputs[1].isConnected)
            {
                const colBack  = dataColor2rgb(this.inputs[1].data.color);
                const darkText = rgb2hclokl(colBack)[2] > 0.71;
    
                colWarning = darkText ? [0, 0, 0, 0.1] : [1, 1, 1, 0.16];
            }
            else
                colWarning = [0.5, 1, 0.5, 0.2];

            
            this.updateWarningOverlay(colorStyleRgba(colWarning));
        }


        super.updateNode();
    }



    updateHeader()
    {
        const colBack = 
            this.inputs[1].isConnected
            ? dataColor2rgb(this.inputs[1].data.color)
            : dataType2rgb(this._dataType);

        const darkText = rgb2hclokl(colBack)[2] > 0.71;
        const colText  = darkText ? [0, 0, 0, 0.24] : [1, 1, 1, 0.4];


        for (const input of this.inputs.filter(i => !i.param))
        {
            input.wireColor = colBack;
            input.color     = colText;
            
            input.updateControl();
        }


        for (const output of this.outputs.filter(i => !i.param))
        {
            output.wireColor = colBack;
            output.color     = colText;

            output.updateControl();
        }


        if (   this.inputs[0].isConnected 
            && this.inputs[1].isConnected)
        {
            const colBack   = dataColor2rgb(this._color);
 
            const darkText  = rgb2hclokl(colBack)[2] > 0.71;
     
            const colText   = darkText 
                              ? [0, 0, 0, isValidRgb(colBack) ? 0.12 : 0.4 ] 
                              : [1, 1, 1, isValidRgb(colBack) ? 0.14 : 0.35];
            
            const textStyle = colorStyleRgba(colText);
    
            this.label .style.color      = textStyle;
            this.header.style.background = colorStyleRgb(colBack);
        }
        else 
        {
            this.label .style.color      = 'black';
            this.header.style.background = '#ead8eaee';
        }


        this.header.style.background = 
               this.inputs[0].isConnected 
            && this.inputs[1].isConnected 
            ? colorStyleRgb(dataColor2rgb(this._color))
            : '#ead8eaee';//colorStyleRgb_a(dataType2rgb(this._dataType, false), 0.95);
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
}