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


    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);

        
        const width  = this.#width .value;
        const height = this.#height.value;

        this.output._data = 
        [{
            nodeId:  this.id,
            itemId:  this.id,
            
            objType: 'rect',
            
            x:       0,
            y:       0,
            width:   width,
            height:  height
        }];
    }
}