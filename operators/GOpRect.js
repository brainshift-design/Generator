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


        var objId = 0;//newObjectId();

        gObjects[objId] = 
        [
            OBJ_RECT,           // type
            objId,              // object id
            this.uid,           // node uid
               
            0,                  // x      
            0,                  // y      
            this.#width .value, // width
            this.#height.value, // height 
            this.#round .value  // round  
        ];

        ngObjects++;


        this.output._firstObject = objId;
        this.output._nObjects    = 1;
    }
}