class   UOpRect
extends UOperator
{
    #width;
    #height;
    #round;


    constructor()
    {
        super('rect', 'OBJ');

        this.setOutput(new UOutput(this.dataType));

        this.addParam(this.#width  = new NumberParam('width',  100, 0.01));
        this.addParam(this.#height = new NumberParam('height', 100, 0.01));
        this.addParam(this.#round  = new NumberParam('round',    0, 0));
        
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