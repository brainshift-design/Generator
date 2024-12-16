class GAdvance
extends GOperator1
{
    static { nodeTypes[ADVANCE] = this; }



    loop             = null;

    // iterationObjects = [];

    // isTerminal       = false; // this is a terminal, active or not
    // activeAfter      = false; // there are active nodes after this one
    // listAfter        = false; // there is a list node after this one



    constructor(nodeId, options)
    {
        super(ADVANCE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.loop = null;

        // this.isTerminal  = false;
        // this.activeAfter = false;
        // this.listAfter   = false;

        // this.iterationObjects = [];
    }



    copy()
    {
        const copy = new GAdvance(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.loop) copy.loop = this.loop.copy();

        // copy.isTerminal  = this.isTerminal;
        // copy.activeAfter = this.activeAfter;
        // copy.listAfter   = this.listAfter;

        return copy;
    }



    async eval(parse)
    {
        // if (this.isCached())
        //     return this;
            

        if (   this.loop 
            && this.loop.type != NUMBER_VALUE) 
            assertVolatile(this.loop, this);


        // if (this.input)
        //     this.input.invalidateInputs(parse, this, false);

        // if (this.options.enabled)
        // {
        //     if (   this.loop
        //         && this.loop.initLoop)
        //         this.loop.initLoop(parse, this.nodeId);
        // }


        const input = await evalValue(this.input,  parse);

        this.value = input ?? new ListValue();


        this.updateValueObjects();


        if (this.options.enabled)
        {
            // if (this.input)
            //     this.input.iterateLoop(parse);


            if (   this.loop
                && this.loop.iterateLoop)
                this.loop.iterateLoop(parse);
                //this.loop.iterateCache(parse, this);
        }


        this.setUpdateValues(parse,
        [
            ['type', this.outputListType()]
        ]);


        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value.copy();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.loop) this.loop.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.loop) this.loop.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.loop) this.loop.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const advance = new GAdvance(nodeId, options);
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(advance, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, advance);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        // advance.isTerminal  = parseInt(parse.move()) > 0;
        // advance.activeAfter = parseInt(parse.move()) > 0;
        // advance.listAfter   = parseInt(parse.move()) > 0;
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            advance.input = genParse(parse);
    
        advance.loop = genParse(parse);  // don't set target here
    
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, advance);
        return advance;
    }
}



function assertVolatile(loop, node)
{
    consoleAssert(
           loop.type == ITERATE
        || loop.type == FREEZE
        || loop.type == NUMBER_RANGE
        || loop.type == NUMBER_WAVE
        || loop.type == NUMBER_SEQUENCE
        || loop.type == NUMBER_RANDOM
        || loop.type == NUMBER_NOISE
        || loop.type == PROBABILITY
        || loop.type == LIST
        || loop.type == PARAM, // for OpFeedback
        'only volatile types can be repeated');
}