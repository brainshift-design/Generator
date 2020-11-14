class   GOpRect
extends GOperator
{
    #width;
    #height;


    constructor()
    {
        super('rect', 'OBJ');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this.#width  = new GNumberParam('width',  10, 0.01));
        this.addParam(this.#height = new GNumberParam('height', 10, 0.01));
    }


    generate()
    {
        console.log('GOpRect.generate()');
        if (this.valid) return;

        this.output._data = 
        [{
            nodeId: obj.nodeId,
            itemId: obj.nodeId + '_0',
            
            x:      obj.x,
            y:      obj.y,
            width:  obj.width,
            height: obj.height
        }];

        super.generate();
    }
}