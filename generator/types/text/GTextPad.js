class GTextPad
extends GOperator1
{
    static { GNode.types[TEXT_PAD] = this; }



    startPad   = null;
    startCount = null;
    endPad     = null;
    endCount   = null;
    
    
    
    constructor(nodeId, options)
    {
        super(TEXT_PAD, nodeId, options);
    }


    
    reset()
    {
        super.reset();
        
        this.startPad   = null;
        this.startCount = null;
        this.endPad     = null;
        this.endCount   = null;
    }



    copy()
    {
        const copy = new GTextPad(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.startPad  ) copy.startPad   = this.startPad  .copy();
        if (this.startCount) copy.startCount = this.startCount.copy();
        if (this.endPad    ) copy.endPad     = this.endPad    .copy();
        if (this.endCount  ) copy.endCount   = this.endCount  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const startPad   = await evalTextValue  (this.startPad,   parse);
        const startCount = await evalNumberValue(this.startCount, parse);
        const endPad     = await evalTextValue  (this.endPad,     parse);
        const endCount   = await evalNumberValue(this.endCount,   parse);


        if (this.input)
        {
            const input = await evalTextOrListValue(this.input, parse);

            
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? getPadValue(
                            item, 
                            startPad, 
                            startCount, 
                            endPad, 
                            endCount, 
                            this.options.enabled)
                        : new TextValue());   
                }
            }
            else
            {
                this.value = getPadValue(
                    input, 
                    startPad, 
                    startCount, 
                    endPad, 
                    endCount, 
                    this.options.enabled);
            }
        }
        else
            this.value = new TextValue();


        this.setUpdateValues(parse,
        [
            ['type',       this.outputType()],
            ['startPad',   startPad         ],
            ['startCount', startCount       ],
            ['endPad',     endPad           ],
            ['endCount',   endCount         ]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.startPad   && this.startPad  .isValid()
            && this.startCount && this.startCount.isValid()
            && this.endPad     && this.endPad    .isValid()
            && this.endCount   && this.endCount  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.startPad  ) this.startPad  .pushValueUpdates(parse);
        if (this.startCount) this.startCount.pushValueUpdates(parse);
        if (this.endPad    ) this.endPad    .pushValueUpdates(parse);
        if (this.endCount  ) this.endCount  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.startPad  ) this.startPad  .invalidateInputs(parse, from, force);
        if (this.startCount) this.startCount.invalidateInputs(parse, from, force);
        if (this.endPad    ) this.endPad    .invalidateInputs(parse, from, force);
        if (this.endCount  ) this.endCount  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.startPad  ) this.startPad  .iterateLoop(parse);
        if (this.startCount) this.startCount.iterateLoop(parse);
        if (this.endPad    ) this.endPad    .iterateLoop(parse);
        if (this.endCount  ) this.endCount  .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const pad = new GTextPad(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(pad, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, pad);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            pad.input = genParse(parse);
    
        pad.startPad   = genParse(parse);
        pad.startCount = genParse(parse);
        pad.endPad     = genParse(parse);
        pad.endCount   = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, pad);
        return pad;
    }
}



function getPadValue(input, startPad, startCount, endPad, endCount, enabled)
{
    consoleAssert(input.type == TEXT_VALUE, 'input.type must be TEXT_VALUE');

    const value = input.copy();
    
    if (enabled)
        value.value = input.value
            .padStart(startCount.value, escapeString(startPad.value))
            .padEnd  (  endCount.value, endPad.value != '' ? escapeString(endPad.value) : escapeString(startPad.value));

    return value;
}