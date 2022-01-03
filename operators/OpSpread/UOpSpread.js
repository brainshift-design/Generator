class   UOpSpread 
extends UOperator
{
    #count;
    #radius;

    seed = 0;


    constructor()
    {
        super('spread', 'object');

        this.addInput (new UInput (this.dataType));
        this.setOutput(new UOutput(this.dataType));
        
        this.addParam(this.#count  = new UNumberParam('count',  true,   2, 1));
        this.addParam(this.#radius = new UNumberParam('radius', true, 100, 0.01));
    }
    
    
    generate()
    {
        if (this.valid) return;
        super.generate();

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