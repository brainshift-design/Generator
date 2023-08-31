class GColumn
extends GOperator1
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

        let maxColumns = 0;


        if (   this.input
            && index)
        {
            const input = (await this.input.eval(parse)).toValue();

            if (isTable(input))
            {
                input.items.forEach(i => maxColumns = Math.max(maxColumns, i.items.length));

                if (index.value < maxColumns)
                {
                    for (let i = 0; i < input.items.length; i++)
                    {
                        const row = input.items[i];

                        if (index.value < row.items.length)
                        {
                            this.value.items.push(row.items[index.value].copy());

                            if (   this.value.objects 
                                && row.items[index.value].objects)
                                this.value.objects.push(...row.items[index.value].objects);
                        }
                    }
                }
            }
            else if (LIST_VALUES.includes(input.type))
                this.value = input.copy();
        }


        const type = 
            this.value
            ? new TextValue(finalListTypeFromItems(this.value.items))
            : TextValue.NaN;


        this.setUpdateValues(parse,
        [
            ['preview', new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))],
            ['type',    type                                                                           ],
            ['length',  new NumberValue(this.value.items.length)                                       ],
            ['columns', new NumberValue(maxColumns, 0)                                                 ],
            ['index',   index                                                                          ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.index && this.index.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.index) this.index.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.index) this.index.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.index) this.index.iterateLoop(parse);
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