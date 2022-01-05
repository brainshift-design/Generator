class   OpRandom
extends Operator
{
    #min;
    #max;
    #scale;
    #seed;

    

    constructor()
    {
        super('random', 'number');

        this.setOutput(new Output(this.dataType));

        this.addParam(this.#min   = new NumberParam('min',   true,  0));
        this.addParam(this.#max   = new NumberParam('max',   true, 10));
        this.addParam(this.#scale = new NumberParam('scale', true,  1, 1));
        this.addParam(this.#seed  = new NumberParam('seed',  true,  1, 1));

        this.#max.control.min = this.#min.value;
        this.#min.control.max = this.#max.value;


        this.#min.control.addEventListener('change', () =>
        {
            // if (this.#min.value > this.#max.value)
            //     this.#min.value = this.#max.value;

            this.#max.control.min = this.#min.value;
            this.updateConnectedInputValueText();
        });


        this.#max.control.addEventListener('change', () =>
        {
            // if (this.#max.value < this.#min.value)
            //     this.#max.value = this.#min.value;

            this.#min.control.max = this.#max.value;
            this.updateConnectedInputValueText();
        });
    }



    updateConnectedInputValueText()
    {
        const val =
            this.#min.value == this.#max.value
            ? this.#min.value
            : this.#min.value + '~' + this.#max.value;

        if (this.output)
        {
            for (const input of this.output.connectedInputs)
                input.param.valueText = val;
        }
    }
}





// class   OpRandom
// extends Operator
// {
//     #min;
//     #max;
//     #scale;
//     #seed;


//     constructor()
//     {
//         super('random', 'number');

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


//     update()
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

//         super.update();
//     }
// }