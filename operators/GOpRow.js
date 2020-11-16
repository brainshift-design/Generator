class   GOpRow
extends GOperator
{
    #count;
    #gap;


    constructor()
    {
        super('row', 'OBJ');

        this.addInput (new GInput (this.dataType));
        this.setOutput(new GOutput(this.dataType));
        
        this.addParam(this.#count = new GNumberParam('count',  4, 1));
        this.addParam(this.#gap   = new GNumberParam('gap',   10, 0));
    }


    generate()
    {
        if (this.valid) return;


        var input = this.inputs[0];

        if (   !input.connected)
            //|| isEmptyObject(input.connectedOutput.data))
        {
            this.output._data = [];
            return;
        }


        var bounds = getBounds(input.data);
    

        this.output._data = [];
    
        for (var i = 0, x = 0; i < this.#count.value; i++)
        {
            for (var j = 0; j < input.data.length; j++)
            {
                var item = shallowCopy(input.data[j]);
                item.itemId += '_' + i;
    
                item.x += x;
                
                this.output._data.push(item);
            }
            
            x += bounds.w + this.#gap.value;
        }
    

        super.generate();
    }
}