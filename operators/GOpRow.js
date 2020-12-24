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


        //this.output._data = [];
        
        for (var i = 0, x = 0; i < this.#count.value; i++)
        {
            const first = input.data[0];
            const count = input.data[1];

            const bounds = getObjectBounds(first, count);
            const gap    = this.#gap.value;

            for (var j = first; j < first + count; j++)
            {
                var objId = newObjectId();

                objects[objId] = shallowCopy(objects[j]);
                const item = objects[objId];

                item[1] = objId;
                item[2] = this.uid;
                //item.itemId = this.id + '_' + (i+1) + '_' + item.itemId;
    
                item[3] += x;
                
                //this.output._data.push(item);
            }

            x += bounds.w + gap;

            // as this node duplicates its input, everything like
            // OpNumber upstream that does S&H needs to be refreshed
            this.refresh();
        }
    }
}