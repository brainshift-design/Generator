class GListContains
extends GOperator2
{
    static { GNode.types[LIST_CONTAINS] = this; }



    first;
    last;
    all;



    constructor(nodeId, options)
    {
        super(LIST_CONTAINS, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.first = null;
        this.last  = null;
        this.all   = null;
    }



    copy()
    {
        const copy = new GListContains(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.first = null) copy.first = this.first.copy();
        if (this.last  = null) copy.last  = this.last .copy();
        if (this.all   = null) copy.all   = this.all  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = await evalListValue(this.input0, parse);
        const input1 = await evalValue    (this.input1, parse);
    

        if (   input0 && input0.isValid() 
            && input1 && input1.isValid())
        {
            if (isValueListOfLists(input0))
            {
                if (isListValueType(input1.type))
                {
                    let result = false;

                    for (const item of input0.items)
                    {
                        if (item.equals(input1))
                        {
                            result = true;
                            break;
                        }
                    }

                    this.value = new BooleanValue(result);
                }
                else // non-list value
                {
                    this.value = new ListValue();

                    for (const item of input0.items)
                    {
                        this.value.items.push(
                            isListValueType(item.type)
                            ? new BooleanValue(item.items.find(i => i.equals(input1)))
                            : BooleanValue.NaN());
                    }
                }
            }
            else
            {
                this.value = new BooleanValue(input0.items.find(i => i.equals(input1)));
            }
        }
        else                  
        {
            this.value = BooleanValue.NaN();
        }
    

        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const cont = new GListContains(nodeId, options);
       
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(cont, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, cont);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 2)
        {
            cont.input0 = genParse(parse);
            cont.input1 = genParse(parse);
        }
        else if (nInputs == 1)
        {
            cont.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        }
      
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, cont);
        return cont;
    }
}