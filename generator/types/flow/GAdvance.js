class GAdvance
extends GOperator1
{
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



    toValue()
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