class   GOpRect
extends GOperator
{
    #width;
    #height;
    #round;
    

    constructor()
    {
        super('rect', 'OBJ');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this.#width  = new GNumberParam('width',  100, 0.01));
        this.addParam(this.#height = new GNumberParam('height', 100, 0.01));
        this.addParam(this.#round  = new GNumberParam('round',    0, 0));
    }


    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);


        this.output._data = 
        [{
            nodeId:  this.id,
            itemId:  this.id,
            
            objType: 'rect',
            
            x:       0,
            y:       0,
            width:   this.#width .value,
            height:  this.#height.value,
            round:   this.#round .value
        }];
    }
}