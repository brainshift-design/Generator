// class   OpRandom
// extends Operator
// {
//     #min;
//     #max;
//     #scale;
//     #seed;


//     constructor()
//     {
//         super('random', 'NUM');

//         this.setOutput(new Output(this.dataType));

//         this.addParam(this.#min   = new NumberParam('min'));
//         this.addParam(this.#max   = new NumberParam('max'));
//         this.addParam(this.#scale = new NumberParam('scale', 1, 1));
//         this.addParam(this.#seed  = new NumberParam('seed'));

//         this.#min.control.addEventListener('change', () =>
//         {
//             if (this.#min.control.value > this.#max.control.value)
//                 this.#max.control.setValue(this.#min.control.value, false);
//         });

//         this.#max.control.addEventListener('change', () =>
//         {
//             if (this.#max.control.value < this.#min.control.value)
//                 this.#min.control.setValue(this.#max.control.value, false);
//         });
//     }


//     generate()
//     {
//         if (this.valid) return;

//         this.output._data = 
//         {
//             id:    this.id,
//             type:  this.opType,
            
//             min:   this.#min  .value,
//             max:   this.#max  .value,
//             scale: this.#scale.value,
//             seed:  this.#seed .value
//         };

//         super.generate();
//     }
// }