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


        let maxColumns = 0;

        
        let nRows    = 0;
        let nColumns = 0;


        if (   this.input
            && rowSeparator
            && columnSeparator
            && rowSeparator.value != '')
        {
            const input = this.input ? (await this.input.eval(parse)).toValue() : null;
            

            const rows = 
                   input
                && input.value            
                ? input.value.split(unescapeString(rowSeparator.value))
                : [];


            for (const _row of rows)
            {
                const cells = 
                    _row
                    ? _row.split(unescapeString(columnSeparator.value))
                    : [];


                const row = new ListValue();

                for (const cell of cells)
                    row.items.push(new TextValue(cell));

                maxColumns = Math.max(maxColumns, row.items.length);


                this.value.items.push(row);
            }


            nRows    = this.value.items.length;
            nColumns = maxColumns;
        }
    

        this.setUpdateValues(parse,
        [
            ['preview',         new ListValue(this.value.items.slice(0, Math.min(this.value.items.length, 11)))],
            ['rowSeparator',    rowSeparator             ],
            ['columnSeparator', columnSeparator          ],
            ['rows',            new NumberValue(nRows   )],
            ['columns',         new NumberValue(nColumns)]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.rowSeparator    && this.rowSeparator   .isValid()
            && this.columnSeparator && this.columnSeparator.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.rowSeparator   ) this.rowSeparator   .pushValueUpdates(parse);
        if (this.columnSeparator) this.columnSeparator.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.rowSeparator   ) this.rowSeparator   .invalidateInputs(parse, from, force);
        if (this.columnSeparator) this.columnSeparator.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.rowSeparator   ) this.rowSeparator   .iterateLoop(parse);
        if (this.columnSeparator) this.columnSeparator.iterateLoop(parse);
    }
}
