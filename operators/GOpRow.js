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
        
        this.addParam(this.#count = new GNumberParam('count',  7, 1));
        this.addParam(this.#gap   = new GNumberParam('gap',   10, 0));
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


        const first = input.data[0];
        const count = input.data[1];


        for (var i = 0, x = 0; i < this.#count.value; i++)
        {
            const bounds = getObjectBounds(first, count);
            const gap    = this.#gap.value;

            for (var j = first; j < first + count; j++)
            {
                var objId = first + count; //newObjectId();

                gObjects[objId] = shallowCopy(gObjects[j]);
                ngObjects++;

                const item = gObjects[objId];

                item[1] = objId;
                item[2] = this.id;
    
                item[3] += x;
            }

            x += bounds.w + gap;

            // as this node duplicates its input, everything like
            // OpNumber upstream that does S&H needs to be refreshed
            this.refresh();
        }
    }
}