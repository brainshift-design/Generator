class GTextCSV
extends GOperator1
{
    rowSeparator;
    columnSeparator;



    constructor(nodeId, options)
    {
        super(TEXT_CSV, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextCSV(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.rowSeparator   ) copy.rowSeparator    = this.rowSeparator   .copy();
        if (this.columnSeparator) copy.columnSeparator = this.columnSeparator.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const rowSeparator    = this.rowSeparator    ? (await this.rowSeparator   .eval(parse)).toValue() : null;
        const columnSeparator = this.columnSeparator ? (await this.columnSeparator.eval(parse)).toValue() : null;


        this.value = new ListValue();


        if (   this.input
            && rowSeparator
            && columnSeparator
            && rowSeparator.value != '')
        {
            const input = (await this.input.eval(parse)).toValue();
            
            const rows = input.value.split(rowSeparator.value);

            for (const _row of rows)
            {
                const cells = _row.split(columnSeparator.value);

                const row = new ListValue();

                for (const cell of cells)
                    row.items.push(new TextValue(cell));

                this.value.items.push(row);
            }
        }
    

        this.updateValues =
        [
            ['rowSeparator',    rowSeparator   ],
            ['columnSeparator', columnSeparator]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.rowSeparator   ) this.rowSeparator   .pushValueUpdates(parse);
        if (this.columnSeparator) this.columnSeparator.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.rowSeparator   ) this.rowSeparator   .invalidateInputs(from);
        if (this.columnSeparator) this.columnSeparator.invalidateInputs(from);
    }
}
