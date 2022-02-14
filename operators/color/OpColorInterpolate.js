class   OpColorInterpolate
extends OpColorBase
{
    #paramSpace;
    #paramAmount;



    constructor()
    {
        super('colorinterpolate', 'inter', 'color', 80);

        
        this.addInput(new Input(this.dataType));
        this.addInput(new Input(this.dataType));

        this.addOutput(new Output(this.dataType));


        this.addParam(this.#paramSpace  = new SelectParam('space',  '',  false, true, true, OpColorSpaces.map(s => s[1]), 1));
        this.addParam(this.#paramAmount = new NumberParam('amount', '',  true,  true, true, 0, 0,    1, 2));
      
        
        this.#paramSpace.control.min         = 1;
        this.#paramSpace.control.displayMin  = 1;
        this.#paramSpace.control.update();
        
        this.#paramAmount.control.min        = Number.MIN_SAFE_INTEGER;
        this.#paramAmount.control.max        = Number.MAX_SAFE_INTEGER;
        this.#paramAmount.allowEditDecimals  = true;
        this.#paramAmount.control.valueScale = 100;
        this.#paramAmount.control.displayDec = 0;

        this.#paramAmount.control.setSuffix('%', true);
        

        this.header.connectionPadding = 12.5;


        this.inputs[0].addEventListener('connect', () => 
        {
            if (   !this.inputs[1].isConnected
                && !graphView.loadingNodes) 
                this.#paramSpace.setValue(
                    colorSpaceIndex(this.inputs[0].data.color[0]),
                    true, true, false);
        });


        this.inputs[1].addEventListener('connect', () => 
        {
            if (   !this.inputs[0].isConnected
                && !graphView.loadingNodes) 
                this.#paramSpace.setValue(
                    colorSpaceIndex(this.inputs[1].data.color[0]),
                    true, true, false);
        });


        this.#paramSpace.control.addEventListener('change', () => hideTooltip(ttInterpolationSpace));


        createTooltip(ttInterpolationSpace);
        createTooltipSrc(this.#paramSpace.control, () => ttInterpolationSpace);
    }



    updateData()
    {
        //log(this.id + '.OpColorInterpolate.updateData()');

        if (   this.inputs[0].isConnected
            && this.inputs[1].isConnected)
        {
            const space = colorSpace(this.#paramSpace.value);
            const f     = this.#paramAmount.value;
            
            const col = this.interpolate(
                space,
                dataColor2array(convertDataColorToSpace(this.inputs[0].data.color, space)),
                dataColor2array(convertDataColorToSpace(this.inputs[1].data.color, space)),
                f);

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



    interpolate(space, col0, col1, f)
    {
        const iSpace = colorSpaceIndex(space);

        if (iSpace <= 1) // hex, rgb
        {
            return rgbAdd(col0, rgbMuls(rgbSub(col1, col0), f));
        }
        else // hsv, hsl, hcl
        {
            const h0 = col0[0] * Tau;
            const h1 = col1[0] * Tau;
            
            return [
                normalAngle(h0 + angleDiff(h0, h1) * f) / Tau,
                lerp(col0[1], col1[1], f),
                lerp(col0[2], col1[2], f) ];
        }
    }



    canShowColor()
    {
        return this.inputs[0].isConnected
            || this.inputs[1].isConnected;
    }
}