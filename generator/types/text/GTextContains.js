class GTextContains
extends GOperator1
{
    static { GNode.types[TEXT_CONTAINS] = this; }



    what;



    constructor(nodeId, options)
    {
        super(TEXT_CONTAINS, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.what = null;
    }



    copy()
    {
        const copy = new GTextContains(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.what = null) copy.what = this.what.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalTextOrListValue(this.input, parse);
        const what  = await evalTextValue      (this.what,  parse);
    

        if (input)
        {
            this.evalInputOrList(
                input, 
                item => GTextContains.getEvalValue(item, what), 
                BooleanValue.NaN());
        }
        else
            this.value = BooleanValue.NaN();
    

        this.setUpdateValues(parse,
        [
            ['type', this.outputType()],
            ['what', what             ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.what && this.what.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.what) this.what.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.what) this.what.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.what) this.what.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const contains = new GTextContains(nodeId, options);
       
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
        }
    
        
        if (parse.settings.logRequests) 
            logReq(contains, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, contains);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            contains.input = genParse(parse);
    
        contains.what = genParse(parse);
      
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, contains);
        return contains;
    }



    static getEvalValue(input, what)
    {
        return input.type == TEXT_VALUE
            ? new BooleanValue(
                what.value == ''
                    ? false
                    : input.value.includes(what.value))
            : BooleanValue.NaN();
    }
}