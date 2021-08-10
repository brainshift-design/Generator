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
        
        this.addParam(this.#count = new GNumberParam('count', 7, 1));
        this.addParam(this.#gap   = new GNumberParam('gap',  10, 0));
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


        const data = input.data;

        this.output._data = [];

        for (var i = 0, x = 0; i < this.#count.value; i++)
        {
            const bounds = getObjectBounds(data);
            const gap    = this.#gap.value;

            for (var j = 0; j < data.length; j++)
            {
                const obj = shallowCopy(data[j]);

                obj[1] = this.output._data.length;
                obj[2] = this.id;
                
                obj[3] += x;

                this.output._data.push(obj);
            }    

            x += bounds.w + gap;

            // as this node duplicates its input, everything like
            // OpNumber upstream that does S&H needs to be refresheds
            this.refresh();
        }
    }
}