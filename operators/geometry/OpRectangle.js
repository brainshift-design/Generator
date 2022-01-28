class   OpRectangle
extends Operator
{
    #x;
    #y;
    #width;
    #height;
    #angle;
    #round;
    //#color;



    constructor()
    {
        super('rectangle', 'rect', 'object');

        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));

        this.addParam(this.#x      = new NumberParam('x',      true, true, true,         0));
        this.addParam(this.#y      = new NumberParam('y',      true, true, true,         0));
        this.addParam(this.#width  = new NumberParam('width',  true, true, true, 100,    0.01));
        this.addParam(this.#height = new NumberParam('height', true, true, true, 100,    0.01));
        this.addParam(this.#angle  = new NumberParam('angle',  true, true, true,   0, -180,   180));
        this.addParam(this.#round  = new NumberParam('round',  true, true, true,   0,    0));
        //this.addParam(this.#color  = new ColorParam ('color',  true));
        
        this.#angle.control.suffix = '°';
        
        this.updateRound();


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
    }
    
    
    
    updateRound()
    {
        const min = Math.min(this.#width.value, this.#height.value);
        this.setRoundMinMax(0, min/2);
    }

    

    setRoundMinMax(min, max)
    {
        const control = this.#round.control;

        control.min   = min;
        control.max   = max;
        //control.value = Math.min(control.value, control.max);

        this.#round.control.update();
    }



    update()
    {
        if (this.valid) return;


        this.updateParams(true);


        if (this.inputs[0].isConnected) 
        {
            const data = this.inputs[0].data;

            this.#x     .setValue(this.#x     .input.isConnected ? this.#x     .input.data.value : data.x,      false, true, false);
            this.#y     .setValue(this.#y     .input.isConnected ? this.#y     .input.data.value : data.y,      false, true, false);
            this.#width .setValue(this.#width .input.isConnected ? this.#width .input.data.value : data.width,  false, true, false);
            this.#height.setValue(this.#height.input.isConnected ? this.#height.input.data.value : data.height, false, true, false);
            this.#angle .setValue(this.#angle .input.isConnected ? this.#angle .input.data.value : data.angle,  false, true, false);
            this.#round .setValue(this.#round .input.isConnected ? this.#round .input.data.value : data.round,  false, true, false);
        }

    
        this.outputs[0]._data = dataFromRectangle(
            this.#x     .value,
            this.#y     .value,
            this.#width .value,
            this.#height.value,
            this.#angle .value,
            this.#round .value);


        super.update()
    }



    updateNode()
    {
        // for (const param of this.params)
        //     this.updateSlider(param.control, !isNaN(param.value));


        super.updateNode();
    }



    // updateSlider(slider, isValid)
    // {
    //     slider.valueText = 
    //            this.inputs[0].isConnected 
    //         && !isValid 
    //         ? '?' 
    //         : '';

    //     slider.textbox.style.fontStyle = 
    //            this.inputs[0].isConnected 
    //         || slider.param.input.isConnected 
    //         ? 'italic' 
    //         : 'normal';

    //     slider.update();
    // }



    loadParams(_node)
    {
        for (const _param of _node.params)
        {
            switch (_param[0])
            {
                case 'x':
                    this.#x.setValue(parseFloat(_param[1]), true, true, false);
                    this.#x.setDecimalsFrom(_param[1]);
                    break;

                case 'y':
                    this.#y.setValue(parseFloat(_param[1]), true, true, false);
                    this.#y.setDecimalsFrom(_param[1]);
                    break;

                case 'width':
                    this.#width.setValue(parseFloat(_param[1]), true, true, false);
                    this.#width.setDecimalsFrom(_param[1]);
                    break;

                case 'height':
                    this.#height.setValue(parseFloat(_param[1]), true, true, false);
                    this.#height.setDecimalsFrom(_param[1]);
                    break;

                case 'angle':
                    this.#angle.setValue(parseFloat(_param[1]), true, true, false);
                    this.#angle.setDecimalsFrom(_param[1]);
                    break;

                case 'round':
                    this.#round.setValue(parseFloat(_param[1]), true, true, false);
                    this.#round.setDecimalsFrom(_param[1]);
                    break;

            }
        }
    }
}