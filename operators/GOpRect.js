class   GOpRect
extends GOperator
{
    #width;
    #height;


    constructor()
    {
        super('rect', 'OBJ');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this.#width  = new GNumberParam('width',  100, 0.01));
        this.addParam(this.#height = new GNumberParam('height', 100, 0.01));
    }


    generate()
    {
        if (this.valid) return;

        this.output._data = 
        [{
            objType: 'rect',
            nodeId:  this.id,
            itemId:  this.id,
             
            x:       0,
            y:       0,
            width:   this.#width .value,
            height:  this.#height.value
        }];

        super.generate();
    }
}