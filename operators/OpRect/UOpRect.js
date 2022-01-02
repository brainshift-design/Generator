class   UOpRect
extends UOperator
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

        this.setOutput(new UOutput(this.dataType));

        this.addParam(this.#x      = new UNumberParam('x',        0));
        this.addParam(this.#y      = new UNumberParam('y',        0));
        this.addParam(this.#width  = new UNumberParam('width',  100, 0.01));
        this.addParam(this.#height = new UNumberParam('height', 100, 0.01));
        this.addParam(this.#round  = new UNumberParam('round',    0, 0));
        this.addParam(this.#color  = new UColorParam ('color'));
        
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



    // generate()
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

    //     super.generate();
    // }
}