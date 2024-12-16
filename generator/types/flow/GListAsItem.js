class GListAsItem
extends GOperator1
{
    static { nodeTypes[LIST_AS_ITEM] = this; }



    constructor(nodeId, options)
    {
        super(LIST_AS_ITEM, nodeId, options);
    }


    
    reset()
    {
        super.reset();
    }



    copy()
    {
        const copy = new GListAsItem(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new ListValue();
        this.value.condensed = true;

        let length = 0;


        const input = await evalListValue(this.input, parse);


        if (input)
        {
            length = input.items.length;
            
                
            if (   isListValueType(input.type)
                && this.options.enabled)
            {
                for (const item of input.items)
                {
                    const copy = item.copy();

                    this.value.items.push(copy);
                }
            }
            else
            {
                const copy = input.copy();

                this.value.items  .push(copy);
                this.value.objects.push(...copy.objects);
            }
        }
        else
            this.value = new ListValue();
    

        this.updateValueObjects();
    

        this.setUpdateValues(parse,
        [
            ['length', new NumberValue(length)                                ],
            ['type',   new TextValue(finalListTypeFromValues(this.value.items))]
        ]);
        

        this.validate();

        return this;
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const listAsItem = new GListAsItem(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(listAsItem, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, listAsItem);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            listAsItem.input = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, listAsItem);
        return listAsItem;
    }
}
