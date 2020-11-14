class   OpNumber
extends Operator
{
    #value;

    constructor()
    {
        super('number', 'NUM');

        this.setOutput(new Output(this.dataType));

        this.addParam(this.#value = new NumberParam(''));
    }


    generate()
    {
<<<<<<< HEAD:operators/OpNumber.js
        if (this.valid) return;

        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            value:  this.#value.value,
        };

=======
        this.output._data = this.#value.value;
        
>>>>>>> 37b01d739129b91937ee4025d59936c818ed2a2a:operators/number/OpNumber.js
        super.generate();
    }
}