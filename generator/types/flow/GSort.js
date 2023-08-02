class GSort
extends GOperator
{
    input   = null;
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
           
            input.items.forEach(i => maxColumns = Math.max(maxColumns, LIST_VALUES.includes(i.type) ? i.items.length : 1));

            for (let i = 0; i < input.items.length; i++)
            {
                const row = input.items[i];
                this.value.items.push(row.copy());
                this.value.objects.push(...row.objects);
            }
        }


        this.updateValues =
        [
            ['columns', new NumberValue(maxColumns)             ],
            ['length',  new NumberValue(this.value.items.length)],
            ['column',  column                                  ],
            ['reverse', reverse                                 ]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input  ) this.input  .pushValueUpdates(parse);
        if (this.column ) this.column .pushValueUpdates(parse);
        if (this.reverse) this.reverse.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input  ) this.input  .invalidateInputs(from);
        if (this.column ) this.column .invalidateInputs(from);
        if (this.reverse) this.reverse.invalidateInputs(from);
    }
}