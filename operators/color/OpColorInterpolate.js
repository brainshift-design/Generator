class   OpColorInterpolate
extends OpColorBase
{
    #paramSpace;
    #paramAmount;
    #paramGamma;



    constructor()
    {
        super('colorinterpolate', 'inter', 'color', 80);

        
        this.addInput(new Input(this.dataType));
        this.addInput(new Input(this.dataType));

        this.addOutput(new Output(this.dataType));


        this.addParam(this.#paramSpace  = new SelectParam('space',  '',  true,  true, OpColorSpaces.map(s => s[1])));
        this.addParam(this.#paramAmount = new NumberParam('amount', '',  false, true, true, 0, 0,    1, 2));
        this.addParam(this.#paramGamma  = new NumberParam('gamma',  'γ', true,  true, true, 1, 0.01, 3, 2));
      
        
        this.#paramSpace.control.min        = 2;
        this.#paramSpace.control.displayMin = 2;
        
        this.#paramAmount.control.min = Number.MIN_SAFE_INTEGER;
        this.#paramAmount.control.max = Number.MAX_SAFE_INTEGER;

        this.#paramGamma.control.max  = 10;


        this.inputs[0].addEventListener('connect', () => 
        {
            if (!this.inputs[1].isConnected) 
                this.#paramSpace.setValue(
                    OpColorSpaces.findIndex(s => s[0] == this.inputs[0].data.color[0]),
                    true, true, false);
        });

        this.inputs[1].addEventListener('connect', () => 
        {
            if (!this.inputs[0].isConnected) 
                this.#paramSpace.setValue(
                    OpColorSpaces.findIndex(s => s[0] == this.inputs[1].data.color[0]),
                    true, true, false);
        });
    }



    updateData()
    {
        //log(this.name + '.OpColorInterpolate.updateData()');

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

            this._color = [
                space, 
                col[0], 
                col[1], 
                col[2] ];
        }

        else if(this.inputs[0].isConnected) this._color = this.inputs[0].data.color;
        else if(this.inputs[1].isConnected) this._color = this.inputs[1].data.color;
        else                                this._color = dataColor_NaN;


        this.outputs[0]._data = dataFromDataColor(this._color);


        super.updateData()
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



    // updateHeader()
    // {
    //     log(this.name + '.OpColorInterpolate.updateHeader()');



    //     super.updateHeader();
    // }



    // updateWarningOverlay()
    // {
    //     if (   this.inputs[0].isConnected
    //         || this.inputs[1].isConnected)
    //     {
    //         const colBack = dataColor2rgb(this._color);

    //         if (!isValidRgb(colBack))
    //         {
    //             const colWarning = 
    //                 isDark(colBack) 
    //                 ? [0, 0, 0, 0.12]  
    //                 : [1, 1, 1, 0.2 ];

    //             this.updateWarningOverlayStyle(colorStyleRgba(colWarning));
    //         }
    //         else
    //             this._warningOverlay.style.display = 'none';
    //     }
    //     else
    //         this.updateWarningOverlayStyle(colorStyleRgba([0.5, 1, 0.5, 0.2]));


    //     super.updateWarningOverlay();
    // }



    // loadParams(_node)
    // {
    //     for (const _param of _node.params)
    //     {
    //         switch (_param[0])
    //         {
    //             case 'space':
    //                 this.#paramSpace.setValue(parseInt(_param[1]), true, true, false);
    //                 break;

    //             case 'amount':
    //                 this.#paramAmount.setValue(parseFloat(_param[1]), true, true, false);
    //                 this.#paramAmount.setDecimalsFrom(_param[1]);
    //                 break;

    //             case 'gamma':
    //                 this.#paramGamma.setValue(parseFloat(_param[1]), true, true, false);
    //                 this.#paramGamma.setDecimalsFrom(_param[1]);
    //                 break;
    //         }
    //     }
    // }
}