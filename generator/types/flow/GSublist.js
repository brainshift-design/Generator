class GSublist
extends GOperator1
{
    static { nodeTypes[SUBLIST] = this; }



    start       = null;
    end         = null;

    // cachedValue = null;


    
    constructor(nodeId, options)
    {
        super(SUBLIST, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.start       = null;
        this.end         = null;

        // this.cachedValue = null;
    }



    copy()
    {
        const copy = new GSublist(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.start) copy.start = this.start.copy();
        if (this.end  ) copy.end   = this.end  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalListValue  (this.input, parse);
        const start = await evalNumberValue(this.start, parse);
        const end   = await evalNumberValue(this.end,   parse);


        let length = 0;
            

        this.value = new ListValue();
        this.value.objects = [];


        if (   input
            && start
            && end)
        {
            if (input.items)
            {
                length = input.items.length;


                const _end =
                    end.isValid()
                    ? end
                    : new NumberValue(input.items.length);


                if (this.options.enabled)
                {
                    const endValue = 
                        _end.value < 0
                        ? length + _end.value
                        : _end.value;

                    if (start.value < endValue)
                    {
                        for (let i = start.value, j = 0; i < endValue; i++, j++)
                        {
                            const item = input.items[i];

                            this.value.items.push(item ? item.copy() : new NullValue());
                            
                            if (   item
                                && this.value.objects
                                && item.objects)
                            {
                                item.objects.forEach(o => o.itemIndex = j);
                                this.value.objects.push(...item.objects);
                            }
                        }
                    }
                    else
                        this.value = ListValue.NaN();
                }
                else
                    this.value = input.copy();
            }
            else
                this.value = ListValue.NaN();
        }


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',       this.outputListType()                          ],
            ['length',     new NumberValue(this.value.items.length)       ], // used to set start and end maxima
            ['fullLength', new NumberValue(input ? input.items.length : 0)], // used to set start and end maxima
            ['start',      start                                          ],
            ['end',        end                                            ]
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
            && this.start && this.start.isValid()
            && this.end   && this.end  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.start) this.start.invalidateInputs(parse, from, force);
        if (this.end  ) this.end  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.start) this.start.iterateLoop(parse);
        if (this.end  ) this.end  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const sub = new GSublist(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(sub, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, sub);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            sub.input = genParse(parse);
    
        sub.start = genParse(parse);
        sub.end   = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, sub);
        return sub;
    }
}
