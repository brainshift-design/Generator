class   OpRect
extends Operator
{
    #x;
    #y;
    #width;
    #height;
    #round;
    #color;



    constructor()
    {
        super('rect', 'object');

        this.setOutput(new Output(this.dataType));

        this.addParam(this.#x      = new NumberParam('x',      true,   0));
        this.addParam(this.#y      = new NumberParam('y',      true,   0));
        this.addParam(this.#width  = new NumberParam('width',  true, 100, 0.01));
        this.addParam(this.#height = new NumberParam('height', true, 100, 0.01));
        this.addParam(this.#round  = new NumberParam('round',  true,   0, 0));
        this.addParam(this.#color  = new ColorParam ('color',  true));
        
        this.#x     ._control.addEventListener('change', () => this.updateRound());
        this.#y     ._control.addEventListener('change', () => this.updateRound());
        this.#width ._control.addEventListener('change', () => this.updateRound());
        this.#height._control.addEventListener('change', () => this.updateRound());

        this.updateRound();
    }
    
    
    
    updateRound()
    {
        const min = Math.min(this.#width.value, this.#height.value);
        this.setRoundMinMax(0, min/2);
    }

    

    setRoundMinMax(min, max)
    {
        const control = this.#round._control;

        control.min   = min;
        control.max   = max;
        //control.value = Math.min(control.value, control.max);

        this.#round._control.update();
    }



    // update()
    // {
    //     if (this.valid) return;

    //     this.output._data = 
    //     {
    //         nodeId: this.id,
    //         opType: this.opType,

    //         x:      0,
    //         y:      0,
    //         width:  this.#width .value,
    //         height: this.#height.value
    //     };

    //     super.update();
    // }
}