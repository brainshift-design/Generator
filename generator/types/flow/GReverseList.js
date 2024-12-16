class GReverseList
extends GOperator1
{
    static { nodeTypes[REVERSE_LIST] = this; }



    constructor(nodeId, options)
    {
        super(REVERSE_LIST, nodeId, options);
    }


    
    reset()
    {
        super.reset();
    }



    copy()
    {
        const copy = new GReverseList(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalValue(this.input, parse);


        if (input)
        {
            if (this.options.enabled)
            {
                this.value = new ListValue();
                this.value.objects = [];

                for (let i = input.items.length-1; i >= 0; i--)
                    this.value.items.push(input.items[i]);//.copy());

                if (input.objects)
                {
                    for (let i = input.objects.length-1; i >= 0; i--)
                        this.value.objects.push(input.objects[i]);
                }
            }
            else
                this.value = input.copy();//.copy();
        }
        else
            this.value = ListValue.NaN();
    

        this.updateValueObjects();


        this.setUpdateValues(parse, 
        [
            ['type',   this.outputListType()                   ],
            ['length', new NumberValue(this.value.items.length)]
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



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const reverse = new GReverseList(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(reverse, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, reverse);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            reverse.input = genParse(parse);
      
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, reverse);
        return reverse;
    }
}
