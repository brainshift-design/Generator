class   OpRect
extends Operator
{
    #width;
    #height;


    constructor()
    {
        super('rect', 'OBJ');

        this.setOutput(new Output(this.dataType));

        this.addParam(this.#width  = new NumberParam('width',  10, 0.01));
        this.addParam(this.#height = new NumberParam('height', 10, 0.01));
    }


    generate()
    {
        if (this.valid) return;

        this.output._data = 
<<<<<<< HEAD:operators/OpRect.js
        {
            nodeId: this.id,
            opType: this.opType,
=======
        [{
            type:   'rect',
            itemId: this.id + '_0',
>>>>>>> 37b01d739129b91937ee4025d59936c818ed2a2a:operators/rect/OpRect.js

            x:      0,
            y:      0,
            width:  this.#width .value,
            height: this.#height.value
        }];

        super.generate();
    }
}