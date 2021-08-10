class   UOpSpread 
extends UOperator
{
    #count;
    #radius;

    seed = 0;


    constructor()
    {
        super('spread', 'OBJ');

        this.addInput (new UInput (this.dataType));
        this.setOutput(new UOutput(this.dataType));
        
        this.addParam(this.#count  = new NumberParam('count', 2, 1));
        this.addParam(this.#radius = new NumberParam('radius', 100, 0.01));
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