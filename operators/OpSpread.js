class   OpSpread 
extends Operator
{
    #count;
    #radius;


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
        randomSeed = 1894557;
        this.output._data = [];
        

        if (!this.inputs[0].connected)
            return;
            

        for (var i = 0; i < this.#count.value; i++)
        {
            var a = random() * Tau;
            var d = random() * this.#radius.value;

            var v = vector(a, d);

            for (var j = 0; j < this.inputs[0].data.length; j++)
            {
                var item = Object.assign({}, this.inputs[0].data[j]);

                item.x += v.x;
                item.y += v.y;

                this.output._data.push(item);
            }
        }
        

        super.update();
    }
}