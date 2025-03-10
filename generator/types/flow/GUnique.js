class GUnique
extends GOperator1
{
    static { GNode.types[UNIQUE] = this; }



    counts      = null;
    indices     = null;

    // cachedValue = null;


    
    constructor(nodeId, options)
    {
        super(UNIQUE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.counts  = null;
        this.indices = null;
        
        // this.cachedValue = null;
    }



    copy()
    {
        const copy = new GUnique(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.counts ) copy.counts  = this.counts .copy();
        if (this.indices) copy.indices = this.indices.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalListValue(this.input, parse);


        this.counts  = new ListValue();
        this.indices = new ListValue();

        
        if (input)
        {
            if (this.options.enabled)
            {
                this.value = new ListValue();

                for (let i = 0, index = 0; i < input.items.length; i++)
                {
                    const item       = input.items[i];
                    const foundIndex = this.value.items.findIndex(i => i.equals(item));

                    if (foundIndex < 0)
                    {
                        const copy = item.copy();

                        copy.valueId = (index++).toString();
                        
                        this.value.items.push(item.copy());

                        if (   this.value.objects
                            && item.objects)
                            this.value.objects.push(...item.objects);

                        this.counts .items.push(new NumberValue(1));
                        this.indices.items.push(new ListValue([new NumberValue(i)]));
                    }
                    else
                    {
                        this.counts .items[foundIndex].value++;
                        this.indices.items[foundIndex].items.push(new NumberValue(i));
                    }
                }
            }
            else
                this.value = input.copy();
        }
        else
            this.value = new ListValue();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',    this.outputListType()                   ],
            ['length',  new NumberValue(this.value.items.length)],
            ['counts',  this.counts                             ],
            ['indices', this.indices                            ]
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



    // isValid()
    // {
    //     return super.isValid()
    //         && this.counts  && this.counts .isValid()
    //         && this.indices && this.indices.isValid();
    // }



    // pushValueUpdates(parse)
    // {
    //     super.pushValueUpdates(parse);

    //     if (this.counts ) this.counts .pushValueUpdates(parse);
    //     if (this.indices) this.indices.pushValueUpdates(parse);
    // }



    // invalidateInputs(parse, from, force)
    // {
    //     super.invalidateInputs(parse, from, force);

    //     if (this.counts ) this.counts .invalidateInputs(parse, from, force);
    //     if (this.indices) this.indices.invalidateInputs(parse, from, force);
    // }



    // iterateLoop(parse)
    // {
    //     super.iterateLoop(parse);

    //     if (this.counts ) this.counts .iterateLoop(parse);
    //     if (this.indices) this.indices.iterateLoop(parse);
    // }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);


        const unique = new GUnique(nodeId, options);
    

        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }

        
        if (parse.settings.logRequests) 
            logReq(unique, parse, ignore, nInputs);


        if (ignore) 
        {
            genParseNodeEnd(parse, unique);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }


        parse.nTab++;


        if (nInputs == 1)
            unique.input = genParse(parse);
    
        
        parse.nTab--;


        genParseNodeEnd(parse, unique);
        return unique;
    }
}
