class   OpSpread 
extends Operator
{
    #count;
    #radius;

    seed = 0;


    constructor()
    {
        super('spread');

        this.addInput (new Input ('rect'));
        this.setOutput(new Output('rect'));
        
        this.addParam(this.#count  = new ValueParam('count',  1,    Number.MAX_SAFE_INTEGER,   2));
        this.addParam(this.#radius = new ValueParam('radius', 0.01, Number.MAX_SAFE_INTEGER, 100));
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
        if (!input.connected) return;

        this.output._data = 
        {
            id:     this.id,
            type:   this.type,
            count:  this.#count .value,
            radius: this.#radius.value,
            seed:   this.seed,

            inputs: [input.data]
        };

        super.generate();
    }
}