class   OpValidColor
extends OpColorBase
{
    #paramSpace;
    #order;
    #paramMargin;



    constructor()
    {
        super('validcolor', 'valid', 'color', 80);

        
        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));


        this.addParam(this.#paramSpace = new SelectParam('space',  '',  true, true, OpColorSpaces.map(s => s[1])));
      
        this.#order = createTextbox('txtOrder');
        this.inner.appendChild(this.#order);

        this.addParam(this.#paramMargin = new NumberParam('margin', 'margin', true, true, true, 0, 0, 1, 1));


        this.#paramSpace.control.min         = 4;
        this.#paramSpace.control.displayMin  = 4;
        this.#paramSpace.control.update();


        this.inputs[0].addEventListener('connect', () => 
        {
            if (   !this.inputs[1].isConnected
                && !graphView.loadingNodes) 
                this.#paramSpace.setValue(
                    colorSpaceIndex(this.inputs[0].data.color[0]),
                    true, true, false);
        });
    }



    updateData()
    {
        //log(this.id + '.OpValidColor.updateData()');

        if (this.inputs[0].isConnected)
        {
        //     const space = colorSpace(this.#paramSpace.value);
        //     const f     = this.#paramAmount.value;
        //     const gamma = this.#paramGamma .value;
            
        //     const col = this.interpolate(
        //         space,
        //         dataColor2array(convertDataColorToSpace(this.inputs[0].data.color, space)),
        //         dataColor2array(convertDataColorToSpace(this.inputs[1].data.color, space)),
        //         f,
        //         gamma);

        //     this._color = [
        //         space, 
        //         col[0], 
        //         col[1], 
        //         col[2] ];
        }

        // else if(this.inputs[0].isConnected) this._color = this.inputs[0].data.color;
        // else if(this.inputs[1].isConnected) this._color = this.inputs[1].data.color;
        // else                                this._color = dataColor_NaN;

        // this.outputs[0]._data = dataFromDataColor(this._color);


        super.updateData()
    }



    canShowColor()
    {
        return this.inputs[0].isConnected;
    }
}