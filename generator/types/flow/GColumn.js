class GColumn
extends GOperator1
{
    static { GNode.types[COLUMN] = this; }



    index       = null;

    // cachedValue = null;


    
    constructor(nodeId, options)
    {
        super(COLUMN, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.index       = null;

        // this.cachedValue = null;
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
        if (   this.isCached())
            // && this.cachedValue)
            return this;


        const input = await evalListValue  (this.input, parse);
        const index = await evalNumberValue(this.index, parse);

        
        this.value = new ListValue();

        let maxColumns = 0;


        // if (this.cachedValue)
        //     this.value = this.cachedValue.copy();

        // else
        // {
            if (   input
                && index)
            {
                if (isTable(input))
                {
                    input.items.forEach(i => maxColumns = Math.max(maxColumns, i.items.length));

                    if (index.value < maxColumns)
                    {
                        const valueIds = [];

                        for (let i = 0; i < input.items.length; i++)
                        {
                            const row = input.items[i];

                            if (index.value < row.items.length)
                            {
                                const item = row.items[index.value].copy();

                                item.valueId = getNewNumberId(
                                    item.valueId, 
                                    id => valueIds.filter(_id => _id == id).length,
                                    item.valueId,
                                    '',
                                    1,
                                    true);
                               
                                this.value.items.push(item);

                                pushUnique(valueIds, item.valueId);

                                if (   this.value.objects 
                                    && row.items[index.value].objects)
                                    this.value.objects.push(...row.items[index.value].objects);
                            }
                        }
                    }
                }
                else if (isListValueType(input.type))
                {
                    this.value = input.copy();
                    maxColumns = 1;
                }
            }


        //     this.cachedValue = this.value.copy();
        // }


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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const column = new GColumn(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(column, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, column);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            column.input = genParse(parse);
    
        column.index = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, column);
        return column;
    }
}



function isTable(value)
{
    if (!isListValueType(value.type))
        return false;

    for (const item of value.items)
    {
        if (!isListValueType(item.type))
            return false;
    }

    return true;
}