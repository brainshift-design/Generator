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
            
            const col = rgbLerp(
                dataColor2array(convertDataColorToSpace(this.inputs[0].data.color, space)),
                dataColor2array(convertDataColorToSpace(this.inputs[1].data.color, space)),
                this.#paramFactor.value);

            this._color = [
                space,
                col[0],
                col[1],
                col[2] ];

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
            || this.inputs[1].isConnected)
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