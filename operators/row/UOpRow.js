class   UOpRow
extends UOperator
{
    #count;
    #gap;


    constructor()
    {
        super('row', 'OBJ');

        this.addInput (new UInput (this.dataType));
        this.setOutput(new UOutput(this.dataType));
        
        this.addParam(this.#count = new UNumberParam('count', 7, 1));
        this.addParam(this.#gap   = new UNumberParam('gap',  10, 0));
    }
}




// class   UOpRow
// extends UOperator
// {
//     #count;
//     #gap;


//     constructor()
//     {
//         super('row', 'OBJ');

//         this.addInput (new UInput (this.dataType));
//         this.setOutput(new UOutput(this.dataType));
        
//         this.addParam(this.#count = new NumberParam('count',  4, 1));
//         this.addParam(this.#gap   = new NumberParam('gap',   10, 0));
//     }


//     generate()
//     {
//         if (this.valid) return;

//         const input  = this.inputs[0];
//         const output = this.output;

//         if (!input.connected)
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

        
//         super.generate();
//     }
// }