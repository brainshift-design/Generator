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
        [[
            OBJ_RECT,           // type
            0,                  // object id
            this.id,            // node id
               
            0,                  // x      
            0,                  // y      
            this.#width .value, // width
            this.#height.value, // height 
            this.#round .value  // round  
        ]];
    }
}