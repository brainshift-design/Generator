class GIfElse
extends GOperator2
{
    static { GNode.types[IF_ELSE] = this; }
    
    
    
    condition = null;



    constructor(nodeId, options)
    {
        super(IF_ELSE, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.condition = null;
    }



    copy()
    {
        const copy = new GIfElse(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.condition) copy.condition = this.condition.copy();

        if (this.value    ) copy.value     = this.value    .copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.condition || this.condition.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        const inputTrue  = await evalValue(this.input0, parse);
        const inputFalse = await evalValue(this.input1, parse);
        
        const cond       = await evalNumberValue(this.condition, parse);


          if (   inputFalse 
              && inputTrue ) this.value = cond.value >  0 ? inputTrue  : inputFalse;
        else if (inputFalse) this.value = cond.value == 0 ? inputFalse : nanFromType(inputFalse.type);
        else if (inputTrue ) this.value = cond.value >  0 ? inputTrue  : nanFromType(inputTrue .type);
        else                 this.value = new NullValue();


        this.updateValueObjects();


        this.setUpdateValues(parse,
        [
            ['type',      this.outputType()],
            ['value',     this.value       ],
            ['condition', cond             ]
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
        return super.isValid()
            && this.condition && this.condition.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.condition) this.condition.pushValueUpdates(parse);
    }    



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.condition) this.condition.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.condition) this.condition.iterateLoop(parse);
    }    



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const ifElse = new GIfElse(nodeId, options);
    
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
        }
    
    
        const valueIndex = 
            nInputs == 1
            ? parseInt(parse.move())
            : -1;
    
    
        if (parse.settings.logRequests) 
            logReq(ifElse, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, ifElse);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
        if (nInputs == 2)
        {
            ifElse.input0    = genParse(parse);
            ifElse.input1    = genParse(parse);
            ifElse.condition = genParse(parse);
        }
        else if (nInputs == 1)
        {
                 if (valueIndex == 0) ifElse.input0 = genParse(parse); 
            else if (valueIndex == 1) ifElse.input1 = genParse(parse); 
    
            ifElse.condition = genParse(parse);
        }
        else if (nInputs == 0)
        {
            ifElse.condition = genParse(parse);
        }
    
        parse.nTab--;
    
    
        genParseNodeEnd(parse, ifElse);
        return ifElse;
    }
}
