class GCell
extends GOperator1
{
    static { GNode.types[CELL] = this; }



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


        const input  = await evalListValue  (this.input,  parse);
        const column = await evalNumberValue(this.column, parse);
        const row    = await evalNumberValue(this.row,    parse);


        let columns = 0;
        let rows    = 0;

        if (   input
            && column
            && row)
        {
            if (isTable(input))
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const cell = new GCell(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(cell, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, cell);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            cell.input = genParse(parse);
    
        cell.column = genParse(parse);
        cell.row    = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, cell);
        return cell;
    }
}