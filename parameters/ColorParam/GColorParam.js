// class   GColorParam
// extends GParameter
// {
//     #value; // [r, g, b]


    
//     get value() 
//     {
//         let value = this.#value;

//         if (this.input.isConnected)
//         {
//             value = this.input.data.value;

//             genPostMessageToUi({ 
//                 msg:   'uiShowParamValue',
//                 nodeId: this.op.id,
//                 param:  this.name,
//                 value:  value
//             });
//         }

//         return value;
//     }

    

//     set value(value) 
//     {
//         this.#value   = value;
//         this.op.valid = false;
//     }



//     input;
//     output;



//     constructor(name, 
//                 hasOutput,
//                 value = [0, 0, 0])
//     {
//         super(name, 'color');

//         this.#value = value;
   
        
//         this.input = new GInput('color');
//         this.input._param = this;


//         if (hasOutput)
//         {
//             this.output = new GOutput('color');
//             this.output._param = this;
//         }
//         else
//             this.output = null;
//     }
// }