class   OpRectangle
extends OperatorBase
{
    #paramX;
    #paramY;
    #paramWidth;
    #paramHeight;
    #paramAngle;
    #paramRound;
    //#paramColor;

    #btnProportional;

    #oldWidth  = Number.NaN;
    #oldHeight = Number.NaN;


    
    constructor()
    {
        super('rectangle', 'rect', 'object');

        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));

        this.addParam(this.#paramX      = new NumberParam('x',      'x',      true, true, true,   0));
        this.addParam(this.#paramY      = new NumberParam('y',      'y',      true, true, true,   0));
        this.addParam(this.#paramWidth  = new NumberParam('width',  'width',  true, true, true, 100,    0.01));
        this.addParam(this.#paramHeight = new NumberParam('height', 'height', true, true, true, 100,    0.01));
        this.addParam(this.#paramAngle  = new NumberParam('angle',  'angle',  true, true, true,   0, -180,   180));
        this.addParam(this.#paramRound  = new NumberParam('round',  'round',  true, true, true,   0,    0));
        
        this.#paramAngle.control.setSuffix('°', true);

        
        this.updateRound();

        this.#btnProportional = createToggleButton(12, 12);
        this.inner.appendChild(this.#btnProportional);


        this.inputs[0].addEventListener('connect', () =>
        {
            for (const param of this.params)
                enableSliderText(param.control, false);
        });


        this.inputs[0].addEventListener('disconnect', () =>
        {
            for (const param of this.params)
                if (!param.input.isConnected) 
                    enableSliderText(param.control, true);
        });


        this.#btnProportional.addEventListener('click', () =>
        {
            if (this.#btnProportional.enabled)
            {
                this.#oldWidth  = this.#paramWidth .value;
                this.#oldHeight = this.#paramHeight.value;
            }
        });


        this.#paramWidth.addEventListener('change', () =>
        {
            if (this.#btnProportional.enabled)
                this.#paramHeight.setValue(this.#paramWidth.value * this.#oldHeight / this.#oldWidth, false, true, false);
        });


        this.#paramHeight.addEventListener('change', () =>
        {
            if (this.#btnProportional.enabled)
                this.#paramWidth.setValue(this.#paramHeight.value * this.#oldWidth / this.#oldHeight, false, true, false);
        });
    }
    
    
    
    updateRound()
    {
        const min = Math.min(this.#paramWidth.value, this.#paramHeight.value);
        this.setRoundMinMax(0, min/2);
    }

    

    setRoundMinMax(min, max)
    {
        const control = this.#paramRound.control;

        control.min   = min;
        control.max   = max;

        this.#paramRound.control.update();
    }



    updateData()
    {
        if (this.inputs[0].isConnected) 
        {
            const data = this.inputs[0].data;

            this.#paramX     .setValue(this.#paramX     .input.isConnected ? this.#paramX     .input.data.value : data.x,      false, true, false);
            this.#paramY     .setValue(this.#paramY     .input.isConnected ? this.#paramY     .input.data.value : data.y,      false, true, false);
            this.#paramWidth .setValue(this.#paramWidth .input.isConnected ? this.#paramWidth .input.data.value : data.width,  false, true, false);
            this.#paramHeight.setValue(this.#paramHeight.input.isConnected ? this.#paramHeight.input.data.value : data.height, false, true, false);
            this.#paramAngle .setValue(this.#paramAngle .input.isConnected ? this.#paramAngle .input.data.value : data.angle,  false, true, false);
            this.#paramRound .setValue(this.#paramRound .input.isConnected ? this.#paramRound .input.data.value : data.round,  false, true, false);
        }

    
        this.outputs[0]._data = dataFromRectangle(
            this.#paramX     .value,
            this.#paramY     .value,
            this.#paramWidth .value,
            this.#paramHeight.value,
            this.#paramAngle .value,
            this.#paramRound .value);


        super.updateData()
    }



    updateNode()
    {
        this.#btnProportional.style.top = 79;

        super.updateNode();
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';

        let json = super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"proportional": "' + boolString(this.#btnProportional.enabled) + '"';

        if (this.#btnProportional.enabled)
        {
            json +=
                  ',\n' + pos + tab + '"refWidth": "'    + this.#oldWidth  + '"'
                + ',\n' + pos + tab + '"refHeight": "'   + this.#oldHeight + '"';
        }

        return json;
    }



    loadParams(_node)
    {
        if (_node.proportional)
        {
            this.#btnProportional.enabled = isTrue(_node.proportional);
            this.#btnProportional.updateBackground(false);

            if (this.#btnProportional.enabled)
            {
                this.#oldWidth  = parseFloat(_node.propWidth);
                this.#oldHeight = parseFloat(_node.propHeight);
            }
        }


        super.loadParams(_node);
    }
}