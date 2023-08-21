class GSort
extends GOperator1
{
    column  = null;
    reverse = null;


    
    constructor(nodeId, options)
    {
        super(SORT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSort(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.column ) copy.column  = this.column .copy();
        if (this.reverse) copy.reverse = this.reverse.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const column  = this.column  ? (await this.column .eval(parse)).toValue() : null;
        const reverse = this.reverse ? (await this.reverse.eval(parse)).toValue() : null;

        
        this.value = new ListValue();

        let maxColumns = 0;

        
        if (   this.input
            && column
            && reverse)
        {
            const input = (await this.input.eval(parse)).toValue();

            
            const sortMultiplier = reverse.value > 0 ? -1 : 1;

            input.items.sort((a, b) => 
            {
                const ca = a ? (LIST_VALUES.includes(a.type) ? a.items[column.value].value : a.value) : 0;
                const cb = b ? (LIST_VALUES.includes(b.type) ? b.items[column.value].value : b.value) : 0;

                if (ca < cb) return -1 * sortMultiplier;
                if (ca > cb) return  1 * sortMultiplier;

                return 0;
            });


            input.items.forEach(i => maxColumns = Math.max(maxColumns, LIST_VALUES.includes(i.type) ? i.items.length : 1));

            for (let i = 0; i < input.items.length; i++)
            {
                const row = input.items[i];
                this.value.items.push(row.copy());
                this.value.objects.push(...row.objects);
            }
        }


        const preview = new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)));

        const type = 
            this.value
            ? new TextValue(finalListTypeFromItems(this.value.items))
            : TextValue.NaN;


        this.setUpdateValues(parse,
        [
            ['preview', preview                                 ],
            ['type',    type                                    ],
            ['length',  new NumberValue(this.value.items.length)],
            ['columns', new NumberValue(maxColumns)             ],
            ['column',  column                                  ],
            ['reverse', reverse                                 ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.column  && this.column .isValid()
            && this.reverse && this.reverse.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.column ) this.column .pushValueUpdates(parse);
        if (this.reverse) this.reverse.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.column ) this.column .invalidateInputs(parse, from);
        if (this.reverse) this.reverse.invalidateInputs(parse, from);
    }
}