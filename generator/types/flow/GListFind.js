class GListFind
extends GOperator2
{
    static { GNode.types[LIST_FIND] = GListFind; }


    
    first;
    last;
    all;



    constructor(nodeId, options)
    {
        super(LIST_FIND, nodeId, options);
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
        const copy = new GListFind(this.nodeId, this.options);

        copy.copyBase(this);

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
            const indices = [];

            
            if (   input1
                && input1.isValid())
            {
                for (let i = 0; i < input0.items.length; i++)
                {
                    if (input0.items[i].equals(input1))
                        indices.push(i);
                }  


                this.value = new NumberValue(indices.length > 0 ? 1 : 0);

                this.first = indices.length > 0 ? new NumberValue(indices.at( 0)) : NumberValue.NaN();
                this.last  = indices.length > 0 ? new NumberValue(indices.at(-1)) : NumberValue.NaN();

                this.all   = new ListValue();

                for (const index of indices)
                    this.all.items.push(new NumberValue(index));
            }
            else
            {
                this.value = new NumberValue(1);

                this.first = NumberValue.NaN();
                this.last  = NumberValue.NaN();
                this.all   =   ListValue.NaN();
            }
        }
        else                  
        {
            this.value = NumberValue.NaN();
            this.first = NumberValue.NaN();
            this.last  = NumberValue.NaN();
            this.all   =   ListValue.NaN();
        }
    

        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['first', this.first],
            ['last',  this.last ],
            ['all',   this.all  ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.first && this.first.isValid()
            && this.last  && this.last .isValid()
            && this.all   && this.all  .isValid();
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const find = new GListFind(nodeId, options);
       
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(find, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, find);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 2)
        {
            find.input0 = genParse(parse);
            find.input1 = genParse(parse);
        }
        else if (nInputs == 1)
        {
            find.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        }
      
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, find);
        return find;
    }
}