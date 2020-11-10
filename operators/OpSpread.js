class   OpSpread 
extends Operator
{
    #count;
    #radius;

    seed = 0;


    constructor()
    {
        super('spread', 'OBJ');

        this.addInput (new Input (this.dataType));
        this.setOutput(new Output(this.dataType));
        
        this.addParam(this.#count  = new NumberParam('count', 2, 1));
        this.addParam(this.#radius = new NumberParam('radius', 100, 0.01));
    }


    setGraph(graph)
    {
        super.setGraph(graph);
        this.seed = this.graph.random.seed;
        this.graph.random.next();
    }

    
    generate()
    {
        if (this.valid) return;

        var input = this.inputs[0];

        if (   !input.connected
            || isEmptyObject(input.connectedOutput.data)) 
        {
            this.output._data = {};
            return;
        }

        this.output._data = 
        {
            id:     this.id,
            type:   this.opType,

            count:  this.#count .value,
            radius: this.#radius.value,
            
            seed:   this.seed,

            inputs: [input.data]
        };

        super.generate();
    }
}