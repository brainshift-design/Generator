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

        this.addOutput(new Output(this.dataType));

        this.addParam(this.#x      = new NumberParam('x',      true, true, true,   0));
        this.addParam(this.#y      = new NumberParam('y',      true, true, true,   0));
        this.addParam(this.#width  = new NumberParam('width',  true, true, true, 100, 0.01));
        this.addParam(this.#height = new NumberParam('height', true, true, true, 100, 0.01));
        this.addParam(this.#angle  = new NumberParam('angle',  true, true, true, 100, 0.01));
        this.addParam(this.#round  = new NumberParam('round',  true, true, true,   0, 0));
        //this.addParam(this.#color  = new ColorParam ('color',  true));
        
        this.#angle.control.suffix = '°';
        
        this.updateRound();
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