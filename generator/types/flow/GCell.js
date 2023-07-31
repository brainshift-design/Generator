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
            const input = (await this.input.eval(parse)).toValue();

            
            if (isTable(input))
            {
                rows = input.items.length;

                input.items.forEach(i => columns = Math.max(columns, i.items.length));

                this.value = 
                    column.value < columns
                    ? input.items[row.value].items[column.value].copy()
                    : NullValue;
            }
            else
                this.value = NullValue;
        }
        else
            this.value = NullValue;


        this.updateValues =
        [
            //['value',   this.value              ],
            ['type',    new TextValue(this.value ? this.value.type : ANY_VALUE)],
            ['columns', new NumberValue(columns)                               ],
            ['rows',    new NumberValue(rows   )                               ]
        ];
        

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