class GBoundedNumber
extends GOperator1
{
    static { GNode.types[BOUNDED_NUMBER] = this; }



    min = null;
    max = null;



    constructor(nodeId, options)
    {
        super(BOUNDED_NUMBER, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.min = null;
        this.max = null;
    }



    copy()
    {
        const copy = new GBoundedNumber(this.nodeId, this.options);
        
        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.min  ) copy.min   = this.min  .copy();
        if (this.max  ) copy.max   = this.max  .copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.min || this.min.isCached())
            && (!this.max || this.max.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberValue(this.input, parse);
        const min   = await evalNumberValue(this.min,   parse);
        const max   = await evalNumberValue(this.max,   parse);


        if (input)
        {
            const maxDecimals = Math.max(
                input.decimals,
                min  .decimals,
                max  .decimals);

            this.value = new NumberValue(
                min.value <= max.value
                    ? Math.min(Math.max(min.value, input.value), max.value)
                    : Math.min(Math.max(max.value, input.value), min.value),
                maxDecimals);
        }
        else if (this.value)
        {
            const value = await this.value.eval(parse);

            const maxDecimals = Math.max(
                value.decimals,
                min  .decimals,
                max  .decimals);

            this.value = new NumberValue(
                min.value <= max.value
                    ? Math.min(Math.max(min.value, value.value), max.value)
                    : Math.min(Math.max(max.value, value.value), min.value),
                maxDecimals);
        }
        else
            this.value = NumberValue.NaN();


        this.setUpdateValues(parse, 
        [
            ['value', this.value],
            ['min',   min       ],
            ['max',   max       ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return  (  !this.input 
                 || this.input.isValid())
             && this.min && this.min.isValid()
             && this.max && this.max.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.min) this.min.pushValueUpdates(parse);
        if (this.max) this.max.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.min) this.min.invalidateInputs(parse, from, force);
        if (this.max) this.max.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.min) this.min.iterateLoop(parse);
        if (this.max) this.max.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const num = new GBoundedNumber(nodeId, options);
    
        
        if (parse.settings.logRequests) 
            logReq(num, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, num);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
        parse.inParam = false;
    
    
        if (parse.next == NUMBER_VALUE) num.value = genParse(parse);
        else                            num.input = genParse(parse);
    
        num.min = genParse(parse);
        num.max = genParse(parse);
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, num);
        return num;
    }
}