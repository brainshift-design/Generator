class GCell
extends GOperator1
{
    column;
    row;


    
    constructor(nodeId, options)
    {
        super(CELL, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.column = null;
        this.row    = null;
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
                        this.value = _row.items[column.value].copy();
                    else
                        this.value = new NullValue();
                }
                else
                    this.value = new NullValue();
            }
            else
                this.value = new NullValue();
        }
        else
            this.value = new NullValue();


        this.setUpdateValues(parse,
        [
            //['preview', this.value                 ],
            ['type',    this.outputType()          ],
            ['columns', new NumberValue(columns, 0)],
            ['rows',    new NumberValue(rows   , 0)]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.column && this.column.isValid()
            && this.row    && this.row   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.column) this.column.pushValueUpdates(parse);
        if (this.row   ) this.row   .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.column) this.column.invalidateInputs(parse, from, force);
        if (this.row   ) this.row   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.column) this.column.iterateLoop(parse);
        if (this.row   ) this.row   .iterateLoop(parse);
    }
}