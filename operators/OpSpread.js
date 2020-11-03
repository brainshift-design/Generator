class   OpSpread 
extends Operator
{
    #count;
    #radius;

    #random = new Random();

    constructor()
    {
        super('spread');

        this.addInput(new Input('rect'));
        this.setOutput(new Output('rect'));
        
        this.#count = new ValueParam('count',  1, Number.MAX_SAFE_INTEGER, 2);
        this.addParam(this.#count);

        this.#radius = new ValueParam('radius', 0.01, Number.MAX_SAFE_INTEGER, 100);
        this.addParam(this.#radius);
    }


    update()
    {
        this.#random.seed = 1824557;
        this.output._data = [];

        
        var input = this.inputs[0];
        if (!input.connected) return;
            

        for (var i = 0; i < this.#count.value; i++)
        {
            var a = this.#random.next() * Tau;
            var d = this.#random.next() * this.#radius.value;

            var v = vector(a, d);

            for (var j = 0; j < input.data.length; j++)
            {
                var item = Object.assign({}, input.data[j]);

                item.x += v.x;
                item.y += v.y;

                this.output._data.push(item);
            }
        }
        

        super.update();
    }
}