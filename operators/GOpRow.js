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


    generate(callerInput)
    {
        if (this.valid) return;


        var input = this.inputs[0];

        if (!input.connected)
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
                item.itemId = this.id + '_' + (i+1) + '_' + item.itemId;
    
                item.x += x;
                
                this.output._data.push(item);
            }
            
            var gapValue = this.#gap.value;

            x += bounds.w + gapValue;
        }
    

        super.generate(callerInput);
    }
}