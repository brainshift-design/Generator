class   GOpColumn
extends GOperator
{
    #count;
    #gap;


    constructor()
    {
        super('column', 'object');

        this.addInput (new GInput (this.dataType));
        this.setOutput(new GOutput(this.dataType));
        
        this.addParam(this.#count = new GNumberParam('count', true,  7, 1));
        this.addParam(this.#gap   = new GNumberParam('gap',   true, 10, 0));
    }


    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);


        const input = this.inputs[0];

        if (!input.isConnected)
        {
            this.output._data = [];
            return;
        }


        const data = input.data;

        this.output._data = [];

        for (var i = 0, y = 0; i < this.#count.value; i++)
        {
            const bounds = getObjectBounds(data);
            const gap    = this.#gap.value;

            for (var j = 0; j < data.length; j++)
            {
                const obj = shallowCopy(data[j]);

                obj[1] = this.output._data.length;
                obj[2] = this.id;
                
                obj[4] += y;

                this.output._data.push(obj);
            }    

            y += bounds.h + gap;

            // as this node duplicates its input, everything like
            // OpNumber upstream that does S&H needs to be refresheds
            this.refresh();
        }
    }
}