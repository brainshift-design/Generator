class GIndexList
extends GOperator
{
    static { GNode.types[INDEX_LIST] = this; }



    count   = null;
    shuffle = null;
    seed    = null;

    random  = null;



    constructor(nodeId, options)
    {
        super(INDEX_LIST, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.count   = null;
        this.shuffle = null;
        this.seed    = null;
    }



    copy()
    {
        const copy = new GIndexList(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.count  ) copy.count   = this.count;
        if (this.shuffle) copy.shuffle = this.shuffle;
        if (this.seed   ) copy.seed    = this.seed;

        if (this.random ) copy.random  = this.random.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const count   = await evalNumberValue(this.count,   parse);
        const shuffle = await evalNumberValue(this.shuffle, parse);
        const seed    = await evalNumberValue(this.seed,    parse);


        this.value = new ListValue();


        if (   count
            && shuffle
            && seed)
        {
            if (  !this.random
                || this.random.seed != seed.value)
                this.random = new Random(seed.value);


            for (let i = 0; i < count.value; i++)
                this.value.items.push(new NumberValue(i));

            
            if (shuffle.value > 0)
            {
                for (let i = count.value - 1; i > 0; i--) 
                {
                    const j = Math.floor(this.random.get(i) * (i+1));
                    [this.value.items[i], this.value.items[j]] = [this.value.items[j], this.value.items[i]];
                }
            }
        }


        this.setUpdateValues(parse,
        [
            ['count',   count  ],
            ['shuffle', shuffle],
            ['seed',    seed   ]
        ]);


        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.count   && this.count  .isValid()
            && this.shuffle && this.shuffle.isValid()
            && this.seed   && this.seed   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.count  ) this.count  .pushValueUpdates(parse);
        if (this.shuffle) this.shuffle.pushValueUpdates(parse);
        if (this.seed   ) this.seed   .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.count  ) this.count  .invalidateInputs(parse, from, force);
        if (this.shuffle) this.shuffle.invalidateInputs(parse, from, force);
        if (this.seed   ) this.seed   .invalidateInputs(parse, from, force);
    }



    initLoop(parse, loopId)
    {
        super.initLoop(parse, loopId);

        if (this.count  ) this.count  .initLoop(parse, loopId);
        if (this.shuffle) this.shuffle.initLoop(parse, loopId);
        if (this.seed   ) this.seed   .initLoop(parse, loopId);
    }




    invalidateLoop(parse, nodeId)
    {
        super.invalidateLoop(parse, nodeId);

        if (this.count  ) this.count  .invalidateLoop(parse, nodeId);
        if (this.shuffle) this.shuffle.invalidateLoop(parse, nodeId);
        if (this.seed   ) this.seed   .invalidateLoop(parse, nodeId);
    }




    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.count  ) this.count  .iterateLoop(parse);
        if (this.shuffle) this.shuffle.iterateLoop(parse);
        if (this.seed   ) this.seed   .iterateLoop(parse);
    }




    iterateCache(parse, from)
    {
        super.iterateCache(parse, from);

        if (this.count  ) this.count  .iterateCache(parse, from);
        if (this.shuffle) this.shuffle.iterateCache(parse, from);
        if (this.seed   ) this.seed   .iterateCache(parse, from);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        if (this.count  ) this.count  .resetLoop(parse, nodeId);
        if (this.shuffle) this.shuffle.resetLoop(parse, nodeId);
        if (this.seed   ) this.seed   .resetLoop(parse, nodeId);
    }




    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const list = new GIndexList(nodeId, options);
    
        

        if (parse.settings.logRequests) 
            logReq(list, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, list);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    

        list.count   = genParse(parse);
        list.shuffle = genParse(parse);
        list.seed    = genParse(parse);
    
    
        parse.nTab--;
    
            
        genParseNodeEnd(parse, list);
        return list;
    }
}