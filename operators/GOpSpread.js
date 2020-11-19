class   GOpSpread 
extends GOperator
{
    #count;
    #radius;

    seed = 0;


    constructor()
    {
        super('spread', 'OBJ');

        this.addInput (new GInput (this.dataType));
        this.setOutput(new GOutput(this.dataType));
        
        this.addParam(this.#count  = new GNumberParam('count', 2, 1));
        this.addParam(this.#radius = new GNumberParam('radius', 100, 0.01));
    }


    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);


        var input = this.inputs[0];

        if (   !input.connected
            || isEmptyObject(input.connectedOutput.data)) 
        {
            this.output._data = {};
            return;
        }

        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            count:  this.#count .value,
            radius: this.#radius.value,
            
            seed:   this.seed,

            inputs: [input.data]
        };
    }
}