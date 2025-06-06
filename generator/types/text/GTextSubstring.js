class GTextSubstring
extends GOperator1
{
    static { GNode.types[TEXT_SUBSTRING] = this; }



    start = null;
    end   = null;


    
    constructor(nodeId, options)
    {
        super(TEXT_SUBSTRING, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.start = null;
        this.end   = null;
    }



    copy()
    {
        const copy = new GTextSubstring(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.start) copy.start = this.start.copy();
        if (this.end  ) copy.end   = this.end  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalTextOrListValue(this.input, parse);
        const start = await evalNumberValue    (this.start, parse);
        const end   = await evalNumberValue    (this.end,   parse);


        let length     = 0;
        let fullLength = 0;


        if (   input
            && start
            && end)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    const sub =
                        item.type == TEXT_VALUE
                        ? GTextSubstring.getEvalValue(item, start, end, this.options.enabled)
                        : new TextValue();

                    length     = Math.max(length,     sub.value.length);
                    fullLength = Math.max(fullLength, sub.value.length);

                    this.value.items.push(sub);
                }

            }
            else
            {
                this.value = GTextSubstring.getEvalValue(input, start, end, this.options.enabled);
                
                length     = this .value.length;
                fullLength = input.value.length;
            }
        }
        else
            this.value = new TextValue();


        this.setUpdateValues(parse,
        [
            ['type',       this.outputType()          ],
            ['length',     new NumberValue(length)    ], // used to set start and end limits
            ['fullLength', new NumberValue(fullLength)], // used to set start and end maxima
            ['start',      start                      ],
            ['end',        end                        ]
        ]);
        

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



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.end  ) this.end  .pushValueUpdates(parse);
    }



    iterateLoop(parse, from)
    {
        super.iterateLoop(parse, from);

        if (this.start) this.start.iterateLoop(parse, from);
        if (this.end  ) this.end  .iterateLoop(parse, from);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const sub = new GTextSubstring(nodeId, options);
       
    
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



    static getEvalValue(input, start, end, enabled)
    {
        let value = new TextValue();


        const _end =
            end.isValid()
            ? end
            : new NumberValue(input.value.length);


        if (enabled)
        {
            const endValue = 
                _end.value < 0
                ? input.value.length + _end.value
                : _end.value;

            if (start.value <= endValue)
                value.value = input.value.substring(start.value, endValue);
            else
                value = new TextValue();
        }
        else
            value = input.copy();

        
        return value;
    }
}