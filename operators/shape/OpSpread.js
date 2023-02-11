// class   OpSpread 
// extends Operator
// {
//     #count;
//     #radius;

//     seed = 0;


//     constructor()
//     {
//         super('spread', 'object');

//         this.addInput (new Input ());
//         this.addOutput(new Output());
        
//         this.addParam(this.#count  = new NumberParam('count',  'count',  true,   2, 1));
//         this.addParam(this.#radius = new NumberParam('radius', 'radius', true, 100, 0.01));
//     }
    
    
//     updateData()
//     {
//         const input = this.inputs[0];

//         if (   !input.connected
//             || isEmptyObject(input.connectedOutput.data)) 
//         {
//             this.output._data = {};
//             return;
//         }

//         this.output._data = 
//         {
//             nodeId: this.id,
//             nodeType: this.type,

//             count:  this.#count .value,
//             radius: this.#radius.value,
            
//             seed:   this.seed,

//             inputs: [input.data]
//         };

//         super.updateData();
//     }
// }