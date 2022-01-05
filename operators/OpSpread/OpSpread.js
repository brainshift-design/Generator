class   OpSpread 
extends Operator
{
    #count;
    #radius;

    seed = 0;


    constructor()
    {
        super('spread', 'object');

        this.addInput (new Input (this.dataType));
        this.setOutput(new Output(this.dataType));
        
        this.addParam(this.#count  = new NumberParam('count',  true,   2, 1));
        this.addParam(this.#radius = new NumberParam('radius', true, 100, 0.01));
    }
    
    
    update()
    {
        if (this.valid) return;
        super.update();

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