class GColumn
extends GOperator1
{
    index       = null;

    cachedValue = null;


    
    constructor(nodeId, options)
    {
        super(COLUMN, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.index       = null;

        this.cachedValue = null;
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
        if (   this.isCached()
            && this.cachedValue)
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;
        const index = this.index ? (await this.index.eval(parse)).toValue() : null;

        
        this.value = new ListValue();

        let maxColumns = 0;


        if (this.cachedValue)
            this.value = this.cachedValue.copy();

        else
        {
            if (   input
                && index)
            {
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
                else if (isListType(input.type))
                {
                    this.value = input.copy();
                    maxColumns = 1;
                }
            }


            this.cachedValue = this.value.copy();
        }


        this.updateValueObjects();

        this.setUpdateValues(parse,
        [
            ['type',    this.outputListType()                   ],
            ['length',  new NumberValue(this.value.items.length)],
            ['columns', new NumberValue(maxColumns, 0)          ],
            ['index',   index                                   ]
        ]);
    

        if (parse.settings.showListTooltips)
        {
            this.setUpdateValues(parse,
            [
                ['preview', new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))]
            ],
            true);
        }
        

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



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.index) this.index.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.index) this.index.iterateLoop(parse);
    }
}



function isTable(value)
{
    if (!isListType(value.type))
        return false;

    for (const item of value.items)
    {
        if (!isListType(item.type))
            return false;
    }

    return true;
}