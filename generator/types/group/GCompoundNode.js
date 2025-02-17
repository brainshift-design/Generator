class GCompoundNode
extends GOperator
{
    static { GNode.types[COMPOUND] = this; }



    inputs   = [];

    paramIds = [];
    params   = [];



    constructor(nodeId, options)
    {
        super(COMPOUND, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.inputs   = [];
        this.paramIds = [];
        this.params   = [];
    }



    copy()
    {
        const copy = new GCompoundNode(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.inputs) copy.inputs = this.inputs.map(i => i.copy());
        if (this.params) copy.params = this.params.map(p => p.copy());

        return copy;
    }



    paramFromId(paramId)
    {
        return this.params[this.paramIds.findIndex(id => id == paramId)];
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.updateValues = [];


        if (   !isEmpty(this.inputs)
            && !isEmpty(this.params))
        {
            for (let i = 0; i < this.inputs.length; i++)
            {
                const input = await evalValue(this.inputs[i], parse);

                // this.setUpdateValues(parse, 
                // [
                //     [this.paramIds[i], param.toNewValue()]
                // ],
                // true);
            }

            for (let i = 0; i < this.params.length; i++)
            {
                const param = await evalValue(this.params[i], parse);

                this.setUpdateValues(parse, 
                [
                    [this.paramIds[i], param.toNewValue()]
                ],
                true);
            }
        }
        else
        {
            this.setUpdateValues(parse, 
            [
                ['', new NullValue()]
            ], 
            true);
        }
                
        
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
            && this.inputs.every(i => i.isValid())
            && this.params.every(p => p.isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
        this.params.forEach(p => p.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        this.inputs.forEach(i => i.invalidateInputs(parse, from, force));
        this.params.forEach(p => p.invalidateInputs(parse, from, force));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
        this.params.forEach(p => p.iterateLoop(parse));
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);


        const compound = new GCompoundNode(nodeId, options);


        let nParams = -1;
        
        if (!ignore)
            nParams = parseInt(parse.move());


        if (parse.settings.logRequests) 
            logReq(compound, parse, ignore);


        if (ignore)
        {
            genParseNodeEnd(parse, compound);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }


        parse.nTab++;


        for (let i = 0; i < nParams; i++)
        {
            compound.paramIds.push(parse.move());
            compound.params  .push(genParse(parse));
        }


        parse.nTab--;


        genParseNodeEnd(parse, compound);
        return compound;
    }
}
