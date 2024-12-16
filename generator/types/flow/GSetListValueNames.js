class GSetListValueNames
extends GOperator2
{
    static { nodeTypes[SET_LIST_VALUE_NAMES] = this; }



    constructor(nodeId, options)
    {
        super(SET_LIST_VALUE_NAMES, nodeId, options);
    }


    
    copy()
    {
        const copy = new GSetListValueNames(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = await evalListValue(this.input0, parse);
        const input1 = await evalListValue(this.input1, parse);

        
        if (   input0
            && input1
            && input0.items
            && input1.items)
        {
            if (this.options.enabled)
            {
                for (let i = 0; 
                        i < input0.items.length 
                     && i < input1.items.length; 
                     i++)
                    input0.items[i].valueId = input1.items[i].value;
            }

            this.value = input0;
        }
    
        else if (input0)
            this.value = input0;
        
        else
            this.value = new ListValue();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type', this.outputListType()]
        ]);


        this.validate();

        return this;
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const names = new GSetListValueNames(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
        }
    
    
        const valueIndex = 
            nInputs == 1
            ? parseInt(parse.move())
            : -1;
    
    
        if (parse.settings.logRequests) 
            logReq(names, parse, ignore, nInputs);
    
    
        if (ignore)
        {
            genParseNodeEnd(parse, names);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
        if (nInputs == 2)
        {
            names.input0 = genParse(parse);
            names.input1 = genParse(parse);
        }
        else if (nInputs == 1)
        {
                 if (valueIndex == 0) names.input0 = genParse(parse); 
            else if (valueIndex == 1) names.input1 = genParse(parse); 
        }
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, names);
        return names;
    }
}
