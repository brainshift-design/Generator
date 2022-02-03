class   OpRow
extends Operator
{
    #count;
    #gap;


    constructor()
    {
        super('row', 'object');

        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));
        
        this.addParam(this.#count = new NumberParam('count', 'count', true,  7, 1));
        this.addParam(this.#gap   = new NumberParam('gap',   'gap',   true, 10, 0));
    }
}




// class   OpRow
// extends Operator
// {
//     #count;
//     #gap;


//     constructor()
//     {
//         super('row', 'object');

//         this.addInput (new Input (this.dataType));
//         this.addOutput(new Output(this.dataType));
        
//         this.addParam(this.#count = new NumberParam('count', 'count',  4, 1));
//         this.addParam(this.#gap   = new NumberParam('gap',   'gap',   10, 0));
//     }


//     updateData()
//     {
//         const input  = this.inputs[0];
//         const output = this.output;

//         if (!input.isConnected)
//         {
//             output._data = {};
//             return;
//         }

    
//         const objects = input.data;
//         const bounds = getObjectBounds(objects);


//         output._data = [];
    
//         for (var i = 0, x = 0; i < this.#count.value; i++)
//         {
//             for (var j = 0; j < objects.length; j++)
//             {
//                 const obj = shallowCopy(objects[j]);
//                 obj.itemId = 'row_' + i + '_' + j;
   
//                 obj.x += x;
                
//                 output._data.push(obj);
//             }
            
//             x += bounds.w + this.#gap.value;
//         }

        
//         super.updateData();
//     }
// }