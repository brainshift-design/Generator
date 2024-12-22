class GSequence
extends GOperator
{
    static { GNode.types[NUMBER_SEQUENCE] = this; }



    start    = null;
    multiply = null;
    add      = null;
    end      = null;

    current  = null;
    
    
    
    constructor(nodeId, options)
    {
        super(NUMBER_SEQUENCE, nodeId, options);
    }



    reset()
    {
        super.reset();
        
        this.start    = null;
        this.multiply = null;
        this.add      = null;
        this.end      = null;
    
        this.current  = null;
    }


   
    copy()
    {
        const copy = new GSequence(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.start   ) copy.start    = this.start   .copy();
        if (this.multiply) copy.multiply = this.multiply.copy();
        if (this.add     ) copy.add      = this.add     .copy();
        if (this.end     ) copy.end      = this.end     .copy();

        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        const start = await evalNumberValue(this.start,    parse);
        const mult  = await evalNumberValue(this.multiply, parse);
        const add   = await evalNumberValue(this.add,      parse);
        const end   = await evalNumberValue(this.end,      parse);
    

        if (   start
            && mult
            && add
            && end)
        {
            const value = start.value + (this.options.enabled ? add.value * this.currentIteration : 0);

            if (!end.isValid())
                this.value = getSequenceValue(start, mult, add, this.currentIteration, this.options.enabled);

            else if (   end.isValid()   
                     && (   add.value == 0
                         || add.value >  0 && start.value < end.value
                                           &&       value < end.value
                         || add.value <  0 && start.value > end.value
                                           &&       value > end.value))
                this.value = getSequenceValue(start, mult, add, this.currentIteration, this.options.enabled);

            else
                this.value = NumberValue.NaN();
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse,
        [
            ['start',    start],
            ['multiply', mult ],
            ['add',      add  ],
            ['end',      end  ]
        ]);
        

        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return this.start    && this.start   .isValid()
            && this.multiply && this.multiply.isValid()
            && this.add      && this.add     .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start   ) this.start   .pushValueUpdates(parse);
        if (this.multiply) this.multiply.pushValueUpdates(parse);
        if (this.add     ) this.add     .pushValueUpdates(parse);
        if (this.end     ) this.end     .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.start   ) this.start   .invalidateInputs(parse, from, force);
        if (this.multiply) this.multiply.invalidateInputs(parse, from, force);
        if (this.add     ) this.add     .invalidateInputs(parse, from, force);
        if (this.end     ) this.end     .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.start   ) this.start   .iterateLoop(parse);
        if (this.multiply) this.multiply.iterateLoop(parse);
        if (this.add     ) this.add     .iterateLoop(parse);
        if (this.end     ) this.end     .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const seq = new GSequence(nodeId, options);
    
    
        if (parse.settings.logRequests) 
            logReq(seq, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, seq);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        seq.start    = genParse(parse);
        seq.multiply = genParse(parse);
        seq.add      = genParse(parse);
        seq.end      = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, seq);
        return seq;
    }
}



function getSequenceValue(start, mult, add, iteration, enabled)
{
    let value = start.value;

    if (enabled)
    {
        for (let i = 0; i < iteration; i++)
        {
            value *= mult.value;
            value += add .value;
        }
    }

    return new NumberValue(
        value, 
        Math.max(
            start.decimals, 
            mult .decimals, 
            add  .decimals));
}