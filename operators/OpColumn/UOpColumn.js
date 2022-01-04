class   UOpColumn
extends UOperator
{
    #count;
    #gap;



    constructor()
    {
        super('column', 'object');

        this.addInput (new UInput (this.dataType));
        this.setOutput(new UOutput(this.dataType));
        
        this.addParam(this.#count = new UNumberParam('count', true,  7, 1));
        this.addParam(this.#gap   = new UNumberParam('gap',   true, 10, 0));
    }
}



// class   UOpColumn
// extends UOperator
// {
//     #count;
//     #gap;


//     constructor()
//     {
//         super('row', 'object');

//         this.addInput (new UInput (this.dataType));
//         this.setOutput(new UOutput(this.dataType));
        
//         this.addParam(this.#count = new NumberParam('count',  4, 1));
//         this.addParam(this.#gap   = new NumberParam('gap',   10, 0));
//     }


//     update()
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
    
//         for (var i = 0, y = 0; i < this.#count.value; i++)
//         {
//             for (var j = 0; j < objects.length; j++)
//             {
//                 const obj = shallowCopy(objects[j]);
//                 obj.itemId = 'column_' + i + '_' + j;
   
//                 obj.y += y;
                
//                 output._data.push(obj);
//             }
            
//             y += bounds.h + this.#gap.value;
//         }

        
//         super.update();
//     }
// }