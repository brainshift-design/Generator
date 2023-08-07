class GCell
extends GOperator
{
    column;
    row;


    
    constructor(nodeId, options)
    {
        super(CELL, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCell(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.column) copy.column = this.column.copy();
        if (this.row   ) copy.row    = this.row   .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const column = this.column ? (await this.column.eval(parse)).toValue() : null;
        const row    = this.row    ? (await this.row   .eval(parse)).toValue() : null;


        let columns = 0;
        let rows    = 0;

        if (   this.input
            && column
            && row)
        {
            const input = this.input ? (await this.input.eval(parse)).toValue() : null;

            
            if (   input
                && isTable(input))
            {
                rows = input.items.length;

                input.items.forEach(i => columns = Math.max(columns, i.items ? i.items.length : null));

                if (row.value < rows)
                {
                    const _row = input.items[row.value];

                    if (column.value < columns)
                        this.value = _row.items[column.value].copy()
                    else
                        this.value = NullValue;
                }
                else
                    this.value = NullValue;
            }
            else
                this.value = NullValue;
        }
        else
            this.value = NullValue;


        this.setUpdateValues(parse,
        [
            ['type',    new TextValue(this.value ? this.value.type : ANY_VALUE)],
            ['columns', new NumberValue(columns)                               ],
            ['rows',    new NumberValue(rows   )                               ]
        ]);
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.column) this.column.pushValueUpdates(parse);
        if (this.row   ) this.row   .pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.column) this.column.invalidateInputs(from);
        if (this.row   ) this.row   .invalidateInputs(from);
    }
}