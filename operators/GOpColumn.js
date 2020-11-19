class   GOpColumn
extends GOperator
{
    #count;
    #gap;


    constructor()
    {
        super('column', 'OBJ');

        this.addInput (new GInput (this.dataType));
        this.setOutput(new GOutput(this.dataType));
        
        this.addParam(this.#count = new GNumberParam('count', 7, 1));
        this.addParam(this.#gap   = new GNumberParam('gap', 10, 0));
    }


    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);


        const input = this.inputs[0];

        if (!input.connected)
        {
            this.output._data = [];
            return;
        }


        this.output._data = [];
        
        for (var i = 0, y = 0; i < this.#count.value; i++)
        {
            const inputData = input.data;

            const bounds = getBounds(inputData);
            const gap    = this.#gap.value;

            for (var j = 0; j < inputData.length; j++)
            {
                var item = shallowCopy(inputData[j]);
                item.itemId = this.id + '_' + (i+1) + '_' + item.itemId;
    
                item.y += y;
                
                this.output._data.push(item);
            }
            
            y += bounds.h + gap;

            this.refresh();
        }
    }
}