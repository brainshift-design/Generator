class   GOpSpread 
extends GOperator
{
    #count;
    #radius;

    seed = 0;


    constructor()
    {
        super('spread', 'object');

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


// function generateSpread(node)
// {
//     var input  = generate(node.inputs[0]);
//     var bounds = getBounds(input);

//     var rnd = new Random(node.seed);

//     result = [];

//     var a = 0;

//     for (var i = 0; i < node.count; i++)
//     {
//         var d = rnd.next() * node.radius;
//         var v = vector(a, d);
        
//         for (var j = 0; j < input.length; j++)
//         {
//             var item = shallowCopy(input[j]);
//             item.itemId = node.nodeId + '_' + i + '_' + j;

//             item.x += v.x;
//             item.y += v.y;
            
//             result.push(item);
//         }

//         a += Tau * phi;
//     }

//     return result;
// }