class   OpColorInterpolate
extends Operator
{
    #paramSpace;
    #paramAmount;
    #paramGamma;


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
        this.addParam(this.#paramAmount = new NumberParam('amount', true, true,  true, 0, 0, 1, 2));
        this.addParam(this.#paramGamma  = new NumberParam('gamma',  true, true,  true, 1, 0.01, 4, 2));
      
        this.#paramSpace.control.min = 2;
        this.#paramSpace.control.setValue(this.#paramSpace.control.value, false, false, false);

        // this.#paramGamma.control.name = 'γ';
        // this.#paramGamma.control.update();

        // this.#paramValue.control.readOnly        = true;
        // this.#paramValue.control.style.fontStyle = 'italic';


        this.inputs[0].addEventListener('connect', () => 
        {
            if (!this.inputs[1].isConnected) 
                this.#paramSpace.setValue(
                    OpColorSpaces.findIndex(s => s[0] == this.inputs[0].data.color[0]));
        });

        this.inputs[1].addEventListener('connect', () => 
        {
            if (!this.inputs[0].isConnected) 
                this.#paramSpace.setValue(
                    OpColorSpaces.findIndex(s => s[0] == this.inputs[1].data.color[0]));
        });


        this.#warningOverlay = createDiv('colorWarningOverlay');
        this.#warningOverlay.style.zIndex = 1;
        this.header.appendChild(this.#warningOverlay);
    }



    interpolate(space, col0, col1, f, gamma)
    {
        const iSpace = OpColorSpaces.findIndex(s => s[0] == space);

        const hasHue = 
               iSpace >= 3
            && iSpace <= 7;

        
        let h0, h1;

        if (hasHue)
        {
            h0 = col0[0] * Tau;
            h1 = col1[0] * Tau;
        }

        col0 = rgbPow(col0, gamma);
        col1 = rgbPow(col1, gamma);

        let col = rgbAdd(col0, rgbMuls(rgbSub(col1, col0), f));
        col = rgbPow(col, 1/gamma);

        if (hasHue)
            col[0] = normalAngle(h0 + angleDiff(h0, h1) * f) / Tau;

        return col;
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
            const space = OpColorSpaces[this.#paramSpace.value][0];
            const f     = this.#paramAmount.value;
            const gamma = this.#paramGamma .value;
            
            const col   = this.interpolate(
                space,
                dataColor2array(convertDataColorToSpace(this.inputs[0].data.color, space)),
                dataColor2array(convertDataColorToSpace(this.inputs[1].data.color, space)),
                f,
                gamma);

            this._color = [space, col[0], col[1], col[2]];
            this.outputs[0]._data = dataFromDataColor(this._color);
        }
        else if(this.inputs[0].isConnected)
        {
            this._color = this.inputs[0].data.color;
            this.outputs[0]._data = dataFromDataColor(this._color);
        }
        else if(this.inputs[1].isConnected)
        {
            this._color = this.inputs[1].data.color;
            this.outputs[0]._data = dataFromDataColor(this._color);
        }


        super.update()
    }



    updateNode()
    {
        if (   this.inputs[0].isConnected
            || this.inputs[1].isConnected)
        {
            const colBack = dataColor2rgb(this._color);

            if (!isValidRgb(colBack))
            {
                const colWarning = 
                    isDark(colBack) 
                    ? [0, 0, 0, 0.12]  
                    : [1, 1, 1, 0.2 ];

                this.updateWarningOverlay(colorStyleRgba(colWarning));
            }
            else
                this.#warningOverlay.style.display = 'none';
        }
        else
            this.updateWarningOverlay(colorStyleRgba([0.5, 1, 0.5, 0.2]));


        super.updateNode();
    }



    updateHeader()
    {
        const colBack = 
            this.inputs[1].isConnected
            ? dataColor2rgb(this.inputs[1].data.color)
            : dataType2rgb(this._dataType);

        const darkText = rgb2hclokl(colBack)[2] > 0.71;
        const satBias  = Math.min(Math.max(0, ((rgb2hsv(invalid2validRgb(colBack))[1] - 0.7) / 0.3), 1));
        
        const colText = 
            darkText 
            ? [0, 0, 0, 0.24 * (1 + satBias)] 
            : [1, 1, 1, 0.4  * (1 + satBias)];


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
            || this.inputs[1].isConnected)
        {
            const colBack   = dataColor2rgb(this._color);
            const darkText  = rgb2hclokl(colBack)[2] > 0.71;
            const colText   = darkText 
                              ? [0, 0, 0, (isValidRgb(colBack) ? 0.12 : 0.4 ) * (1 + satBias)] 
                              : [1, 1, 1, (isValidRgb(colBack) ? 0.14 : 0.35) * (1 + satBias)];
            
            const textStyle = colorStyleRgba(colText);
    
            this.label .style.color      = textStyle;
            this.header.style.background = colorStyleRgb(colBack);

            this.inputs [0].color        = colText;
            this.inputs [1].color        = colText;
            this.outputs[0].color        = colText;
            this.outputs[0].wireColor    = colBack;
        }
        else 
        {
            this.label .style.color      = 'black';
            this.header.style.background = '#ead8eaee';
        }
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
                case 'space':
                    this.#paramSpace.setValue(parseInt(_param[1]), true, true, false);
                    break;

                case 'amount':
                    this.#paramAmount.setValue(parseFloat(_param[1]), true, true, false);
                    this.#paramAmount.setDecimalsFrom(_param[1]);
                    break;

                case 'gamma':
                    this.#paramGamma.setValue(parseFloat(_param[1]), true, true, false);
                    this.#paramGamma.setDecimalsFrom(_param[1]);
                    break;
            }
        }
    }
}