class GColumn
extends GOperator
{
    index;


    
    constructor(nodeId, options)
    {
        super(COLUMN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GColumn(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.index) copy.index = this.index.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const index = (await this.index.eval(parse)).toValue();

        
        this.value = new ListValue();

        
        if (   this.input
            && index)
        {
            const input = (await this.input.eval(parse)).toValue();
           
            if (isTable(input))
            {
                let maxColumns = 0;
                input.items.forEach(i => maxColumns = Math.max(maxColumns, i.items.length));

                if (index.value < maxColumns)
                {
                    for (let i = 0; i < input.items.length; i++)
                    {
                        const row = input.items[i];

                        this.value.items.push(
                            index.value < row.items.length
                            ? row.items[index.value].copy()
                            : NullValue);
                    }
                }
            }
        }


        this.updateValues =
        [
            ['length', new NumberValue(this.value.items.length)],
            ['index',  index                                   ]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.index) this.index.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.index) this.index.invalidateInputs(from);
    }
}



function isTable(value)
{
    if (!LIST_VALUES.includes(value.type))
        return false;

    for (const item of value.items)
    {
        if (!LIST_VALUES.includes(item.type))
            return false;
    }

    return true;
}